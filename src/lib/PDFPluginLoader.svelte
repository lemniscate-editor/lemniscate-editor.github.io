<script lang='ts'>
    import {
        useActiveDocument,
        useDocumentManagerCapability
    } from '@embedpdf/plugin-document-manager/svelte';
    import { useExport } from '@embedpdf/plugin-export/svelte';
    import { useFullscreen } from '@embedpdf/plugin-fullscreen/svelte';
    import { usePrint } from '@embedpdf/plugin-print/svelte';
    import { useScrollCapability } from '@embedpdf/plugin-scroll/svelte';
    import { useSearch } from '@embedpdf/plugin-search/svelte';
    import { useSpread } from '@embedpdf/plugin-spread/svelte';
    import { useZoom } from '@embedpdf/plugin-zoom/svelte';

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

    let {
        docManager = $bindable(),
        activeDocument = $bindable(),
        exportApi = $bindable(),
        fullscreen = $bindable(),
        print = $bindable(),
        scrollManager = $bindable(),
        search = $bindable(),
        spread = $bindable(),
        zoom = $bindable(),
        documentId
    }: {
        docManager: DocumentManager | undefined,
        activeDocument: ActiveDocument | undefined,
        exportApi: UseExportReturn | undefined,
        fullscreen: Fullscreen | undefined,
        print: UsePrintReturn | undefined,
        scrollManager: ScrollManager | undefined,
        search: UseSearchReturn | undefined,
        spread: UseSpreadReturn | undefined,
        zoom: UseZoomReturn | undefined,
        documentId: string
    } = $props();

    docManager = useDocumentManagerCapability();
    activeDocument = useActiveDocument();
    exportApi = useExport(() => documentId);
    fullscreen = useFullscreen();
    print = usePrint(() => documentId);
    zoom = useZoom(() => documentId);
    spread = useSpread(() => documentId);
    search = useSearch(() => documentId);
    scrollManager = useScrollCapability();
</script>

<span></span>