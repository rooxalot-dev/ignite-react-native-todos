export type Theme = {
    primary: string;
    secondary: string;
    highlight: string;
    text: string;
    background: string;
};

type ThemeCollection = {
    [key: string]: Theme;
};

export const themeCollection: ThemeCollection = {
    light: {
        primary: '#8257E5',
        secondary: '#57E582',
        highlight: '#FFF',
        text: '#666',
        background: '#EBEBEB',
    },
    dark: {
        primary: '#3a506b',
        secondary: '#0b132b',
        highlight: '#FFF',
        text: '#B2B2B2',
        background: '#0b132b',
    }
}