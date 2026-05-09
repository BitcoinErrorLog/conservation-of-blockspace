import { NavLink, Outlet } from 'react-router-dom'
import { TOY_VERSION } from '../lib/math'
import '../site.css'

const nav = [
  { to: '/', label: 'Start' },
  { to: '/toy', label: 'Toy' },
  { to: '/trust-network', label: 'Trust Network' },
  { to: '/protocols', label: 'Protocols' },
  { to: '/methods', label: 'Methods' },
  { to: '/paper', label: 'Paper' },
  { to: '/faq', label: 'FAQ' },
  { to: '/objections', label: 'Objections' },
  { to: '/review', label: 'Review packet' },
  { to: '/references', label: 'References' },
]

export function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="site-brand">
          <NavLink to="/" className="site-title">
            Conservation of Blockspace
          </NavLink>
          <p className="site-tagline">Credible exit, Layer~1 enforcement, and scaling claims</p>
        </div>
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
          Toy math version {TOY_VERSION} · Static bound, not a mempool simulator.
        </p>
      </footer>
    </div>
  )
}
