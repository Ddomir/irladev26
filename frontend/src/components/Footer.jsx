import { Plus } from 'lucide-react'

export default function Footer() {
  return (
    <nav className="relative z-1">
      <div className="mx-auto flex items-center px-10 py-4 gap-10">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xl font-bold text-accent cursor-pointer">
          <Plus strokeWidth={1}/>
        </button>
        <span className="flex-1 h-px bg-primary"/>

        
      </div>
    </nav>
  )
}
