<script lang='ts'>
    import {
        Checkbox,
        Modal,
        NumberInput,
        RadioButton,
        RadioButtonGroup,
        Stack
    } from 'carbon-components-svelte';

    import { SettingsStore } from './stores.ts';

    let {
        open = $bindable()
    } : {
        open: boolean
    } = $props();

    let theme: 'light' | 'dark' = $state($SettingsStore.theme);
    let tabSize: number = $state($SettingsStore.tabSize);
    let lineWrapping: boolean = $state($SettingsStore.lineWrapping);
    let lineNumbers: boolean = $state($SettingsStore.lineNumbers);
    let closeBrackets: boolean = $state($SettingsStore.closeBrackets);

    const submit = (): void => {
        SettingsStore.set({
            theme: theme,
            tabSize: tabSize,
            lineWrapping: lineWrapping,
            lineNumbers: lineNumbers,
            closeBrackets: closeBrackets
        });
        open = false;
    }

    const reset = (): void => {
        theme = $SettingsStore.theme;
        tabSize = $SettingsStore.tabSize;
        lineWrapping = $SettingsStore.lineWrapping;
        lineNumbers = $SettingsStore.lineNumbers;
        closeBrackets = $SettingsStore.closeBrackets;
    }
</script>

<Modal
    bind:open
    size='xs'
    modalHeading='Editor Settings'
    primaryButtonText='Save'
    secondaryButtonText='Cancel'
    shouldSubmitOnEnter={false}
    on:submit={submit}
    on:click:button--secondary={() => open = false}
    on:close={reset}
>
    <Stack gap={4}>
        <Stack orientation='horizontal' gap={2}>
            <RadioButtonGroup
                bind:selected={theme}
                legendText='Theme'    
            >
                <RadioButton
                    labelText='Light'
                    value='light'
                />
                <RadioButton
                    labelText='Dark'
                    value='dark'
                />
            </RadioButtonGroup>
            <NumberInput
                bind:value={tabSize}
                required
                hideSteppers
                min={0}
                labelText='Tab Size'
            />
        </Stack>
        <Checkbox
            bind:checked={lineWrapping}
            labelText='Line Wrapping'
        />
        <Checkbox
            bind:checked={lineNumbers}
            labelText='Line Numbers'
        />
        <Checkbox
            bind:checked={closeBrackets}
            labelText='Auto Close Brackets'
        />
    </Stack>
</Modal>