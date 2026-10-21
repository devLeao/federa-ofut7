'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Início' },
  { href: '/institucional', label: 'Institucional' },
  { href: '/area-do-arbitro', label: 'Área do Árbitro' },
  { href: '/atletas', label: 'Atletas' },
]

// Navbar vermelha das páginas internas (mesma identidade da home)
export default function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const sumulasActive = pathname.startsWith('/sumulas')

  return (
    <nav className="fixed top-0 w-full z-[100] bg-fem-red backdrop-blur-xl border-b border-white/10 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="FEM7SOC" width={40} height={40} className="object-contain transition-transform group-hover:scale-105" />
          <div className="flex flex-col leading-none">
            <span className="font-black italic uppercase tracking-tighter text-xl text-white">FEM7SOC</span>
            <span className="text-[7px] uppercase tracking-[0.3em] text-white/80 font-bold">Federação Mineira</span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-colors hover:text-black ${isActive(link.href) ? 'text-white' : ''}`}
            >
              {link.label}
              {isActive(link.href) && <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white rounded-full" />}
            </Link>
          ))}
          <Link
            href="/sumulas"
            className={`px-6 py-2 transition-all font-black uppercase tracking-widest text-[10px] rounded-sm shadow-xl ${
              sumulasActive ? 'bg-black text-white' : 'bg-white text-fem-red hover:bg-black hover:text-white'
            }`}
          >
            Súmulas
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-fem-red border-b border-white/10 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6 text-white">
              {[...links, { href: '/sumulas', label: 'Súmulas' }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-black uppercase italic transition-colors hover:text-black ${
                    isActive(link.href) ? 'text-black underline underline-offset-8' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
