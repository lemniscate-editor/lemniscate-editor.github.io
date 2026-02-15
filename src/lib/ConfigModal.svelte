<script lang='ts'>
    import {
        Modal,
        OutboundLink,
        RadioButton,
        RadioButtonGroup,
        Select,
        SelectItem,
        Stack,
        TextArea,
        TextInput
    } from 'carbon-components-svelte';

    import { ConfigStore } from './stores.ts';
    import type {
        BeamerAspectRatio,
        BeamerColor,
        BeamerTheme,
        PaperSizes
    } from './types.ts';

    let { open = $bindable() } : { open: boolean } = $props();

    const beamerThemeOptions: BeamerTheme[] = ['default', 'AnnArbor', 'Antibes', 'Bergen', 'Berkeley', 'Berlin', 'Boadilla', 'CambridgeUS', 'Copenhagen', 'Darmstadt', 'Dresden', 'Frankfurt', 'Goettingen', 'Hannover', 'Ilmenau', 'JuanLesPins', 'Luebeck', 'Madrid', 'Malmoe', 'Marburg', 'Montpellier', 'PaloAlto', 'Pittsburgh', 'Rochester', 'Singapore', 'Szeged', 'Warsaw'];
    const beamerColorOptions: BeamerColor[] = ['default', 'albatross', 'beaver', 'beetle', 'crane', 'dolphin', 'dove', 'fly', 'lily', 'orchid', 'rose', 'seagull', 'seahorse', 'sidebartab', 'structure', 'whale', 'wolverine'];
    const BeamerAspectRatioOptions: {
        text: string,
        value: BeamerAspectRatio
    }[] = [
        { text: '4:3', value: '43' },
        { text: '16:9', value: '169' },
        { text: '16:10', value: '1610' },
        { text: '14:9', value: '149' },
        { text: '1.41:1', value: '141' },
        { text: '5:4', value: '54' },
        { text: '3:2', value: '32' }
    ];
    const formatOptions: ('article' | 'beamer')[] = ['article', 'beamer'];
    const paperSizeOptions: {
        text: string,
        value: PaperSizes
    }[] = [
        { text: 'Letter', value: 'letterpaper' },
        { text: 'Legal', value: 'legalpaper' },
        { text: 'A4', value: 'a4paper' }
    ];

    let title: string = $state($ConfigStore.title);
    let author: string = $state($ConfigStore.author);
    let date: string = $state($ConfigStore.date);
    let paperSize: PaperSizes = $state($ConfigStore.paperSize);
    let lmargin: string = $state($ConfigStore.lmargin);
    let rmargin: string = $state($ConfigStore.rmargin);
    let tmargin: string = $state($ConfigStore.tmargin);
    let bmargin: string = $state($ConfigStore.bmargin);
    let formatSelect: 'article' | 'beamer' = $state($ConfigStore.formatSelect);
    let beamerTheme: BeamerTheme = $state($ConfigStore.beamerTheme);
    let beamerColor: BeamerColor = $state($ConfigStore.beamerColor);
    let beamerAspectRatio: BeamerAspectRatio = $state($ConfigStore.beamerAspectRatio);
    let preamble: string = $state($ConfigStore.preamble);
    let extensions: string = $state($ConfigStore.extensions);

    const submit = (): void => {
        ConfigStore.set({
            title: title,
            author: author,
            date: date,
            paperSize: paperSize,
            lmargin: lmargin,
            rmargin: rmargin,
            tmargin: tmargin,
            bmargin: bmargin,
            formatSelect: formatSelect,
            beamerTheme: beamerTheme,
            beamerColor: beamerColor,
            beamerAspectRatio: beamerAspectRatio,
            preamble: preamble,
            extensions: extensions
        });
        open = false;
    }

    const reset = (): void => {
        title = $ConfigStore.title;
        author = $ConfigStore.author;
        date = $ConfigStore.date;
        paperSize = $ConfigStore.paperSize;
        lmargin = $ConfigStore.lmargin;
        rmargin = $ConfigStore.rmargin;
        tmargin = $ConfigStore.tmargin;
        bmargin = $ConfigStore.bmargin;
        formatSelect = $ConfigStore.formatSelect;
        beamerTheme = $ConfigStore.beamerTheme;
        beamerColor = $ConfigStore.beamerColor;
        beamerAspectRatio = $ConfigStore.beamerAspectRatio;
        preamble = $ConfigStore.preamble;
        extensions = $ConfigStore.extensions;
    }
