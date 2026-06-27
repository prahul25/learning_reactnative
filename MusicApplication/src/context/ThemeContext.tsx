import React, {createContext, useContext, useState, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {colors} from '../constants/theme';

type ThemeMode = 'light' | 'dark';
type ThemeColors = typeof colors.light;

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    systemScheme === 'dark' ? 'dark' : 'light',
  );

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({mode, colors: colors[mode], toggleTheme}),
    [mode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
