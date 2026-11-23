import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CopyCommand } from '../components/CopyCommand';
import { SearchIcon } from '../components/Icons';
import { DOC_GROUPS, DOC_PAGES } from '../data/docs';
import { UI_COPY, type Locale } from '../data/i18n';

interface DocsPageProps {
  locale: Locale;
}

export function DocsPage({ locale }: DocsPageProps) {
  const { slug } = useParams();
  const [query, setQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const t = UI_COPY[locale];

  const activeSlug = slug || DOC_PAGES[0].slug;
  const pageIndex = Math.max(
    0,
    DOC_PAGES.findIndex((p) => p.slug === activeSlug),
  );
  const page = DOC_PAGES[pageIndex];
  const prevPage = pageIndex > 0 ? DOC_PAGES[pageIndex - 1] : null;
  const nextPage = pageIndex < DOC_PAGES.length - 1 ? DOC_PAGES[pageIndex + 1] : null;

  const filteredPages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DOC_PAGES;
    return DOC_PAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.paragraphs.some((para) => para.toLowerCase().includes(q)),
        ),
    );
  }, [query]);

  return (
    <div className="container docs-shell">
      <aside className="docs-sidebar" aria-label="Documentation navigation">
        <button
          type="button"
          className="docs-mobile-toggle"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span>{locale === 'id' ? `Daftar Dokumentasi — ${page.title}` : `Docs menu — ${page.title}`}</span>
          <span>{mobileNavOpen ? '−' : '+'}</span>
        </button>

        <div className={`docs-sidebar-body${mobileNavOpen ? ' is-open' : ''}`}>
          <div className="docs-search-wrap">
            <SearchIcon className="docs-search-icon" />
            <input
              type="search"
              className="docs-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={locale === 'id' ? 'Cari dokumentasi...' : 'Filter docs...'}
              aria-label="Filter documentation pages"
            />
          </div>

          {DOC_GROUPS.map((group) => {
            const items = filteredPages.filter((p) => p.group === group.id);
            if (items.length === 0) return null;
            return (
              <div key={group.id} className="docs-nav-group">
                <div className="docs-nav-group-label">{group.label}</div>
                <ul className="docs-nav-list">
                  {items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/docs/${item.slug}`}
                        className={`docs-nav-link${item.slug === page.slug ? ' is-active' : ''}`}
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {filteredPages.length === 0 && (
            <p className="footer-copy">
              {locale === 'id' ? 'Tidak ada halaman yang cocok.' : 'No matching documentation pages.'}
            </p>
          )}
        </div>
      </aside>

      <article className="docs-article">
        <h1>{page.title}</h1>
        <p className="docs-summary">{page.summary}</p>

        {page.sections.map((section) => (
          <section key={section.id} id={section.id} className="docs-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}

            {section.bullets && (
              <ul>
                {section.bullets.map((b) => (
                  <li key={b.lead}>
                    <strong>{b.lead}:</strong> {b.text}
                  </li>
                ))}
              </ul>
            )}

            {section.code && (
              <div className="code-block">
                <div className="code-block-head">
                  <span>{section.code.label}</span>
                  <CopyCommand
                    command={section.code.content}
                    copyLabel={t.hero.copy}
                    copiedLabel={t.hero.copied}
                    buttonOnly
                  />
                </div>
                <pre>
                  <code>{section.code.content}</code>
                </pre>
              </div>
            )}

            {section.callout && <div className="docs-callout">{section.callout}</div>}
          </section>
        ))}

        <nav className="docs-pager" aria-label="Documentation pagination">
          {prevPage ? (
            <Link to={`/docs/${prevPage.slug}`} className="docs-pager-link">
              <span className="docs-pager-label">{locale === 'id' ? 'Sebelumnya' : 'Previous'}</span>
              <span className="docs-pager-title">{prevPage.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {nextPage && (
            <Link to={`/docs/${nextPage.slug}`} className="docs-pager-link">
              <span className="docs-pager-label">{locale === 'id' ? 'Berikutnya' : 'Next'}</span>
              <span className="docs-pager-title">{nextPage.title}</span>
            </Link>
          )}
        </nav>
      </article>

      <aside className="docs-toc" aria-label="On this page">
        <div className="docs-toc-title">{locale === 'id' ? 'Di halaman ini' : 'On this page'}</div>
        <ul>
          {page.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.heading}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
