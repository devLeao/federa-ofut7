'use client'
import { ReactLenis } from '@studio-freight/react-lenis'

// Forçando a tipagem para aceitar qualquer conteúdo e sumir o erro de vez
export default function SmoothScroll({ children }: { children: any }) {
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