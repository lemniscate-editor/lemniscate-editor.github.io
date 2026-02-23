<script lang='ts'>
    import {
        onMount,
        type SvelteComponent
    } from 'svelte';
    import {
        Column,
        FileUploaderButton,
        Grid,
        Row,
        Toolbar,
        TooltipDefinition
    } from 'carbon-components-svelte';
    import {
        DocumentAdd,
        DocumentConfiguration,
        DocumentExport,
        DocumentImport,
        Download,
        FitToScreen,
        Help,
        Image,
        Play,
        Printer,
        RightPanelClose,
        Settings,
        SidePanelClose,
        SplitScreen,
        ZoomFit,
        ZoomIn,
        ZoomOut
    } from 'carbon-icons-svelte';
    import CodeMirror from 'svelte-codemirror-editor';
    import { markdown } from '@codemirror/lang-markdown';
    import { basicDark } from 'cm6-theme-basic-dark';
    import { basicLight } from 'cm6-theme-basic-light';
    import FileSaver from 'file-saver';
    import { convert } from 'pandoc-wasm';
    import { BusyTexRunner, PdfLatex } from 'texlyre-busytex';
    import { listen, onIdle } from 'svelte-idle';

    import AboutHelpModal from '$lib/AboutHelpModal.svelte';
    import ConfigModal from '$lib/ConfigModal.svelte';
    import ConfirmNewModal from '$lib/ConfirmNewModal.svelte';
    import ErrorModal from '$lib/ErrorModal.svelte';
    import ImageManagerModal from '$lib/ImageManagerModal.svelte';
    import SettingsModal from '$lib/SettingsModal.svelte';
    import PDFViewer from '$lib/PDFViewer.svelte';

    import { openNotification } from '$lib/Notification.svelte';
    import {
        ConfigStore,
        EditorStore,
        SettingsStore
    } from '../lib/stores.ts';

    let openConfigModal: boolean = $state(false);
    let openConfirmNewModal: boolean = $state(false);
    let openErrorModal: boolean = $state(false);
    let openSettingsModal: boolean = $state(false);
    let openImageManager: boolean = $state(false);
    let openAboutHelp: boolean = $state(false);

    let panelVisibility = $state<'editor' | 'split' | 'pdfviewer'>('split');
    let smL = $derived(panelVisibility === 'pdfviewer' ? 0 : 4);
    let mdL = $derived(panelVisibility === 'pdfviewer' ? 0 : 8);
    let lgL = $derived(panelVisibility === 'pdfviewer' ? 0 : panelVisibility === 'editor' ? 16 : 8);
    let smR = $derived(panelVisibility === 'editor' ? 0 : 4);
    let mdR = $derived(panelVisibility === 'editor' ? 0 : 8);
    let lgR = $derived(panelVisibility === 'editor' ? 0 : panelVisibility === 'pdfviewer' ? 16 : 8);
    let errorPackage = $state('');
    let errorText = $state('');

    // svelte-ignore non_reactive_update
    let ref: HTMLInputElement;
    let engine: PdfLatex;
    let pdfview: SvelteComponent;
    let editorInput: string = $state($EditorStore);
    let files: ReadonlyArray<File> = $state([]);
    let images: File[] = $state([]);

    const runner = new BusyTexRunner({
        busytexBasePath: '/busytex'
    });

    const newDocument = (): void => {
        editorInput = '';
        EditorStore.set('');
    }

    const importMarkdown = (event: CustomEvent): void => {
        const file = event.detail[0];
        const reader: FileReader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
            editorInput = reader.result as string;
        }
        files = [];
    }

    const exportMarkdown = (): void => {
        if (editorInput === '') return;
        const blob = new Blob([editorInput], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, `${$ConfigStore.title === '' ? 'lemniscate-editor' : $ConfigStore.title.toLowerCase().replaceAll(/[^a-z\d\s]/g, '').replaceAll(/\s/g, '-')}.md`);
    }

    const compile = async (): Promise<void> => {
        if (!runner.isInitialized()) {
            openNotification.set(true);
            return;
        }
        let metablock = `---\nlinkcolor: blue\n`;
        if ($ConfigStore.title !== '') metablock += `title: ${$ConfigStore.title}\n`;
        if ($ConfigStore.author !== '') metablock += `author: ${$ConfigStore.author}\n`;
        if ($ConfigStore.date !== '') metablock += `date: ${$ConfigStore.date}\n`;
        if ($ConfigStore.formatSelect === 'beamer') {
            metablock += `theme: ${$ConfigStore.beamerTheme}\ncolortheme: ${$ConfigStore.beamerColor}\naspectratio: ${$ConfigStore.beamerAspectRatio}\n`;
        } else {
            metablock += `geometry:\n- paper=${$ConfigStore.paperSize}\n- top=${$ConfigStore.tmargin}\n- bottom=${$ConfigStore.bmargin}\n- left=${$ConfigStore.lmargin}\n- right=${$ConfigStore.rmargin}\n`
        }
        metablock += `header-includes:\n- |\n  \`\`\`{=latex}\n  ${$ConfigStore.preamble.replace(/\n/gm, `\n  `)}\n  \`\`\`\n...`;
        const pandocResult = await convert({
            from: `markdown${$ConfigStore.extensions !== '' ? `+${$ConfigStore.extensions}` : ''}`,
            to: $ConfigStore.formatSelect === 'article' ? 'latex' : 'beamer',
            standalone: true
        }, `${metablock}\n${editorInput}`, {});
        if (pandocResult.stderr === '') {
            const result = await engine.compile({ input: pandocResult.stdout });
            if (result.success) {
                pdfview.openPdf(URL.createObjectURL(new Blob([ result.pdf! as Uint8Array<ArrayBuffer> ], { type: 'application/pdf' })));
            } else {
                errorPackage = 'texlyre/busytex';
                errorText = result.log;
                openErrorModal = true;
            }
        } else {
            errorPackage = 'pandoc-wasm';
            errorText = pandocResult.stderr;
            openErrorModal = true;
        }
    }

    onIdle(() => {
        EditorStore.set(editorInput);
    });

    onMount(async () => {
        listen({
            timer: 5000,
            cycle: 500
        });
        await runner.initialize(true);
        engine = new PdfLatex(runner);
    });
