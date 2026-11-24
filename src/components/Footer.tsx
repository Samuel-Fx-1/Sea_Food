import { Fragment } from 'react';
import { footerContent } from '../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer page-gutter">
      <div className="footer-top">
        <a className="footer-brand" href="#top">
          {footerContent.brand}
          <span className="footer-wave">{footerContent.brandWave}</span>
        </a>
        <p>
          {footerContent.taglineLines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </p>
      </div>

      <div className="footer-bottom">
        <span>
          © {year} {footerContent.copyright}
        </span>
        <div>
          {footerContent.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a href="#top">{footerContent.backToTop}</a>
      </div>
    </footer>
  );
}
