<script lang='ts'>
    import {
        FileUploader,
        Modal
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
    <FileUploader
        multiple
        bind:files={images}
        status='edit'
        labelTitle='Upload Images'
        buttonLabel='Add'
        labelDescription='Allowed files: .jpg, .png'
        accept={['.jpg', '.png']}
    />
</Modal>