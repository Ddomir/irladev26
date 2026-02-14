import { NavLink } from 'react-router-dom'
import { Feather } from 'lucide-react'

const links = [
  { label: 'About', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blogs', to: '/blogs' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md">
      <div className="mx-auto flex items-center px-10 py-4 gap-10">
        
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-primary ${isActive ? 'font-bold' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <span className="flex-1 h-px bg-primary"/>

        <NavLink to="/" className="text-xl font-bold text-accent">
          <Feather strokeWidth={1}/>
        </NavLink>
      </div>
    </nav>
  )
}
