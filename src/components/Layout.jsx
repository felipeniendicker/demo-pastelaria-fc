import Sidebar from './Sidebar';

export default function Layout({ children, mobileOpen, setMobileOpen }) {
  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="content">{children}</main>
    </div>
  );
}
