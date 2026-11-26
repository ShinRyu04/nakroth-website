export interface DocSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: Array<{ lead: string; text: string }>;
  code?: { label: string; content: string };
  callout?: string;
}

export interface DocPage {
  slug: string;
  group: 'Start' | 'Core' | 'Workflows' | 'Reference';
  title: string;
  summary: string;
  sections: DocSection[];
}

export const DOC_GROUPS: Array<{ id: DocPage['group']; label: string }> = [
  { id: 'Start', label: 'Getting started' },
  { id: 'Core', label: 'Core concepts' },
  { id: 'Workflows', label: 'Workflows' },
  { id: 'Reference', label: 'Reference' },
];

export const DOC_PAGES: DocPage[] = [
  {
    slug: 'getting-started',
    group: 'Start',
    title: 'Getting Started',
    summary: 'Install Nakroth, open your first workspace, and connect your installed AI coding CLIs in under two minutes.',
    sections: [
      {
        id: 'requirements',
        heading: 'System requirements',
        paragraphs: [
          'Nakroth runs natively on the system GPU via GPUI without Electron or Node.js runtimes.',
        ],
        bullets: [
          { lead: 'Windows', text: 'Windows 10 or 11 (64-bit x64) with Direct3D 11 capable GPU.' },
          { lead: 'Linux', text: '64-bit x86_64 distro with Vulkan (libvulkan1), libxkbcommon0, and fontconfig.' },
          { lead: 'macOS', text: 'Apple Silicon (M1–M4) running macOS 13 Ventura or newer with Metal.' },
        ],
      },
      {
        id: 'first-launch',
        heading: 'First launch & workspace setup',
        paragraphs: [
          'Open Nakroth from your Start Menu, Applications folder, or launch any directory directly from your terminal with the bundled CLI shim.',
        ],
        code: {
          label: 'Terminal',
          content: `# Open current folder in Nakroth
nk .

# Or open a specific repository
nakroth D:\\Projects\\my-service`,
        },
      },
      {
        id: 'connect-agent',
        heading: 'Connecting your first AI agent',
        paragraphs: [
          'Nakroth automatically scans PATH and standard CLI install folders for Claude Code, Google Antigravity (agy), Codex, OpenCode, Gemini CLI, GitHub Copilot, Hermes, and Pi. Your existing subscriptions work as-is with zero middleware.',
          'Type /doctor in the AI composer to inspect every detected CLI binary, active MCP server, and loaded skill in under 10 milliseconds.',
        ],
      },
    ],
  },
  {
    slug: 'installation',
    group: 'Start',
    title: 'Installation & Verification',
    summary: 'Official installers, one-line terminal commands, and SHA-256 checksum verification for Windows, Linux, and macOS.',
    sections: [
      {
        id: 'windows-install',
        heading: 'Windows 10 / 11 (x64)',
        paragraphs: [
          'Run the PowerShell one-liner below (downloads the latest Inno Setup installer, verifies SHA-256 automatically, and launches setup), or download Nakroth-Setup-1.1.3-x64.exe from the Download Center.',
        ],
        code: {
          label: 'PowerShell',
          content: `irm https://github.com/ShinRyu04/Nakroth/releases/latest/download/install.ps1 | iex`,
        },
        bullets: [
          { lead: 'Per-user install', text: 'Installs cleanly without mandatory UAC elevation, with optional all-users mode.' },
          { lead: 'CLI & Explorer', text: 'Adds nakroth and nk to PATH and registers right-click "Open with Nakroth" on folders and files.' },
          { lead: 'Portable ZIP', text: 'Use Nakroth-Windows-x64-Portable.zip if you prefer zero registry or PATH changes.' },
        ],
      },
      {
        id: 'linux-install',
        heading: 'Linux (Ubuntu, Debian, Fedora, Universal)',
        paragraphs: [
          'Use the universal install script (auto-detects apt, dnf, or falls back to AppImage) or install the native package for your distribution.',
        ],
        code: {
          label: 'Shell',
          content: `# Automatic distro detection
curl -fsSL https://github.com/ShinRyu04/Nakroth/releases/latest/download/install.sh | sh

# Debian / Ubuntu / Mint / Pop!_OS
sudo apt install ./nakroth_1.1.3_amd64.deb

# Fedora / openSUSE / RHEL
sudo dnf install ./nakroth-1.1.3-1.x86_64.rpm

# Universal AppImage
chmod +x Nakroth-1.1.3-x86_64.AppImage
./Nakroth-1.1.3-x86_64.AppImage`,
        },
      },
      {
        id: 'macos-install',
        heading: 'macOS (Apple Silicon M1–M4)',
        paragraphs: [
          'Choose either the drag-to-Applications .dmg disk image or the .pkg installer wizard (which also links nakroth and nk into /usr/local/bin).',
        ],
        code: {
          label: 'Terminal (macOS)',
          content: `# Install via curl one-liner (.pkg)
curl -fsSL https://github.com/ShinRyu04/Nakroth/releases/latest/download/install.sh | sh

# If macOS Gatekeeper flags an unsigned build on first launch:
xattr -cr /Applications/Nakroth.app`,
        },
        callout: 'Unsigned open-distribution builds require running xattr -cr /Applications/Nakroth.app once (or right-click -> Open) on macOS.',
      },
      {
        id: 'verify-sha256',
        heading: 'Verifying SHA-256 checksums',
        paragraphs: [
          'Every release publishes a unified SHA256SUMS.txt covering all 7 packages.',
        ],
        code: {
          label: 'Checksum check',
          content: `# Windows PowerShell
Get-FileHash -Algorithm SHA256 .\\Nakroth-Setup-1.1.3-x64.exe

# Linux / macOS
sha256sum -c SHA256SUMS.txt --ignore-missing`,
        },
      },
    ],
  },
  {
    slug: 'modes',
    group: 'Core',
    title: 'Five Modes (Editor, Fleet, Chat, Studio, Creator)',
    summary: 'How Nakroth organizes code editing, parallel agent orchestration, fullscreen conversation, visual design, and 16 AI creator labs into one fast surface.',
    sections: [
      {
        id: 'editor-mode',
        heading: 'Editor Mode (Ctrl+1)',
        paragraphs: [
          'Your primary daily-driver coding view: virtualized Explorer, multi-tab split editor with Tree-sitter highlighting for 24+ languages, GPU minimap, sticky scroll headers, inline Git hunk review, bottom ConPTY terminal (with VS Code-style 100% maximize), and docked AI cockpit on the right.',
        ],
      },
      {
        id: 'fleet-mode',
        heading: 'Fleet Mode (Ctrl+2)',
        paragraphs: [
          'Built for running multiple coding agents simultaneously without file collisions. Appoint a Captain thread, spawn isolated Git worktree workers, monitor live +added/-removed diff counters, inspect Hub / Fan / Tree / Card formation topology, and adopt completed branches back into main.',
        ],
      },
      {
        id: 'chat-mode',
        heading: 'Chat Mode (Ctrl+3)',
        paragraphs: [
          'Distraction-free fullscreen AI workspace with date-grouped history, live synced past sessions from disk (Claude Code, Codex, Antigravity), and a floating side drawer showing open workspace files.',
        ],
      },
      {
        id: 'studio-mode',
        heading: 'Studio Mode (Ctrl+4)',
        paragraphs: [
          'Three visual engineering canvases built straight into GPUI:',
        ],
        bullets: [
          { lead: 'UI Designer (.kdsgn)', text: 'Drag 15 component types onto Desktop/Tablet/Mobile artboards, tune props in Koma Inspector, and export deterministic Rust GPUI, React+Tailwind, Vue, or HTML.' },
          { lead: 'Flowchart / Mermaid', text: 'Draw architecture flows with Bezier/Orthogonal connectors and sync two-way with Mermaid code or send directly to AI chat.' },
          { lead: 'Import Graph', text: 'Visualize project module/crate dependencies, compute upstream/downstream blast radius, and detect circular dependencies via Tarjan SCC.' },
        ],
      },
      {
        id: 'creator-mode',
        heading: 'Creator Mode (Ctrl+5)',
        paragraphs: [
          '16 interactive pure-Rust and AI-powered creative labs (Full Identity Pack, Theme Forge, Icon & Pack Lab, Brand & Logo Kit, Palette & Tokens, CSS Visual Lab, UI Screen → Studio, Diagram & Flow, Quick Starter, API & Schema Forge, Mock Data & Regex, README & Docs, Git PR & Release, Skill & Rule Forge, Fleet Blueprint, and Vault) — automatically adapting to your active theme, enabled AI agents, and separated OpenCode vs BYOK API providers.',
        ],
      },
    ],
  },
  {
    slug: 'agents',
    group: 'Core',
    title: 'AI Agents & Persistent Workers',
    summary: 'How Nakroth eliminates per-turn cold boots for Claude Code and Google Antigravity while supporting Codex, OpenCode, Gemini, and BYOM.',
    sections: [
      {
        id: 'persistent-claude',
        heading: 'Claude Code persistent stream-json worker',
        paragraphs: [
          'Instead of spawning a fresh claude process on every prompt, Nakroth keeps a bidirectional stream-json worker alive per thread with MCP_CONNECTION_NONBLOCKING=1 and clean auth hygiene (preventing dual ANTHROPIC_AUTH_TOKEN + ANTHROPIC_API_KEY conflicts).',
          'Thinking tokens are never forced on Default or Low effort, and --allow-dangerously-skip-permissions is passed cleanly when Bypass Permissions mode is explicitly enabled.',
        ],
      },
      {
        id: 'persistent-agy',
        heading: 'Google Antigravity (agy) persistent worker',
        paragraphs: [
          'Nakroth drives agy via --print= --input-format stream-json --output-format stream-json with normalized model IDs (e.g., gemini-4-neon-low, gemini-3.8-flash-low), explicit --effort, and --mode/--dangerously-skip-permissions mapping.',
          'Keeping the agy process warm skips the ~20-second startup cost on follow-up turns and preserves prompt caching across turns.',
        ],
      },
      {
        id: 'other-providers',
        heading: 'Connection per Agent, 1-Click CLI Login & Separate BYOK API',
        paragraphs: [
          'Open Settings › Connections to sign in directly to any active CLI agent inside Nakroth\'s ConPTY terminal (Login via agy, claude, opencode, omp, codex, gemini, pi, gh) or bind a saved BYOK API connection per agent.',
          'OpenCode and BYOK Direct API (Anthropic, OpenAI, Gemini, DeepSeek, Z.ai, OpenRouter, Ollama) are strictly separated so models never mix across engines.',
        ],
      },
    ],
  },
  {
    slug: 'computer-use',
    group: 'Core',
    title: 'Computer Use Bridge & Windows Shell',
    summary: '14 native Win32 automation tools with 7 granular permissions, Esc kill switch, and <2 ms pure-Rust Windows Explorer integration.',
    sections: [
      {
        id: 'cu-bridge',
        heading: 'Universal AI ↔ Computer Use Bridge',
        paragraphs: [
          'When enabled in Settings › Computer Use or from the Status Bar pill, Nakroth exposes a token-authenticated loopback HTTP bridge (127.0.0.1) and injects NAKROTH_COMPUTER_USE_URL + NAKROTH_COMPUTER_USE_TOKEN into every active CLI worker, Multi-Agent Fleet lane, and BYOK session.',
        ],
        bullets: [
          { lead: '7 Granular Permissions', text: 'Toggle Screen Capture, Mouse, Keyboard, Windows, App Launcher, Clipboard, and Process Listing independently.' },
          { lead: 'Safety Guardrails', text: 'Full Auto, Guarded, and Read-Only modes, Blocked/Protected Apps list (e.g. password managers, Task Manager), live Audit Log, and instant Esc kill switch.' },
          { lead: 'Persisted State', text: 'Master ON/OFF consent and all safety rules persist automatically across restarts.' },
        ],
      },
      {
        id: 'win-shell',
        heading: 'Native Windows Explorer Integration (<2 ms)',
        paragraphs: [
          'In Settings › General, toggle "Open with Nakroth" right-click menus, safe "Open With" registration across 45+ code file extensions (without hijacking your existing default icons), optional Default Code Editor handler, and Safe 1-Click Restore — all via pure-Rust advapi32.dll Registry FFI with zero UAC prompts.',
        ],
      },
    ],
  },
  {
    slug: 'mobile-companion',
    group: 'Core',
    title: 'Mobile Companion & Custom VPS Relay',
    summary: 'Control your desktop Nakroth AI agents, terminal, and tool approvals from your phone via ISO QR pairing or Custom VPS Relay.',
    sections: [
      {
        id: 'mobile-qr',
        heading: '10-Screen OLED Mobile Cockpit',
        paragraphs: [
          'Open Settings › Phone Connection to start the native relay and scan the ISO QR code from your phone. All prompts, approvals, terminal sessions, and diff reviews run directly through your desktop Nakroth instance — zero API keys or logins required on your phone.',
        ],
      },
      {
        id: 'vps-relay',
        heading: 'Cross-Network 4G / 5G via Custom VPS Relay',
        paragraphs: [
          'When away from home Wi-Fi, enable the built-in SSH Reverse Tunnel (-R) to your own VPS or reverse proxy domain (Nginx / Caddy / Tailscale) — the pairing QR updates automatically.',
        ],
      },
    ],
  },
  {
    slug: 'slash-commands',
    group: 'Core',
    title: 'Instant Slash Commands & Memory Bank',
    summary: 'Local commands that execute in under 10 ms at zero token cost, smart typo detection, and cross-session SQLite /learn rules.',
    sections: [
      {
        id: 'builtin-commands',
        heading: 'Instant local commands (< 10 ms)',
        paragraphs: [
          'Slash commands run natively inside Nakroth without burning LLM tokens or waiting for a network round-trip.',
        ],
        bullets: [
          { lead: '/status', text: 'Live snapshot of active provider, model, effort, Git branch, modified files, tokens, and session duration.' },
          { lead: '/doctor', text: 'Diagnostics for all installed CLI connectors, MCP servers, LSP servers, and loaded skills.' },
          { lead: '/cost & /context', text: 'Token usage breakdown, cache read ratio, and active context window occupancy.' },
          { lead: '/learn <rule>', text: 'Persists a project rule or coding convention into the SQLite Memory Bank and auto-injects it into future turns.' },
          { lead: '/memory', text: 'Lists stored cross-session rules from the Memory Bank.' },
          { lead: '/diff & /review', text: 'Opens inline diff review or summarizes dirty Git changes immediately.' },
          { lead: '/compact & /clear', text: 'Compacts conversation history or resets the thread and restarts the worker cleanly.' },
        ],
      },
      {
        id: 'typo-guard',
        heading: 'Zero-latency typo guard',
        paragraphs: [
          'Typing a mistyped command such as /st or /stat is caught locally in 0 ms with exact suggestions instead of accidentally sending a junk prompt to your AI model.',
        ],
      },
    ],
  },
  {
    slug: 'remote-vps',
    group: 'Workflows',
    title: 'Remote VPS / SSH & WSL2',
    summary: 'Connect to remote Linux servers directly from the Left Rail, edit remote files with automatic Ctrl+S upload, and open interactive SSH shells.',
    sections: [
      {
        id: 'ssh-sidebar',
        heading: 'Connecting to a VPS',
        paragraphs: [
          'Click the Remote VPS / SSH icon in the Left Rail to view hosts parsed from ~/.ssh/config or add a new VPS profile directly via "+ Add VPS" or Quick URI (user@host:port).',
        ],
        code: {
          label: '~/.ssh/config example',
          content: `Host prod-api
  HostName 203.0.113.10
  User deploy
  IdentityFile ~/.ssh/id_ed25519`,
        },
      },
      {
        id: 'remote-edit',
        heading: 'Remote file editing & Ctrl+S auto-upload',
        paragraphs: [
          'Clicking any file in the Remote Explorer downloads it into a tracked editor buffer. Every Ctrl+S saves locally and uploads the updated file back to the remote host over SSH automatically.',
          'Click "SSH Shell" on any host to open a real interactive ConPTY SSH terminal session inside the bottom dock.',
        ],
      },
    ],
  },
  {
    slug: 'power-studios',
    group: 'Workflows',
    title: '22 Built-in Power Studios & Flux Viewers',
    summary: 'Open databases, binaries, HTTP collections, Docker containers, security audits, and local RAG indexes inside native GPUI tabs.',
    sections: [
      {
        id: 'opening-studios',
        heading: 'Launching any studio',
        paragraphs: [
          'Press Ctrl+Shift+P to open the Omni-Command Palette (145+ registered commands) and type the name of any studio, or double-click a matching file (.sqlite, .csv, .http, .ipynb, .zip, .exe, .wasm) directly in the Explorer.',
        ],
        bullets: [
          { lead: 'Data & Files', text: 'SQLite Studio (with interactive SQL query bar), CSV/Parquet Grid, Hex/PE/ELF/WASM inspector (with hex/ASCII search), ZIP preview, FluxDoc, Jupyter Notebook.' },
          { lead: 'Backend & Infra', text: 'HTTP/GraphQL/cURL Studio, OpenAPI Explorer + loopback mock server, Docker Cockpit, Port & Tunnel Manager, .env Vault & pre-commit leak guard.' },
          { lead: 'Security & Code Intel', text: 'SAST Security Auditor + CVSS 3.1 triage, Dependency/License Auditor, CyberChef/JWT/Regex Lab, Local SQLite FTS5 Hybrid RAG, Structural AST Search & Replace.' },
        ],
      },
    ],
  },
  {
    slug: 'shortcuts',
    group: 'Reference',
    title: 'Keyboard Shortcuts & Vim Mode',
    summary: 'Core navigation bindings across all five workspaces plus optional native Vim modal editing.',
    sections: [
      {
        id: 'core-bindings',
        heading: 'Workspace & navigation',
        paragraphs: [
          'All major surfaces and docks are reachable from the keyboard.',
        ],
        code: {
          label: 'Keybindings',
          content: `Ctrl+1 / 2 / 3 / 4 / 5  Switch Editor / Fleet / Chat / Studio / Creator mode
Ctrl+Shift+P            Open Omni-Command Palette (145+ actions)
Ctrl+P                  Fuzzy Quick Open file
Ctrl+O                  Open Folder (native OS dialog)
Ctrl+S                  Save file (auto-uploads if Remote VPS file)
Ctrl+B                  Toggle Left Sidebar
Ctrl+\`                  Toggle Bottom Terminal Panel
Ctrl+L                  Toggle Right AI Cockpit
Ctrl+Shift+F            Global Ripgrep Search & Replace
Esc                     Interrupt active AI turn / Computer Use Kill Switch`,
        },
      },
      {
        id: 'vim-modal',
        heading: 'Native Vim modal editing',
        paragraphs: [
          'Toggle Vim mode from the Command Palette or Status Bar pill. Supports Normal, Insert, and Visual modes along with standard motions, dd/yy line operators, and macro recording.',
        ],
      },
    ],
  },
  {
    slug: 'troubleshooting',
    group: 'Reference',
    title: 'Troubleshooting',
    summary: 'Quick fixes for OS security prompts, CLI detection, Linux graphics libraries, and dual-auth environment variables.',
    sections: [
      {
        id: 'cli-not-found',
        heading: 'CLI agent not detected',
        paragraphs: [
          'If you installed claude, agy, or codex while Nakroth was already open, run /doctor to inspect detected paths or restart Nakroth so the cached CLI path resolver refreshes.',
        ],
      },
      {
        id: 'linux-vulkan',
        heading: 'Linux Vulkan / Wayland runtime dependencies',
        paragraphs: [
          'On minimal Linux installs or tiling window managers, ensure Vulkan loader and XKB runtime libraries are present:',
        ],
        code: {
          label: 'Ubuntu / Debian',
          content: `sudo apt install libvulkan1 libxkbcommon0 libfontconfig1 zenity`,
        },
      },
      {
        id: 'macos-gatekeeper',
        heading: 'macOS "App is damaged" or unverified developer prompt',
        paragraphs: [
          'Public v1.1.3 macOS builds are ad-hoc signed rather than notarized with a paid Apple Developer ID. Clear the quarantine flag once after moving Nakroth.app into /Applications:',
        ],
        code: {
          label: 'macOS Terminal',
          content: `xattr -cr /Applications/Nakroth.app`,
        },
      },
    ],
  },
];
