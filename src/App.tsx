import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import type { Locale } from './data/i18n';
import { FALLBACK_MANIFEST, loadLatestManifest, type ReleaseManifest } from './data/release';
import { ChangelogPage } from './pages/ChangelogPage';
import { DocsPage } from './pages/DocsPage';
import { DownloadPage } from './pages/DownloadPage';
import { HomePage } from './pages/HomePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const saved = window.localStorage.getItem('nakroth_locale');
      if (saved === 'en' || saved === 'id' || saved === 'zh') return saved;
    } catch {
      // ignore storage errors
    }
    return 'en';
  });
  const [manifest, setManifest] = useState<ReleaseManifest>(FALLBACK_MANIFEST);

  const handleLocaleChange = (next: Locale) => {
    setLocale(next);
    try {
      window.localStorage.setItem('nakroth_locale', next);
      document.documentElement.lang = next === 'zh' ? 'zh-CN' : next;
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    let active = true;
    loadLatestManifest().then((m) => {
      if (active) setManifest(m);
    });
    return () => {
      active = false;
    };
  }, []);

  const basename = import.meta.env.BASE_URL.replace(/\/+$/, '') || undefined;

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <Layout locale={locale} onLocaleChange={handleLocaleChange} manifest={manifest}>
        <Routes>
          <Route path="/" element={<HomePage locale={locale} manifest={manifest} />} />
          <Route path="/docs" element={<Navigate to="/docs/getting-started" replace />} />
          <Route path="/docs/:slug" element={<DocsPage locale={locale} />} />
          <Route path="/download" element={<DownloadPage locale={locale} manifest={manifest} />} />
          <Route path="/changelog" element={<ChangelogPage locale={locale} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
