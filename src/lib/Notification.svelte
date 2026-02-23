<script module lang='ts'>
    import { writable } from 'svelte/store';
    export const openNotification = writable<boolean>(false);
</script>

<script lang='ts'>
    import { ToastNotification } from "carbon-components-svelte";
</script>

<div
    style:position='fixed'
    style:right='1rem'
    style:top='1rem'
    style:z-index={10}
>
    <ToastNotification
        bind:open={$openNotification}
        kind='warning'
        title='Please Wait'
        caption='Busytex is initializing'
        timeout={3000}
    />
</div>