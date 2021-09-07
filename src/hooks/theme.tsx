import React, { createContext, useContext, useEffect, useState } from 'react';

import { Theme, themeCollection } from '../styles/theme';

interface ThemeContextData {
    themeName: string;
    theme: Theme;
    switchTheme: () => string;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
    const [themeName, setThemeName] = useState('light');
    const [theme, setTheme] = useState<Theme>(themeCollection[themeName]);

    function switchTheme(): string {
        setThemeName(themeName === 'light' ? 'dark' : 'light');
        return themeName;
    }

    useEffect(() => {
        setTheme(themeCollection[themeName]);
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }

    return context;
}
