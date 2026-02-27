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
        ScrollStrategy,
        type RenderPageProps
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
    import {
        TilingLayer,
        TilingPluginPackage
    } from '@embedpdf/plugin-tiling/svelte';
    import {
        SearchLayer,
        SearchPluginPackage
    } from '@embedpdf/plugin-search/svelte';

    import { SettingsStore } from './stores.ts';
    import PDFPluginLoader from './PDFPluginLoader.svelte';
    import type {
        ActiveDocument,
        DocumentManager,
        Fullscreen,
        ScrollManager,
        UseExportReturn,
        UsePrintReturn,
        UseSearchReturn,
        UseSpreadReturn,
        UseZoomReturn
    } from './types';

    const pdfEngine = usePdfiumEngine();
    const plugins = [
        createPluginRegistration(DocumentManagerPluginPackage, {
            initialDocuments: [{ url: asset('using-lemniscate-editor.pdf') }]
        }),
        createPluginRegistration(ViewportPluginPackage),
        createPluginRegistration(ScrollPluginPackage, {
            defaultStrategy: ScrollStrategy.Vertical
        }),
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
        createPluginRegistration(TilingPluginPackage, {
            tileSize: 768,
            overlapPx: 5,
            extraRings: 0
        }),
        createPluginRegistration(SearchPluginPackage)
    ];

    let docManager: DocumentManager | undefined = $state(undefined);
    let activeDocument: ActiveDocument | undefined = $state(undefined);
    let exportApi: UseExportReturn | undefined = $state(undefined);
    let print: UsePrintReturn | undefined = $state(undefined);
    let spread: UseSpreadReturn | undefined = $state(undefined);
    let zoom: UseZoomReturn | undefined = $state(undefined);
    let fullscreen: Fullscreen | undefined = $state(undefined);
    let search: UseSearchReturn | undefined = $state(undefined);
    let scrollManager: ScrollManager | undefined = $state(undefined);
    
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

    export function searchPdf(query: string): void {
        if (!search) return;
        query === '' ? search.provides?.stopSearch() : search.provides?.searchAllPages(query);
    }

    export function changeSearchResult(dir: 'prev' | 'next'): void {
        dir === 'prev' ? search!.provides?.previousResult() : search!.provides?.nextResult();
    }

    function scrollToItem(index: number): void {
        const item = search!.state.results[index];
        if (!item) return;
        const minCoordinates = item.rects.reduce(
            (min, rect) => ({
                x: Math.min(min.x, rect.origin.x),
                y: Math.min(min.y, rect.origin.y),
            }),
            { x: Infinity, y: Infinity },
        );
        scrollManager!.provides?.scrollToPage({
            pageNumber: item.pageIndex + 1,
            pageCoordinates: minCoordinates,
            alignX: 50,
            alignY: 50
        });
    }

    $effect(() => {
        if (search &&
            typeof search.state.activeResultIndex === 'number' &&
            !search.state.loading &&
            search.state.results.length > 0)
        scrollToItem(search.state.activeResultIndex);
    });
</script>
 
{#if pdfEngine.isLoading || !pdfEngine.engine}
    <div class='loading-pane'>
        Loading PDF Engine...
    </div>
{:else}
    <div class='pdf-wrapper'>
        <EmbedPDF engine={pdfEngine.engine} {plugins}>
        {#snippet children({ activeDocumentId })}
            {#if activeDocumentId}
            {@const documentId = activeDocumentId}
            <DocumentContent {documentId}>
                {#snippet children(documentContent)}
                {#if documentContent.isLoaded}
                    <div class='viewport-wrapper'>
                        <Viewport
                            {documentId}
                            style={$SettingsStore.theme === 'dark' ? 'background-color:#2E3235' : 'background-color:#FFFFFF'}
                        >
                            <Scroller {documentId}>
                                {#snippet renderPage(page: RenderPageProps)}
                                <RenderLayer
                                    {documentId}
                                    pageIndex={page.pageIndex}
                                    scale={1.0}
                                />
                                <TilingLayer
                                    {documentId}
                                    pageIndex={page.pageIndex}
                                />
                                <SearchLayer
                                    {documentId}
                                    pageIndex={page.pageIndex}
                                />
                                {/snippet}
                            </Scroller>
                            <PDFPluginLoader
                                bind:activeDocument
                                bind:docManager
                                bind:exportApi
                                bind:fullscreen
                                bind:print
                                bind:scrollManager
                                bind:search
                                bind:spread
                                bind:zoom
                                {documentId}
                            />
                        </Viewport>
                    </div>
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