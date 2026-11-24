import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  CalendarDays,
  Menu as MenuIcon,
  Moon,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react';
import { navigation, siteConfig } from '../../config/site';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../hooks/useTheme';
import { useUi } from '../../context/UiContext';
import { BrandMark } from '../BrandMark';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { count } = useCart();
  const { openDrawer } = useUi();

  const isHome = location.pathname === '/';
  const solid = !isHome || scrolled || mobileOpen;

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className={solid ? 'site-nav site-nav--solid' : 'site-nav'}>
      <Link className="site-nav__brand" to="/" aria-label={`${siteConfig.name} home`}>
        <BrandMark />
        <span>{siteConfig.shortName}</span>
      </Link>

      <nav className="site-nav__links" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'site-nav__link is-active' : 'site-nav__link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="site-nav__actions">
        <button
          className="icon-button"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="icon-button icon-button--bag"
          type="button"
          onClick={openDrawer}
          aria-label={`Open my reservation, ${count} items`}
        >
          <ShoppingBag size={18} />
          {count > 0 ? <span className="bag-count">{count}</span> : null}
        </button>
        <Link className="button button--small button--gold" to="/reservations">
          <CalendarDays size={15} aria-hidden="true" /> Reserve
        </Link>
        <button
          className="icon-button site-nav__toggle"
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      <nav
        className="site-nav__mobile"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!mobileOpen}
      >
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              isActive ? 'site-nav__mobile-link is-active' : 'site-nav__mobile-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
        <button
          className="button button--gold"
          type="button"
          onClick={() => {
            setMobileOpen(false);
            openDrawer();
          }}
        >
          My reservation ({count})
        </button>
      </nav>
    </header>
  );
}
