import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CopyCommand } from '../components/CopyCommand';
import { BookIcon, DownloadIcon } from '../components/Icons';
import { AGENT_MATRIX, STUDIO_GROUPS, UI_COPY, type Locale } from '../data/i18n';
import {
  INSTALL_COMMANDS,
  assetUrl,
  detectUserOs,
  primaryAssetForOs,
  type ReleaseManifest,
} from '../data/release';

interface HomePageProps {
  locale: Locale;
  manifest: ReleaseManifest;
}

export function HomePage({ locale, manifest }: HomePageProps) {
  const t = UI_COPY[locale];
  const [activeMode, setActiveMode] = useState(0);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const os = detectUserOs();
  const primaryAsset = primaryAssetForOs(manifest, os);
  const currentMode = t.modes.items[activeMode];

  // Restrained scroll-linked parallax on the dimensional hero plane (GPU transform only)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = Math.min(window.scrollY, 720);
        const bg = backdropRef.current;
        if (bg) {
          bg.style.transform = `translate3d(0, ${(y * 0.16).toFixed(1)}px, 0) scale(${(1 + y * 0.00014).toFixed(4)})`;
        }
        const content = heroContentRef.current;
        if (content) {
          const progress = Math.min(1, y / 520);
          content.style.transform = `translate3d(0, ${(y * -0.05).toFixed(1)}px, 0)`;
          content.style.opacity = (1 - progress * 0.35).toFixed(3);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section className="hero-stage" aria-labelledby="hero-heading">
        <div className="hero-backdrop-plane" ref={backdropRef} aria-hidden="true">
          <img
            src={assetUrl('media/banner.jpg')}
            alt=""
            className="hero-backdrop-img"
            width={1600}
            height={900}
          />
        </div>
        <div className="hero-scrim" aria-hidden="true" />

        <div className="container">
          <div className="hero-content" ref={heroContentRef}>
            <h1 id="hero-heading" className="hero-title hero-enter" style={{ '--stagger': 0 } as CSSProperties}>
              {t.hero.title}
            </h1>
            <p className="hero-lead hero-enter" style={{ '--stagger': 1 } as CSSProperties}>
              {t.hero.lead}
            </p>

            <div className="hero-actions hero-enter" style={{ '--stagger': 2 } as CSSProperties}>
              <a href={primaryAsset.url} className="btn-primary">
                <DownloadIcon />
                <span>{t.hero.downloadFor[os]}</span>
              </a>
              <Link to="/docs/getting-started" className="btn-secondary">
                <BookIcon />
                <span>{t.hero.readDocs}</span>
              </Link>
            </div>

            <div className="hero-command-wrap hero-enter" style={{ '--stagger': 3 } as CSSProperties}>
              <CopyCommand
                command={INSTALL_COMMANDS[os]}
                copyLabel={t.hero.copy}
                copiedLabel={t.hero.copied}
              />
            </div>

            <div className="hero-meta-row hero-enter" style={{ '--stagger': 4 } as CSSProperties}>
              <span>{manifest.tag}</span>
              <span>{primaryAsset.size_mb.toFixed(1)} MB</span>
              <Link to="/download">{t.hero.allPlatforms}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="modes-heading">
        <div className="container">
          <div className="section-head" data-reveal="">
            <h2 id="modes-heading" className="section-title">
              {t.modes.title}
            </h2>
            <p className="section-desc">{t.modes.desc}</p>
          </div>

          <div className="workbench-switcher" data-reveal="" data-reveal-delay="1">
            <div className="mode-tabs" role="tablist" aria-label="Nakroth workspace modes">
              {t.modes.items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeMode === idx}
                  aria-controls={`panel-${item.id}`}
                  id={`tab-${item.id}`}
                  className="mode-tab"
                  onClick={() => setActiveMode(idx)}
                >
                  <span>{item.label}</span>
                  <span className="mode-tab-kbd">{item.shortcut}</span>
                </button>
              ))}
            </div>

            <div
              key={currentMode.id}
              className="mode-stage-grid mode-stage-swap"
              role="tabpanel"
              id={`panel-${currentMode.id}`}
              aria-labelledby={`tab-${currentMode.id}`}
            >
              <div className="product-frame">
                <img
                  src={assetUrl(currentMode.image)}
                  alt={currentMode.alt}
                  width={1600}
                  height={960}
                />
              </div>

              <div className="mode-notes">
                <h3>{currentMode.heading}</h3>
                <p>{currentMode.body}</p>
                <ul className="feature-list">
                  {currentMode.points.map(([lead, detail]) => (
                    <li key={lead}>
                      <strong>{lead}</strong>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--surface" aria-labelledby="v113-heading">
        <div className="container">
          <div className="section-head" data-reveal="">
            <h2 id="v113-heading" className="section-title">
              {t.v113.title}
            </h2>
            <p className="section-desc">{t.v113.desc}</p>
          </div>

          <div className="studios-columns">
            {t.v113.cards.map((card, idx) => (
              <div key={card.title} className="studio-group" data-reveal="" data-reveal-delay={String(idx)}>
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="bench-heading">
        <div className="container">
          <div className="bench-layout">
            <div data-reveal="">
              <h2 id="bench-heading" className="section-title">
                {t.bench.title}
              </h2>
              <p className="section-desc">{t.bench.desc}</p>
              <p className="bench-caption">{t.bench.caption}</p>
            </div>

            <div data-reveal="" data-reveal-delay="1">
              <table className="bench-table">
                <thead>
                  <tr>
                    <th scope="col">{t.bench.colMetric}</th>
                    <th scope="col">{t.bench.colValue}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.bench.rows.map(([metric, val]) => (
                    <tr key={metric}>
                      <td>{metric}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="agents-heading">
        <div className="container">
          <div className="section-head" data-reveal="">
            <h2 id="agents-heading" className="section-title">
              {t.agents.title}
            </h2>
            <p className="section-desc">{t.agents.desc}</p>
          </div>

          <div className="agent-table-wrap" data-reveal="" data-reveal-delay="1">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">{t.agents.colAgent}</th>
                  <th scope="col">{t.agents.colProtocol}</th>
                  <th scope="col">{t.agents.colNotes}</th>
                </tr>
              </thead>
              <tbody>
                {AGENT_MATRIX.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>
                      <span className="mono-tag">{row.transport}</span>
                    </td>
                    <td>{row.capabilities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="band band--surface" aria-labelledby="studios-heading">
        <div className="container">
          <div className="section-head" data-reveal="">
            <h2 id="studios-heading" className="section-title">
              {t.studios.title}
            </h2>
            <p className="section-desc">{t.studios.desc}</p>
          </div>

          <div className="studios-columns">
            {STUDIO_GROUPS.map((grp, idx) => (
              <div key={grp.title} className="studio-group" data-reveal="" data-reveal-delay={String(idx)}>
                <h3>{grp.title}</h3>
                <ul>
                  {grp.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="closing-heading">
        <div className="container closing-cta" data-reveal="">
          <div className="closing-cta-copy">
            <h2 id="closing-heading" className="section-title">
              {t.closing.title}
            </h2>
            <p className="section-desc">{t.closing.desc}</p>
          </div>
          <div className="closing-cta-actions">
            <Link to="/download" className="btn-primary">
              <DownloadIcon />
              <span>{t.closing.downloadBtn}</span>
            </Link>
            <Link to="/docs/getting-started" className="btn-secondary">
              <BookIcon />
              <span>{t.closing.docsBtn}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
