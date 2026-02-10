# Lemniscate Editor

A simple Markdown with LaTeX editor in the browser. Leverages Web Assembly ports of Pandoc and TeXLive for PDF compilation.

## About

Lemniscate Editor is written in [TypeScript](https://www.typescriptlang.org/) with [Svelte](https://svelte.dev/).

The following packages are also utilized:

- Theme: [Carbon Components](https://svelte.carbondesignsystem.com/) & [Icons](https://carbon-icons-svelte.onrender.com/)
- Editor: [Codemirror](https://github.com/touchifyapp/svelte-codemirror-editor)
- Markdown Conversion: [Pandoc](https://github.com/pandoc/pandoc-wasm)
- LaTeX Compiler: [Siglum](https://github.com/SiglumProject/siglum)
- PDF Viewer: [Svelte PDF View](https://github.com/nullpointerexceptionkek/svelte-pdf-view)

Settings and configuration are saved in `localStorage` for ease of use over time.
