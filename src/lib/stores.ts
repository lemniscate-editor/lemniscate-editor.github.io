import { writable } from 'svelte/store';

import type {
    ConfigValues,
    SettingsValues
} from './types.ts';

const storable = <T>(
    key: string,
    initial: T,
    serialize: (value: T) => string,
    deserialize: (value: string) => T
) => {
    const { subscribe, set, update } = writable(initial);
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        if (stored) set(deserialize(stored));
    }
    subscribe((value: T) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(key, serialize(value));
    });
    return {
        subscribe,
        set,
        update
    }
}

export const EditorStore = storable<string>(
    'editor',
    '',
    (input: string): string => input,
    (str: string): string => str
);

export const ConfigStore = storable<ConfigValues>(
    'config',
    {
        title: '',
        author: '',
        date: '',
        paperSize: 'letterpaper',
        lmargin: '0.5in',
        rmargin: '0.5in',
        tmargin: '0.5in',
        bmargin: '0.5in',
        formatSelect: 'article',
        beamerTheme: 'default',
        beamerColor: 'default',
        beamerAspectRatio: '43',
        preamble: '',
        extensions: ''
    },
    (config: ConfigValues): string => JSON.stringify(config),
    (str: string): ConfigValues => JSON.parse(str)
)

export const SettingsStore = storable<SettingsValues>(
    'settings',
    {
        theme: 'dark',
        tabSize: 4,
        lineWrapping: false,
        lineNumbers: true,
        closeBrackets: true
    },
    (settings: SettingsValues): string => JSON.stringify(settings),
    (str: string): SettingsValues => JSON.parse(str)
)