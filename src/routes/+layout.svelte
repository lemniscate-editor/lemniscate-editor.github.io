<script lang='ts'>
    import 'carbon-components-svelte/css/all.css';
    import '$lib/css/main.css';
    import '$lib/css/fonts.css';
    import {
        Content,
        Theme
    } from 'carbon-components-svelte';

    import { SettingsStore } from '../lib/stores.ts';

    let { children } = $props();
</script>

<Theme theme={$SettingsStore.theme === 'light' ? 'g10' : 'g90'} />
<Content>{@render children()}</Content>