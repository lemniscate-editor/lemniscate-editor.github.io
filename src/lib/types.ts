import type { DocumentState } from '@embedpdf/core';
import type { DocumentManagerCapability } from '@embedpdf/plugin-document-manager/svelte';
import type { ExportScope } from '@embedpdf/plugin-export/svelte';
import type { PrintScope } from '@embedpdf/plugin-print/svelte';
import type { 
    ZoomDocumentState,
    ZoomScope
} from '@embedpdf/plugin-zoom/svelte';
import type {
    SpreadScope,
    SpreadMode
} from '@embedpdf/plugin-spread/svelte';
import type {
    FullscreenCapability,
    FullscreenState
} from '@embedpdf/plugin-fullscreen/svelte';

export interface ActiveDocument {
    activeDocumentId: string | null;
    activeDocument: DocumentState | null;
}

export interface DocumentManager {
    provides: Readonly<DocumentManagerCapability> | null,
    isLoading: boolean,
    ready: Promise<void>
}

export interface Fullscreen {
    readonly provides: Readonly<FullscreenCapability> | null;
    state: FullscreenState;
}

export interface UsePrintReturn {
    provides: PrintScope | null
}

export interface UseExportReturn {
    provides: ExportScope | null;
}

export interface UseZoomReturn {
    provides: ZoomScope | null;
    state: ZoomDocumentState;
}

export interface UseSpreadReturn {
    provides: SpreadScope | null;
    spreadMode: SpreadMode;
}

export type PaperSizes =
    'letterpaper' |
    'legalpaper' |
    'a4paper';

export type BeamerTheme =
    'default' |
    'AnnArbor' |
    'Antibes' |
    'Bergen' |
    'Berkeley' |
    'Berlin' |
    'Boadilla' |
    'CambridgeUS' |
    'Copenhagen' |
    'Darmstadt' |
    'Dresden' |
    'Frankfurt' |
    'Goettingen' |
    'Hannover' |
    'Ilmenau' |
    'JuanLesPins' |
    'Luebeck' |
    'Madrid' |
    'Malmoe' |
    'Marburg' |
    'Montpellier' |
    'PaloAlto' |
    'Pittsburgh' |
    'Rochester' |
    'Singapore' |
    'Szeged' |
    'Warsaw';

export type BeamerColor =
    'default' |
    'albatross' |
    'beaver' |
    'beetle' |
    'crane' |
    'dolphin' |
    'dove' |
    'fly' |
    'lily' |
    'orchid' |
    'rose' |
    'seagull' |
    'seahorse' |
    'sidebartab' |
    'structure' |
    'whale' |
    'wolverine';

export type BeamerAspectRatio = 
    '43' |
    '169' |
    '1610' |
    '149' |
    '141' |
    '54' |
    '32';

export interface ConfigValues {
    title: string,
    author: string,
    date: string,
    paperSize: PaperSizes,
    lmargin: string,
    rmargin: string,
    tmargin: string,
    bmargin: string,
    formatSelect: 'article' | 'beamer',
    beamerTheme: BeamerTheme,
    beamerColor: BeamerColor,
    beamerAspectRatio: BeamerAspectRatio,
    preamble: string,
    extensions: string
}

export interface SettingsValues {
    theme: 'light' | 'dark',
    tabSize: number,
    lineWrapping: boolean,
    lineNumbers: boolean,
    closeBrackets: boolean
}