</script>

<svelte:head>
    <title>Lemniscate Editor</title>
</svelte:head>
<Grid fullWidth padding>
    <Row class='center-row'>
        <h1>Lemniscate Editor</h1>
    </Row>
    <Row>
        <Toolbar size='sm'>
            <div class='toolbar-wrapper'>
                <div>
                    <TooltipDefinition
                        tooltipText='New Document'
                        on:click={() => openConfirmNewModal = editorInput !== ''}
                    >
                        <DocumentAdd />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Import Document'
                        on:click={() => ref.click()}
                    >
                        <DocumentImport />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Export Document'
                        on:click={exportMarkdown}
                    >
                        <DocumentExport />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Document Configuration'
                        on:click={() => openConfigModal = true}
                    >
                        <DocumentConfiguration />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Image Manager (Coming Soon)'
                        on:click={() => {}}
                    >
                        <Image />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Editor Settings'
                        on:click={() => openSettingsModal = true}
                    >
                        <Settings />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='About & Help'
                        on:click={() => openAboutHelp = true}
                    >
                        <Help />
                    </TooltipDefinition>
                </div>
                <div>
                    <TooltipDefinition
                        tooltipText='View Editor Only'
                        on:click={() => {
                            panelVisibility = 'editor';
                            pdfview.spreadPdf(false);
                        }}
                    >
                        <RightPanelClose />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='View Split Screen'
                        on:click={() => {
                            panelVisibility = 'split';
                            pdfview.spreadPdf(false);
                        }}
                    >
                        <SplitScreen />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='View PDF Only'
                        on:click={() => {
                            panelVisibility = 'pdfviewer';
                            pdfview.spreadPdf(true);
                        }}
                    >
                        <SidePanelClose />
                    </TooltipDefinition>
                </div>
                <div>
                    <TooltipDefinition
                        tooltipText='Render PDF'
                        on:click={compile}
                    >
                        <Play />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Download PDF'
                        on:click={() => pdfview.exportPdf()}
                    >
                        <Download />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Zoom Out'
                        on:click={() => pdfview.zoomPdf('out')}
                    >
                        <ZoomOut />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Zoom to Fit'
                        on:click={() => pdfview.zoomPdf('fit')}
                    >
                        <ZoomFit />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Zoom In'
                        on:click={() => pdfview.zoomPdf('in')}
                    >
                        <ZoomIn />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Presentation Mode'
                        on:click={() => pdfview.fullscreenPdf()}
                    >
                        <FitToScreen />
                    </TooltipDefinition>
                    <TooltipDefinition
                        tooltipText='Print PDF'
                        on:click={() => pdfview.printPdf()}
                    >
                        <Printer />
                    </TooltipDefinition>
                </div>
            </div>
        </Toolbar>
    </Row>
    <Row>
        <Column sm={smL} md={mdL} lg={lgL}>
            <CodeMirror
                bind:value={editorInput}
                lang={markdown()}
                tabSize={$SettingsStore.tabSize}
                lineNumbers={$SettingsStore.lineNumbers}
                lineWrapping={$SettingsStore.lineWrapping}
                closeBrackets={$SettingsStore.closeBrackets}
                theme={$SettingsStore.theme === 'light' ? basicLight : basicDark}
            />
        </Column>
        <Column sm={smR} md={mdR} lg={lgR}>
            <PDFViewer bind:this={pdfview} />
        </Column>
    </Row>
</Grid>

<div class='hidden'>
    <FileUploaderButton
        bind:ref
        bind:files
        accept={['.md']}
        on:change={importMarkdown}
    />
</div>

<AboutHelpModal bind:open={openAboutHelp} />
<ConfigModal bind:open={openConfigModal} />
<ConfirmNewModal bind:open={openConfirmNewModal} {newDocument}/>
<ErrorModal bind:open={openErrorModal} {errorPackage} {errorText} />
<ImageManagerModal bind:open={openImageManager} bind:images />
<SettingsModal bind:open={openSettingsModal} />