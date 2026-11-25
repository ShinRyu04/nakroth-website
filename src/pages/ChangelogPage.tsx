import type { Locale } from '../data/i18n';

interface ChangelogPageProps {
  locale: Locale;
}

export function ChangelogPage({ locale }: ChangelogPageProps) {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="section-title">
            {locale === 'id' ? 'Changelog & Roadmap' : 'Changelog & Roadmap'}
          </h1>
          <p className="section-desc">
            {locale === 'id'
              ? 'Catatan rilis nyata yang sudah terpasang di binary, beserta rencana kerja versi berikutnya.'
              : 'Every shipped release change alongside the upcoming engineering roadmap.'}
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="container">
          <article className="release-entry" data-reveal="">
            <div>
              <div className="release-version">v1.1.2</div>
              <div className="release-date">2026-11-25</div>
            </div>
            <div className="release-body">
              <h3>10-Screen OLED Mobile PWA, Custom VPS Relay, Silent Pre-Warm &amp; Pro VT100 Terminal</h3>
              <ul>
                <li>Embedded 10-screen OLED Mobile PWA paired via real ISO QR code — zero API key entry on phone, live prompt execution, and Custom VPS Relay (SSH -R &amp; custom HTTPS domain).</li>
                <li>Silent background pre-warm for Claude Code, Oh My Pi (omp), and Antigravity (agy) with idle auto-stop, OMP --no-title + ready handshake, and synced OMP past sessions.</li>
                <li>Pro VT100 Terminal with exact monospace cell metrics, Block/Bar/Underline cursors, dim/italic/underline ANSI styling, Bracketed Paste, and VT100/Kitty query auto-responder.</li>
                <li>Standalone full-page Extensions &amp; Usage views outside Editor, colored CLI brand logos in Threads, clamped Explorer scroll, and backdrop hairline polish.</li>
              </ul>
            </div>
          </article>

          <article className="release-entry" data-reveal="" data-reveal-delay="1">
            <div>
              <div className="release-version">v1.1.1</div>
              <div className="release-date">2026-11-24</div>
            </div>
            <div className="release-body">
              <h3>Unified 2-Pane Model Matrix, Prompt Queue Steering &amp; Release Ledger</h3>
              <ul>
                <li>Full-width monospace VT100 terminal with split PTY, CLI quick-launch bar, and configurable scrollback.</li>
                <li>Unified 2-Pane Model Matrix with BYOK connections, Prompt Queue + Run Now steering, and interactive stdio Allow / Deny tool approvals.</li>
                <li>Zero-layout GPU canvas backdrop particles, lazy mascot atlas decoding, adaptive ticker, and Win32 CapsLock indicator fix.</li>
                <li>Topbar Update pill, floating update notification, and in-app Release Ledger.</li>
              </ul>
            </div>
          </article>

          <article className="release-entry" data-reveal="" data-reveal-delay="2">
            <div>
              <div className="release-version">v1.1.0</div>
              <div className="release-date">2026-11-23</div>
            </div>
            <div className="release-body">
              <h3>Multi-CLI Model Discovery, Auto-Updater &amp; Hot Exit</h3>
              <ul>
                <li>Auto-discovered models across OMP, OpenCode, Ollama, and Antigravity into one grouped provider matrix.</li>
                <li>Added SHA-256 manifest auto-updater, single-instance IPC file open (nk file:line:col, --diff), Hot Exit restore, and graceful child process cleanup.</li>
              </ul>
            </div>
          </article>

          <article className="release-entry" data-reveal="" data-reveal-delay="3">
            <div>
              <div className="release-version">v1.0.1</div>
              <div className="release-date">2026-11-23</div>
            </div>
            <div className="release-body">
              <h3>Full 3-OS release, persistent Antigravity worker, and native OS pickers</h3>
              <ul>
                <li>Added PersistentAgyWorker using bidirectional stream-json, cutting follow-up turns down to ~6.6s first token with warm prompt caching.</li>
                <li>Replaced legacy folder/file dialogs with native Win32 COM IFileOpenDialog, macOS Finder osascript, and Linux zenity/kdialog.</li>
                <li>Shipped full 3-OS packages: Windows (.exe, .zip), Linux (.deb, .rpm, .AppImage), macOS Apple Silicon (.dmg, .pkg), plus latest.json and one-line installers.</li>
              </ul>
            </div>
          </article>

          <article className="release-entry" data-reveal="" data-reveal-delay="4">
            <div>
              <div className="release-version">v1.0.0</div>
              <div className="release-date">2026-11-22</div>
            </div>
            <div className="release-body">
              <h3>Initial native Rust GPUI foundation</h3>
              <ul>
                <li>Pure native Rust GPUI workbench across 31 crates with four modes: Editor, Fleet, Chat, and Studio.</li>
                <li>Interactive ConPTY terminal, Remote VPS/SSH sidebar with Ctrl+S auto-upload, LSP/DAP stdio JSON-RPC clients, and 22 lazy-loaded native Power Studios.</li>
              </ul>
            </div>
          </article>

          <article className="release-entry" data-reveal="" data-reveal-delay="5">
            <div>
              <div className="release-version">v1.1.3</div>
              <div className="release-date">In active testing</div>
            </div>
            <div className="release-body">
              <h3>Upcoming release highlights</h3>
              <ul>
                <li><strong>Original Multi-Agent Session Lanes:</strong> true per-session isolated CLI workers (1–4 split lanes, zero chat mixing), live File-Collision Radar, and 1-click Context Hand-off alongside Fleet Classic.</li>
                <li><strong>Creative Studio Pro:</strong> Pure-Rust GPUI Vector Art (8-pt resize, Pen Bezier, Boolean ops, SVG), Multi-Layer Raster (layer masks, Flip/Rotate, Text, PNG), 3D Viewport &amp; UV Paint (3D Gizmo, Subdivide/Extrude, .obj/.gltf/Blender bridge), and Procedural Material Nodes (.wgsl/.glsl).</li>
                <li><strong>VS Code-Grade Terminal &amp; Scroll Precision:</strong> character-level drag selection, multi-tab shell sidebar, proportional scrollbar, SGR 1006 TUI mouse forwarding, and viewport-exact scroll clamping across Editor &amp; all panels.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
