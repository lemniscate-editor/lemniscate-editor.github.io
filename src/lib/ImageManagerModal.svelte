<script lang='ts'>
    import {
        FileUploader,
        Modal,
        Stack
    } from 'carbon-components-svelte';

    let {
        open = $bindable(),
        images = $bindable()
    }: {
        open: boolean,
        images: File[]
    } = $props();
</script>

<Modal
    bind:open
    passiveModal
    size='sm'
    modalHeading='Image Manager'    
>
    <Stack gap={5}>
        <div>Note: image uploads are not saved when the tab/window is closed.</div>
        <div>Use Markdown or LaTeX to insert images.</div>
        <FileUploader
            multiple
            bind:files={images}
            status='edit'
            labelTitle='Upload Images'
            buttonLabel='Add'
            labelDescription='Allowed files: .jpg, .png'
            accept={['.jpg', '.png']}
        />
    </Stack>
</Modal>