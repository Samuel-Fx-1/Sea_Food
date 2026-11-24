import { useEffect, useState } from 'react';
import {
  brandAriaLabel,
  navLinks,
  reserveLink,
  siteBrand,
} from '../data/site';
import { BrandMark } from './BrandMark';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeNavigation = (): void => {
    setIsOpen(false);
  };

  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label={brandAriaLabel}>
        <BrandMark />
        <span>{siteBrand}</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="header-reserve" href={reserveLink.href}>
        {reserveLink.label} <span aria-hidden="true">↗</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-controls="mobile-nav"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        className="mobile-nav"
        id="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!isOpen}
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeNavigation}>
            {link.label}
          </a>
        ))}
        <a href={reserveLink.href} onClick={closeNavigation}>
          {reserveLink.label}
        </a>
      </nav>
    </header>
  );
}
