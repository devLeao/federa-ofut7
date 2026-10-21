import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'

// Rodapé das páginas internas (mesmo da home)
export default function SiteFooter() {
  return (
    <footer className="bg-fem-red pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 text-[10rem] font-black text-white/[0.05] pointer-events-none select-none uppercase italic tracking-tighter -mb-10">
        FEM7SOC
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image src="/logo.png" alt="FEM7SOC" width={65} height={65} className="object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-black italic uppercase tracking-tighter text-2xl text-white">FEM7SOC</span>
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/80 font-black">Federação Mineira</span>
              </div>
            </Link>
            <p className="text-white/70 text-xs font-medium leading-relaxed max-w-sm italic">
              A entidade máxima do Futebol 7 Society em Minas Gerais. Desde 2008, promovendo a excelência técnica, ética e o profissionalismo em campo.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-white font-black uppercase italic tracking-tighter mb-6 text-sm">Navegação</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
              <li><Link href="/" className="hover:text-black transition-colors">Início</Link></li>
              <li><Link href="/institucional" className="hover:text-black transition-colors">Institucional</Link></li>
              <li><Link href="/cadastro-atleta" className="hover:text-black transition-colors">Cadastro de Atleta</Link></li>
              <li><Link href="/atletas" className="hover:text-black transition-colors">Atletas Inscritos</Link></li>
              <li><Link href="/sumulas" className="hover:text-black transition-colors">Central de Súmulas</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-white font-black uppercase italic tracking-tighter mb-6 text-sm">Conexão</h4>
            <div className="flex flex-col items-center md:items-start gap-6">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                Belo Horizonte - MG<br />
                contato@fem7soc.com.br
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/fem7soc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-fem-red transition-all shadow-sm">
                  <Instagram size={20} />
                </a>
                <a href="https://youtube.com/@federa_ofut7" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-fem-red transition-all shadow-sm">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.3em] text-center md:text-left">
            © {new Date().getFullYear()} Federação Mineira de Futebol 7 Society • Todos os direitos reservados
          </p>
          <a href="https://devleaoagencia.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row items-center gap-2 opacity-80 hover:opacity-100 transition-all group cursor-pointer text-center">
            <span className="text-[8px] font-black uppercase tracking-widest text-white/50">Desenvolvido por</span>
            <span className="text-[11px] font-black italic uppercase text-white tracking-tighter">
              DevLeão <span className="text-black group-hover:text-white transition-colors">Agency</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