</script>

<Modal
    bind:open
    hasScrollingContent
    size='sm'
    modalHeading='Document Configuration'
    primaryButtonText='Save'
    secondaryButtonText='Cancel'
    shouldSubmitOnEnter={false}
    on:submit={submit}
    on:click:button--secondary={() => open = false}
    on:close={reset}
>
    <Stack gap={4}>
        <TextInput
            bind:value={title}
            labelText='Title'
        />
        <TextInput
            bind:value={author}
            labelText='Author'
        />
        <TextInput
            bind:value={date}
            labelText='Date'
        />
        <Stack orientation='horizontal' gap={2}>
            <RadioButtonGroup
                bind:selected={formatSelect}
                legendText='Document Class'
            >
                {#each formatOptions as formatOption}
                    <RadioButton
                        labelText={formatOption.replace(/^./, l => l.toUpperCase())}
                        value={formatOption}
                    />
                {/each}
            </RadioButtonGroup>
            <Select
                bind:selected={paperSize}
                labelText='Paper Size'
                disabled={formatSelect !== 'article'}
            >
                {#each paperSizeOptions as paperSizeOption}
                    <SelectItem
                        text={paperSizeOption.text}
                        value={paperSizeOption.value}
                    />
                {/each}
            </Select>
        </Stack>
        <Stack orientation='horizontal' gap={2}>
            <TextInput
                bind:value={tmargin}
                labelText='Top Margin'
                disabled={formatSelect !== 'article'}
            />
            <TextInput
                bind:value={bmargin}
                labelText='Bottom Margin'
                disabled={formatSelect !== 'article'}
            />
            <TextInput
                bind:value={lmargin}
                labelText='Left Margin'
                disabled={formatSelect !== 'article'}
            />
            <TextInput
                bind:value={rmargin}
                labelText='Right Margin'
                disabled={formatSelect !== 'article'}
            />
        </Stack>
        <Stack orientation='horizontal' gap={2}>
            <Select
                bind:selected={beamerTheme}
                labelText='Beamer Theme'
                disabled={formatSelect !== 'beamer'}
            >
                {#each beamerThemeOptions as beamerThemeOption}
                    <SelectItem
                        text={beamerThemeOption}
                        value={beamerThemeOption}
                    />
                {/each}
            </Select>
            <Select
                bind:selected={beamerColor}
                labelText='Beamer Color'
                disabled={formatSelect !== 'beamer'}
            >
                {#each beamerColorOptions as beamerColorOption}
                    <SelectItem
                        text={beamerColorOption}
                        value={beamerColorOption}
                    />
                {/each}
            </Select>
            <Select
                bind:selected={beamerAspectRatio}
                labelText='Aspect Ratio'
                disabled={formatSelect !== 'beamer'}
            >
                {#each BeamerAspectRatioOptions as beamerAspectRatioOption}
                    <SelectItem
                        text={beamerAspectRatioOption.text}
                        value={beamerAspectRatioOption.value}
                    />
                {/each}
            </Select>
        </Stack>
        <TextArea
            bind:value={preamble}
            labelText='LaTeX Preamble'
            spellcheck='false'
            rows={5}
        />
        <TextInput
            bind:value={extensions}
            helperText='Separate by +'
        >
            <OutboundLink
                slot='labelChildren'
                href='https://pandoc.org/MANUAL.html#pandocs-markdown'
                target='_blank'
            >
                Pandoc Markdown Extensions
            </OutboundLink>
        </TextInput>
    </Stack>
</Modal>