'use client'
import { ReactLenis } from '@studio-freight/react-lenis'
import { ReactNode, useEffect, useState } from 'react'

export default function SmoothScroll({ children }: { children: any }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // No build da Vercel (Server Side), ele renderiza apenas o conteúdo puro
  // No navegador, ele ativa o scroll suave
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true,
        syncTouch: true 
      }}
    >
      {children}
    </ReactLenis>
  )
}