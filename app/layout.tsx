import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider' 
// Importando o SmoothScroll da pasta de components conforme sua estrutura
import SmoothScroll from '@/components/SmoothScroll' 

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
          {/* O SmoothScroll envolve o children para aplicar o efeito em todas as páginas */}
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}