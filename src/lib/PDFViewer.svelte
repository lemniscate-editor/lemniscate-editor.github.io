<script lang='ts'>
    import { asset } from '$app/paths';
    import { usePdfiumEngine } from '@embedpdf/engines/svelte';
    import { EmbedPDF } from '@embedpdf/core/svelte';
    import { createPluginRegistration } from '@embedpdf/core';
    import { 
        ViewportPluginPackage,
        Viewport
    } from '@embedpdf/plugin-viewport/svelte';
    import {
        Scroller,
        ScrollPluginPackage,
        type RenderPageProps,
    } from '@embedpdf/plugin-scroll/svelte';
    import {
        DocumentManagerPluginPackage,
        DocumentContent
    } from '@embedpdf/plugin-document-manager/svelte';
    import {
        RenderLayer,
        RenderPluginPackage
    } from '@embedpdf/plugin-render/svelte';
    import { PrintPluginPackage } from '@embedpdf/plugin-print/svelte';
    import { ExportPluginPackage } from '@embedpdf/plugin-export/svelte';
    import {
        ZoomPluginPackage,
        ZoomMode
    } from '@embedpdf/plugin-zoom/svelte';
    import {
        SpreadPluginPackage,
        SpreadMode
    } from '@embedpdf/plugin-spread/svelte'
    import { FullscreenPluginPackage } from '@embedpdf/plugin-fullscreen/svelte';
    /*import {
        TilingLayer,
        TilingPluginPackage
    } from '@embedpdf/plugin-tiling/svelte';*/

    import { SettingsStore } from './stores.ts';
    import PDFPluginLoader from './PDFPluginLoader.svelte';
    import type {
        ActiveDocument,
        DocumentManager,
        Fullscreen,
        UseExportReturn,
        UsePrintReturn,
        UseSpreadReturn,
        UseZoomReturn
    } from './types';

    const pdfEngine = usePdfiumEngine();
    const plugins = [
        createPluginRegistration(DocumentManagerPluginPackage, {
            initialDocuments: [{ url: asset('using-lemniscate-editor.pdf') }]
        }),
        createPluginRegistration(ViewportPluginPackage),
        createPluginRegistration(ScrollPluginPackage),
        createPluginRegistration(RenderPluginPackage),
        createPluginRegistration(PrintPluginPackage),
        createPluginRegistration(ExportPluginPackage),
        createPluginRegistration(ZoomPluginPackage, {
            defaultZoomLevel: ZoomMode.FitPage,
        }),
        createPluginRegistration(SpreadPluginPackage, {
            defaultSpreadMode: SpreadMode.None
        }),
        createPluginRegistration(FullscreenPluginPackage),
        /*createPluginRegistration(TilingPluginPackage, {
            tileSize: 768,
            overlapPx: 5,
            extraRings: 0
        })*/
    ];

    let docManager: DocumentManager | undefined = $state(undefined);
    let activeDocument: ActiveDocument | undefined = $state(undefined);
    let exportApi: UseExportReturn | undefined = $state(undefined);
    let print: UsePrintReturn | undefined = $state(undefined);
    let spread: UseSpreadReturn | undefined = $state(undefined);
    let zoom: UseZoomReturn | undefined = $state(undefined);
    let fullscreen: Fullscreen | undefined = $state(undefined);
    
    let isPrinting = $state(false);

    export function openPdf(url: string): void {
        docManager!.provides?.openDocumentUrl({ url: url });
    }

    export function exportPdf(): void {
        exportApi!.provides?.download();
    }

    export function printPdf(): void {
        if (!print!.provides || isPrinting) return;
        isPrinting = true;
        const printTask = print!.provides.print();
        printTask.wait(
            () => { isPrinting = false; },
            (error) => { isPrinting = false; console.error(error) }
        )
    }

    export function zoomPdf(op: 'in' | 'out' | 'fit'): void {
        if (op === 'in') zoom!.provides?.zoomIn();
        if (op === 'out') zoom!.provides?.zoomOut();
        if (op === 'fit') zoom!.provides?.requestZoom(ZoomMode.FitPage)
    }

    export function spreadPdf(two: boolean): void {
        if (two) spread!.provides?.setSpreadMode(SpreadMode.Odd);
        else spread!.provides?.setSpreadMode(SpreadMode.None);
    }

    export function fullscreenPdf(): void {
        fullscreen!.provides?.toggleFullscreen(`#${activeDocument?.activeDocumentId}`)
    }
</script>
 
{#if pdfEngine.isLoading || !pdfEngine.engine}
    <div class='loading-pane'>
        Loading PDF Engine...
    </div>
{:else}
    <div style='height: 80vh;'>
        <EmbedPDF engine={pdfEngine.engine} {plugins}>
        {#snippet children({ activeDocumentId })}
            {#if activeDocumentId}
            {@const documentId = activeDocumentId}
            <DocumentContent {documentId}>
                {#snippet children(documentContent)}
                {#if documentContent.isLoaded}
                    {#snippet renderPage(page: RenderPageProps)}
                    <div
                        style:width='{page.width}px'
                        style:height='{page.height}px'
                        style:position='relative'
                    >
                        <RenderLayer
                            {documentId}
                            pageIndex={page.pageIndex}
                            scale={1.0}
                        />
                        <!--TilingLayer
                            {documentId}
                            pageIndex={page.pageIndex}
                        /-->
                    </div>
                    {/snippet}
                    <PDFPluginLoader
                        bind:activeDocument
                        bind:docManager
                        bind:exportApi
                        bind:fullscreen
                        bind:print
                        bind:spread
                        bind:zoom
                        {documentId}
                    />
                    <Viewport {documentId} style={$SettingsStore.theme === 'dark' ? 'background-color:#2E3235' : 'background-color:#FFFFFF'}>
                    <Scroller {documentId} {renderPage} />
                    </Viewport>
                {/if}
                {/snippet}
            </DocumentContent>
            {/if}
        {/snippet}
        </EmbedPDF>
    </div>
{/if}
 
<style>
.loading-pane {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>