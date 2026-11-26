import { useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UI_COPY, type Locale } from '../data/i18n';
import { assetUrl, type ReleaseManifest } from '../data/release';
import { useScrollProgress, useScrollReveal } from '../hooks/useMotion';
import { CloseIcon, DownloadIcon, MenuIcon } from './Icons';

interface LayoutProps {
  locale: Locale;
  onLocaleChange: (next: Locale) => void;
  manifest: ReleaseManifest;
  children: ReactNode;
}

export function Layout({ locale, onLocaleChange, manifest, children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const t = UI_COPY[locale];

  useScrollReveal(pathname);
  useScrollProgress(progressRef, pathname);

  const isDocs = pathname.startsWith('/docs');
  const isDownload = pathname.startsWith('/download');
  const isChangelog = pathname.startsWith('/changelog');

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand-link" onClick={() => setMenuOpen(false)}>
            <img src={assetUrl('media/nakroth-icon.png')} alt="" className="brand-mark" width={28} height={28} />
            <span>Nakroth</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <Link to="/docs/getting-started" className="nav-link" aria-current={isDocs ? 'page' : undefined}>
              {t.nav.docs}
            </Link>
            <Link to="/download" className="nav-link" aria-current={isDownload ? 'page' : undefined}>
              {t.nav.download}
            </Link>
            <Link to="/changelog" className="nav-link" aria-current={isChangelog ? 'page' : undefined}>
              {t.nav.changelog}
            </Link>
            <a
              href="https://github.com/ShinRyu04/Nakroth"
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              {t.nav.github}
            </a>
          </nav>

          <div className="nav-actions">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className="lang-btn"
                aria-pressed={locale === 'en'}
                onClick={() => onLocaleChange('en')}
              >
                EN
              </button>
              <button
                type="button"
                className="lang-btn"
                aria-pressed={locale === 'id'}
                onClick={() => onLocaleChange('id')}
              >
                ID
              </button>
              <button
                type="button"
                className="lang-btn"
                aria-pressed={locale === 'zh'}
                onClick={() => onLocaleChange('zh')}
              >
                中文
              </button>
            </div>

            <Link to="/download" className="btn-primary btn-sm">
              <DownloadIcon />
              <span>{t.nav.download}</span>
            </Link>

            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav className={`mobile-drawer${menuOpen ? ' is-open' : ''}`} aria-label="Mobile navigation">
          <Link to="/docs/getting-started" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.nav.docs}
          </Link>
          <Link to="/download" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.nav.download}
          </Link>
          <Link to="/changelog" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.nav.changelog}
          </Link>
          <a
            href="https://github.com/ShinRyu04/Nakroth"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.github}
          </a>
        </nav>
        <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      </header>

      <main className="site-main">
        <div key={pathname} className="page-stage">
          {children}
        </div>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-links">
            <Link to="/docs/getting-started">{t.nav.docs}</Link>
            <Link to="/download">{t.nav.download}</Link>
            <Link to="/changelog">{t.nav.changelog}</Link>
            <a href={manifest.release_url} target="_blank" rel="noreferrer">
              Release {manifest.tag}
            </a>
            <a href="https://github.com/ShinRyu04/Nakroth/issues" target="_blank" rel="noreferrer">
              Issues
            </a>
            <a href="https://github.com/ShinRyu04" target="_blank" rel="noreferrer">
              ShinRyu04
            </a>
          </div>
          <div className="footer-copy">{t.footer.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
