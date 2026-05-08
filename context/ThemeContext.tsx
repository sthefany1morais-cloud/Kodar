import React, { createContext, useContext, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { defaultTheme } from "../constants/defaultTheme";

type ThemeType = typeof defaultTheme;

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeType>(defaultTheme);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledThemeProvider theme={defaultTheme}>
      <ThemeContext.Provider value={defaultTheme}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
