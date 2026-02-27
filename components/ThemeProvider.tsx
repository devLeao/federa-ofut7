'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode, ComponentProps } from 'react'

// Criamos a nossa própria tipagem pegando carona na original
interface ThemeProviderProps extends ComponentProps<typeof NextThemesProvider> {
  children: ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}