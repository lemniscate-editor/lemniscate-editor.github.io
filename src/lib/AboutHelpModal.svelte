<script lang='ts'>
    import {
        ListItem,
        Modal,
        OutboundLink,
        Stack,
        UnorderedList
    } from 'carbon-components-svelte';

    let { open = $bindable() } : { open: boolean } = $props();
</script>

<Modal
    bind:open
    passiveModal
    size='sm'
    modalHeading='About & Help'
>
    <Stack gap={4}>
        <div>Lemniscate Editor is an editor for typing in Markdown and creating a PDF via conversion to LaTeX. This means LaTeX can be included directly in the Markdown text!</div>
        <div>In the Document Configuration menu, the following can be edited:</div>
        <UnorderedList>
            <ListItem>Whether or not to include a title and the details of the title (including author and date)</ListItem>
            <ListItem>Choosing between the article and beamer class for the PDF (including theme and color for presentations)</ListItem>
            <ListItem>A LaTeX document preamble for specifying packages and commands</ListItem>
            <ListItem>Pandoc markdown extensions for compilation to LaTeX</ListItem>
        </UnorderedList>
        <div>For help with Markdown syntax, visit <OutboundLink href='https://daringfireball.net/projects/markdown/syntax' target='_blank'>John Gruber's page</OutboundLink></div>
        <div>For help with LaTeX syntax, visit <OutboundLink href='https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes' target='_blank'>Overleaf's "Learn LaTeX in 30 Minutes"</OutboundLink></div>
        <div>The source code for Lemniscate Editor is available on <OutboundLink href='https://github.com/lemniscate-editor/lemniscate-editor.github.io' target='_blank'>GitHub</OutboundLink></div>
    </Stack>
</Modal>