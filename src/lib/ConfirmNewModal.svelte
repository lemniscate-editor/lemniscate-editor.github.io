<script lang='ts'>
    import {
        Modal
    } from 'carbon-components-svelte';

    let {
        open = $bindable(),
        newDocument
    } : {
        open: boolean,
        newDocument: () => void
    } = $props();
</script>

<Modal
    bind:open
    size='xs'
    danger
    modalHeading='Confirm New Document'
    primaryButtonText='Confirm'
    secondaryButtonText='Cancel'
    on:submit={() => {
        newDocument();
        open = false;
    }}
    on:click:button--secondary={() => open = false}
>
    Do you want to start a new document? This will erase all existing text.
</Modal>