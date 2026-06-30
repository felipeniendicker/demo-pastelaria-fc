import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Package,
  Receipt,
  Sandwich,
  ShoppingBag,
  Wallet
} from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/propostas', label: 'Propostas', icon: ClipboardList },
  { to: '/cardapio', label: 'Cardápio Online', icon: Sandwich },
  { to: '/pedidos', label: 'Pedidos', icon: ShoppingBag },
  { to: '/produtos', label: 'Produtos', icon: Package },
  { to: '/estoque', label: 'Estoque', icon: BarChart3 },
  { to: '/custos', label: 'Custos e Precificação', icon: Receipt },
  { to: '/financeiro', label: 'Financeiro', icon: Wallet },
  { to: '/sobre', label: 'Sobre a Demo', icon: ClipboardList }
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      <button className="mobile-toggle" onClick={() => setMobileOpen((value) => !value)}>
        Menu
      </button>
      <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="brand">
          <div className="brand__badge">FC</div>
          <div>
            <strong>Pastelaria FC</strong>
            <p>Demo comercial completa</p>
          </div>
        </div>
        <nav>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      {mobileOpen ? <div className="backdrop" onClick={() => setMobileOpen(false)} /> : null}
    </>
  );
}
