import { NavLink, Outlet } from 'react-router-dom'
import '../site.css'

const nav = [
  { to: '/', label: 'Start' },
  { to: '/protocols', label: 'Protocols' },
  { to: '/paper', label: 'Paper' },
  { to: '/toy', label: 'Toy' },
  { to: '/methods', label: 'Methods' },
  { to: '/trust-network', label: 'Trust Networks' },
  { to: '/faq', label: 'FAQ' },
  { to: '/objections', label: 'Objections' },
  { to: '/references', label: 'References' },
]

export function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>
          Credible exit is bounded by weight, time, and the assumptions users accept.
        </p>
      </footer>
    </div>
  )
}
