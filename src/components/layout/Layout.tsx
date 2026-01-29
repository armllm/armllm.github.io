import Header from './Header'
import Footer from './Footer'
import ParticlesBackground from '../ParticlesBackground'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background logo watermark */}
      <div 
        className="fixed inset-0 -z-20 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'url(/images/logo_armllm_bg_removed.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '80%'
        }}
      />
      
      <ParticlesBackground />
      <Header />
      
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}
