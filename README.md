# Lemniscate Editor

A simple Markdown with LaTeX editor in the browser.

## How it Works

The text in the editor is converted from Markdown to LaTeX using the Web Assembly port of Pandoc. Optional Pandoc Markdown extensions may be applied in the document configuration and both article and Beamer document classes are supported in the conversion from Markdown to LaTeX. Since the Pandoc port cannot generate PDF files directly, the output is then passed to Siglum's Web Assembly port of TeXLive and a PDF is generated using pdfTeX. A preamble for the LaTeX document may be included in the document configuration.

## About

Lemniscate Editor is written in [TypeScript](https://www.typescriptlang.org/) with [Svelte](https://svelte.dev/).

The following packages are also utilized:

- Theme: [Carbon Components](https://svelte.carbondesignsystem.com/) & [Icons](https://carbon-icons-svelte.onrender.com/)
- Editor: [Codemirror](https://github.com/touchifyapp/svelte-codemirror-editor)
- Markdown Conversion: [Pandoc](https://github.com/pandoc/pandoc-wasm)
- LaTeX Compiler: [Siglum](https://github.com/SiglumProject/siglum)
- PDF Viewer: [Svelte PDF View](https://github.com/nullpointerexceptionkek/svelte-pdf-view)

Settings and configuration are saved in `localStorage` for ease of use over time.
