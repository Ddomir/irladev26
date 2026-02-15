import { NavLink } from 'react-router-dom'
import { Plus } from 'lucide-react'

const links = [
  { label: 'About', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blogs', to: '/blogs' },
]

export default function Footer() {
  return (
    <nav className="z-50">
      <div className="mx-auto flex items-center px-10 py-4 gap-10 bg-slate-900">
        <NavLink to="/" className="text-xl font-bold text-accent">
          <Plus strokeWidth={1}/>
        </NavLink>
        <span className="flex-1 h-px bg-primary"/>

        
      </div>
    </nav>
  )
}
