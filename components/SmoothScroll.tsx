'use client'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function SmoothScroll({ children }: { children: any }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reseta o scroll para o topo sempre que a rota mudar
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ReactLenis 
      root 
      autoRaf={true} 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
      }}
    >
      {children}
    </ReactLenis>
  )
}