<script lang='ts'>
    import {
        Modal
    } from 'carbon-components-svelte';

    let {
        open = $bindable(),
        errorPackage,
        errorText
    } : {
        open: boolean,
        errorPackage: string,
        errorText: string
    } = $props();
</script>

<Modal
    bind:open
    size='xs'
    passiveModal
    modalHeading={`Error with ${errorPackage}`}
    on:close={() => {
        open = false;
    }}
>
    {errorText}
</Modal>