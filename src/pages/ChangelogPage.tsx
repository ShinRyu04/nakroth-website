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
              : 'Every shipped release change alongside the public v1.1 through v1.3 engineering roadmap.'}
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="container">
          <article className="release-entry" data-reveal="">
            <div>
              <div className="release-version">v1.0.1</div>
              <div className="release-date">2026-11-23</div>
            </div>
            <div className="release-body">
              <h3>Full 3-OS release, persistent Antigravity worker, and native OS pickers</h3>
              <ul>
                <li>Added PersistentAgyWorker for Google Antigravity (agy) using bidirectional stream-json, cutting follow-up turns from ~23.8s down to ~6.6s first token with warm prompt caching.</li>
                <li>Adopted non-blocking MCP startup (MCP_CONNECTION_NONBLOCKING=1), clean dual-auth env hygiene, and --allow-dangerously-skip-permissions for Claude Code persistent workers (Turn 2 in 5.85s).</li>
                <li>Replaced all 8 legacy PowerShell folder/file dialogs with native Win32 COM IFileOpenDialog (Windows 11 Explorer), macOS Finder osascript, and Linux zenity/kdialog.</li>
                <li>Fixed Studio UI Designer flex layout so COMPONENTS, Desktop 740 artboard, and Koma Inspector never overlap or clip, with richer dashboard starter components.</li>
                <li>Shipped full 3-OS packages: Windows (.exe, .zip), Linux (.deb, .rpm, .AppImage with vendor/xattr Linux ENODATA patch), macOS Apple Silicon (.dmg, .pkg), plus latest.json and one-line installers.</li>
              </ul>
            </div>
          </article>

          <article className="release-entry" data-reveal="" data-reveal-delay="1">
            <div>
              <div className="release-version">v1.0.0</div>
              <div className="release-date">2026-11-22</div>
            </div>
            <div className="release-body">
              <h3>Initial native Rust GPUI foundation</h3>
              <ul>
                <li>Pure native Rust GPUI workbench across 31 crates with four modes: Editor, Fleet, Chat, and Studio.</li>
                <li>Interactive ConPTY terminal with VS Code-style 100% height maximize, Remote VPS/SSH sidebar with Ctrl+S auto-upload, and LSP/DAP stdio JSON-RPC clients.</li>
                <li>Instant local slash commands (/status, /doctor, /cost, /context, /learn, /diff) backed by SQLite cross-session Memory Bank.</li>
                <li>22 lazy-loaded native Power Studios and Flux viewers (SQLite, Hex/PE/ELF/WASM, HTTP/GraphQL, Docker, .env Vault, SAST Auditor, FTS5 RAG, CyberChef).</li>
              </ul>
            </div>
          </article>

          <article className="release-entry" data-reveal="" data-reveal-delay="2">
            <div>
              <div className="release-version">v1.1 – v1.3</div>
              <div className="release-date">Planned roadmap</div>
            </div>
            <div className="release-body">
              <h3>Upcoming milestones</h3>
              <ul>
                <li><strong>v1.1:</strong> Real ISO QR scan-and-relay mobile PWA (LAN + Cloudflare HTTPS tunnel), inline LSP autocomplete/hover popups, interactive DAP breakpoint gutter, SSH ControlMaster multiplexing, persistent Codex/OpenCode/Gemini drivers, and in-app manifest auto-updater.</li>
                <li><strong>v1.2:</strong> Full 256/TrueColor ANSI TUI terminal grid, drag-and-drop image/file attachments, inline 3-way Git merge actions, WebView2 split live preview, live microphone STT, and per-surface glass material controls.</li>
                <li><strong>v1.3:</strong> Separated background daemon (nakrothd) for desktop + mobile continuity, full agy acp JSON-RPC driver with interactive approvals, and Fleet Coordinator MCP bridge.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
