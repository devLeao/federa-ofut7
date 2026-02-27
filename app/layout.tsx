import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// 1. Importe o ThemeProvider que acabamos de criar
import { ThemeProvider } from '@/components/ThemeProvider' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FEM7SOC - Federação Mineira',
  description: 'Sistema Oficial da Federação Mineira de Futebol Society',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}