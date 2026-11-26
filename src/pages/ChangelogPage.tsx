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
              <div className="release-version">v1.1.3</div>
              <div className="release-date">2026-11-26</div>
            </div>
            <div className="release-body">
              <h3>Creator Mode (16 Labs), Universal Computer Use Bridge, Multi-Agent Login &amp; Full EN/ID/ZH i18n</h3>
              <ul>
                <li><strong>Top-Level Creator Mode (Ctrl+5):</strong> 16 pure-Rust interactive labs (Full Identity Pack, Theme Forge, Icon &amp; Pack Lab, Brand &amp; Logo Kit, Palette &amp; Tokens, CSS Visual Lab, UI Screen → Studio, Diagram &amp; Flow, Quick Starter, API &amp; Schema Forge, Mock Data &amp; Regex, README &amp; Docs, Git PR &amp; Release, Skill &amp; Rule Forge, Fleet Blueprint, Vault) — theme-synced with auto-contrast, active-agent filtering, and dedicated OpenCode vs BYOK API separation.</li>
                <li><strong>Universal AI ↔ Computer Use Bridge:</strong> 14 native Win32 desktop tools, 7 granular permissions, blocked-apps guard, Esc kill switch, persisted ON/OFF consent, and a secure local loopback HTTP bridge automatically wired to every AI agent.</li>
                <li><strong>Connection per Agent &amp; 1-Click CLI Login:</strong> dynamic per-agent connection bindings and interactive terminal sign-in (Login via agy, claude, opencode, omp, codex, gemini, pi, gh) directly inside Settings › Connections.</li>
                <li><strong>Full EN / ID / 中文 (Mandarin) Localization:</strong> 100% translated interface across Editor, Fleet, Chat, Studio, Creator, Sidebar, Panels, Analytics, Extensions, and Settings.</li>
                <li><strong>Native Windows Explorer Shell Integration &amp; Instant Extensions:</strong> &lt;2 ms pure-Rust Win32 Registry FFI (Open with Nakroth, safe Open With for 45+ code extensions, optional default handler &amp; safe Restore), 2-stage instant Extension README loading with 20-entry cache, theme-adaptive Studio Mode, and Multi-Agent Session Lanes alongside Fleet Classic.</li>
              </ul>
            </div>
          </article>

          <article className="release-entry" data-reveal="" data-reveal-delay="1">
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
              <div className="release-version">v1.1.4</div>
              <div className="release-date">Upcoming roadmap</div>
            </div>
            <div className="release-body">
              <h3>Next engineering focus</h3>
              <ul>
                <li><strong>Signed Release Distribution:</strong> Apple Developer notarized macOS builds and Authenticode signed Windows installers.</li>
                <li><strong>Expanded Studio &amp; Plugin Ecosystem:</strong> deeper VS Code WebView2 extension API coverage, live collaborative multi-cursor canvas editing, and GPU shader preview nodes.</li>
                <li><strong>Cross-OS Computer Use Parity:</strong> macOS Accessibility &amp; Linux X11/Wayland native backends for the Universal Computer Use Bridge.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
