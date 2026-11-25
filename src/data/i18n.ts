export type Locale = 'en' | 'id';

export const UI_COPY = {
  en: {
    nav: {
      docs: 'Docs',
      download: 'Download',
      changelog: 'Changelog',
      github: 'GitHub',
    },
    hero: {
      title: 'The native Rust IDE for AI agents.',
      lead: 'One 30 MB GPUI workspace uniting code editing, Fleet worktrees, persistent agent workers, and 22 native studios.',
      downloadFor: {
        windows: 'Download for Windows',
        linux: 'Download for Linux',
        macos: 'Download for macOS',
      },
      readDocs: 'Read documentation',
      allPlatforms: 'All 7 installers',
      copy: 'Copy',
      copied: 'Copied',
    },
    modes: {
      title: 'Four workspaces inside one executable',
      desc: 'Switch directly between code, parallel agent fleets, fullscreen chat, and visual architecture without spawning separate browser windows.',
      items: [
        {
          id: 'editor',
          label: 'Editor',
          shortcut: 'Ctrl+1',
          image: '/media/editor.png',
          alt: 'Nakroth Editor mode showing code, GPU minimap, integrated ConPTY terminal, and docked AI panel',
          heading: '120 FPS code editor with a live AI cockpit',
          body: 'Hardware-accelerated Direct3D 11, Vulkan, and Metal rendering with Tree-sitter highlighting across 24+ languages, inline Git hunk review, and a real ConPTY terminal.',
          points: [
            ['Persistent CLI workers', 'Claude Code and Antigravity stay warm over bidirectional stream-json'],
            ['Remote VPS over SSH', 'Browse remote servers and auto-upload on Ctrl+S without leaving the editor'],
            ['LSP & DAP stdio clients', 'Diagnostics, symbols, and debugging wired directly into workspace panels'],
          ],
        },
        {
          id: 'fleet',
          label: 'Fleet',
          shortcut: 'Ctrl+2',
          image: '/media/fleet.png',
          alt: 'Nakroth Fleet mode showing Captain orchestration and Hub formation graph',
          heading: 'Parallel agent runs across isolated Git worktrees',
          body: 'Coordinate multiple coding CLIs at once from a Captain seat while every worker operates on its own branch with live diff counters and auditable logs.',
          points: [
            ['Formation topology', 'Switch between Hub, Fan, Tree, and Card views to track running branches'],
            ['Worktree isolation', 'Adopt or merge worker branches without dirtying your main working tree'],
            ['Real process control', 'Interrupt any worker cleanly or inspect live stdout lines on demand'],
          ],
        },
        {
          id: 'chat',
          label: 'Chat',
          shortcut: 'Ctrl+3',
          image: '/media/chat.png',
          alt: 'Nakroth Chat mode fullscreen AI workspace with thread history and open workspace files',
          heading: 'Fullscreen conversation backed by cross-session memory',
          body: 'Step out of file trees when planning or debugging. Synced past sessions from Claude Code, Codex, and Antigravity appear beside your active workspace files.',
          points: [
            ['Instant local slash commands', '/status, /doctor, /cost, /context, and /learn execute locally in under 10 ms'],
            ['SQLite Memory Bank', 'Project rules saved with /learn auto-inject into future sessions'],
            ['Shared thread continuity', 'Keep Editor and Chat threads separate or jump between them at will'],
          ],
        },
        {
          id: 'studio',
          label: 'Studio',
          shortcut: 'Ctrl+4',
          image: '/media/studio.png',
          alt: 'Nakroth Studio mode showing Visual UI Designer artboard and Koma Inspector',
          heading: 'Visual UI designer, Mermaid diagrams, and import graphs',
          body: 'Sketch layouts, inspect crate dependency cycles, and compile visual components directly into deterministic Rust GPUI, React Tailwind, Vue, or HTML code.',
          points: [
            ['Two-way AI bridge', 'Send designs to your agent or open AI-generated Mermaid and UI blocks in Studio'],
            ['Koma Inspector', 'Adjust dimensions, radius, typography, and viewports with 8px snap alignment'],
            ['Tarjan cycle detection', 'Inspect workspace crate graphs and highlight upstream/downstream blast radius'],
          ],
        },
      ],
    },
    bench: {
      title: 'Measured footprint, not marketing numbers',
      desc: 'Recorded on Windows 11 x64 using the v1.1.2 release build. No Electron runtime, no background Chromium tabs, and no cold-boot wait on follow-up agent turns.',
      colMetric: 'Measurement',
      colValue: 'Nakroth v1.1.2',
      rows: [
        ['Baseline smoke RAM (--smoke-boot)', '2.6 MB'],
        ['Active IDE working set (Editor + Pro Terminal + AI)', '~61 MB'],
        ['Frame pacing target (D3D11 / Vulkan / Metal)', '120 FPS'],
        ['Windows setup installer (includes CLI & remote server)', '30.51 MB'],
        ['Local slash commands (/status, /doctor, /cost)', '< 10 ms'],
        ['Persistent Claude Code Turn 2 (MCP non-blocking)', '5.85 s'],
        ['Persistent Antigravity (agy) Turn 2 first token', '6.61 s'],
      ],
      caption: 'Persistent workers eliminate the ~20 second cold boot incurred when spawning a fresh CLI process on every turn.',
    },
    agents: {
      title: 'Bring the coding CLIs you already run',
      desc: 'Nakroth connects directly to installed agent binaries on PATH using their native streaming protocols, plus direct HTTP/SSE for BYOM and local Ollama.',
      colAgent: 'Agent / Provider',
      colProtocol: 'Transport',
      colNotes: 'Capabilities',
    },
    studios: {
      title: '22 native viewers and studios, loaded lazily',
      desc: 'Every viewer opens as a regular GPUI tab and holds 0 MB of memory until you actually open it.',
    },
    closing: {
      title: 'Start shipping without the browser weight.',
      desc: 'Available now for Windows x64, Linux (.deb, .rpm, .AppImage), and macOS Apple Silicon (.dmg, .pkg).',
      downloadBtn: 'Open Download Center',
      docsBtn: 'Getting Started Guide',
    },
    footer: {
      copyright: 'Nakroth by ShinRyu04. All rights reserved.',
    },
  },
  id: {
    nav: {
      docs: 'Dokumentasi',
      download: 'Unduh',
      changelog: 'Changelog',
      github: 'GitHub',
    },
    hero: {
      title: 'IDE Rust native untuk agen AI.',
      lead: 'Satu aplikasi GPUI 30 MB yang menyatukan editor kode, Fleet worktree, worker AI persisten, dan 22 studio native.',
      downloadFor: {
        windows: 'Unduh untuk Windows',
        linux: 'Unduh untuk Linux',
        macos: 'Unduh untuk macOS',
      },
      readDocs: 'Baca dokumentasi',
      allPlatforms: 'Semua 7 installer',
      copy: 'Salin',
      copied: 'Tersalin',
    },
    modes: {
      title: 'Empat workspace dalam satu binary',
      desc: 'Pindah cepat antara editor kode, orkestrasi agen paralel, chat fullscreen, dan perancangan visual tanpa membuka jendela browser tambahan.',
      items: [
        {
          id: 'editor',
          label: 'Editor',
          shortcut: 'Ctrl+1',
          image: '/media/editor.png',
          alt: 'Mode Editor Nakroth menampilkan kode, GPU minimap, terminal ConPTY, dan panel AI',
          heading: 'Editor kode 120 FPS dengan kokpit AI aktif',
          body: 'Rendering native Direct3D 11, Vulkan, dan Metal dengan syntax highlighting Tree-sitter 24+ bahasa, review diff Git inline, dan terminal ConPTY interaktif.',
          points: [
            ['Worker CLI persisten', 'Claude Code dan Antigravity tetap hangat lewat stream-json dua arah'],
            ['Remote VPS via SSH', 'Jelajahi server remote dan auto-upload saat Ctrl+S langsung dari editor'],
            ['Client LSP & DAP stdio', 'Diagnostik, simbol, dan debugging terhubung langsung ke panel kerja'],
          ],
        },
        {
          id: 'fleet',
          label: 'Fleet',
          shortcut: 'Ctrl+2',
          image: '/media/fleet.png',
          alt: 'Mode Fleet Nakroth menampilkan kursi Captain dan grafik formasi Hub',
          heading: 'Jalankan beberapa agen paralel di Git worktree terpisah',
          body: 'Koordinasikan banyak CLI agen sekaligus dari kursi Captain sementara tiap worker bekerja di branch sendiri lengkap dengan penghitung diff live.',
          points: [
            ['Topologi formasi', 'Beralih antara tampilan Hub, Fan, Tree, dan Card untuk memantau branch aktif'],
            ['Isolasi worktree', 'Adopsi atau gabungkan branch worker tanpa mengotori working tree utama'],
            ['Kontrol proses langsung', 'Hentikan worker kapan saja atau pantau output baris demi baris'],
          ],
        },
        {
          id: 'chat',
          label: 'Chat',
          shortcut: 'Ctrl+3',
          image: '/media/chat.png',
          alt: 'Mode Chat Nakroth layar penuh dengan riwayat sesi dan daftar file workspace',
          heading: 'Ruang diskusi layar penuh dengan memori lintas sesi',
          body: 'Fokus merancang arsitektur atau debugging tanpa distraksi tree file. Riwayat sesi Claude Code, Codex, dan Antigravity otomatis tampil berdampingan dengan file aktif.',
          points: [
            ['Slash command lokal instan', '/status, /doctor, /cost, /context, dan /learn berjalan lokal di bawah 10 ms'],
            ['Memory Bank SQLite', 'Aturan proyek dari /learn otomatis disuntikkan ke sesi berikutnya'],
            ['Kontinuitas thread', 'Pisahkan thread Editor dan Chat atau pindah antar keduanya kapan saja'],
          ],
        },
        {
          id: 'studio',
          label: 'Studio',
          shortcut: 'Ctrl+4',
          image: '/media/studio.png',
          alt: 'Mode Studio Nakroth menampilkan Visual UI Designer dan Koma Inspector',
          heading: 'Desainer UI visual, diagram Mermaid, dan grafik impor',
          body: 'Susun antarmuka, lacak dependensi siklik, dan kompilasi komponen visual langsung menjadi kode deterministik Rust GPUI, React Tailwind, Vue, atau HTML.',
          points: [
            ['Jembatan AI dua arah', 'Kirim desain ke agen atau buka blok Mermaid dan UI dari respons AI'],
            ['Koma Inspector', 'Atur dimensi, radius, tipografi, dan viewport dengan snap grid 8px'],
            ['Deteksi siklus Tarjan', 'Petakan grafik impor proyek beserta dampak upstream dan downstream'],
          ],
        },
      ],
    },
    bench: {
      title: 'Angka terukur, bukan klaim brosur',
      desc: 'Diukur langsung di Windows 11 x64 menggunakan build rilis v1.1.2. Tanpa runtime Electron, tanpa proses Chromium berlapis, dan bebas cold-boot di giliran lanjutan.',
      colMetric: 'Pengukuran',
      colValue: 'Nakroth v1.1.2',
      rows: [
        ['RAM dasar (--smoke-boot)', '2.6 MB'],
        ['RAM aktif IDE (Editor + Pro Terminal + AI)', '~61 MB'],
        ['Target frame rate (D3D11 / Vulkan / Metal)', '120 FPS'],
        ['Ukuran installer Windows (termasuk CLI & remote server)', '30.51 MB'],
        ['Slash command lokal (/status, /doctor, /cost)', '< 10 ms'],
        ['Claude Code persisten Turn 2 (MCP non-blocking)', '5.85 s'],
        ['Antigravity (agy) persisten Turn 2 token pertama', '6.61 s'],
      ],
      caption: 'Worker persisten memangkas cold-boot ~20 detik yang terjadi jika CLI dijalankan ulang di setiap prompt.',
    },
    agents: {
      title: 'Pakai CLI agen yang sudah Anda miliki',
      desc: 'Nakroth terhubung langsung ke binary agen di PATH memakai protokol streaming native, ditambah HTTP/SSE langsung untuk BYOM dan Ollama lokal.',
      colAgent: 'Agen / Provider',
      colProtocol: 'Protokol',
      colNotes: 'Kemampuan',
    },
    studios: {
      title: '22 viewer dan studio bawaan, dimuat saat dibuka',
      desc: 'Setiap studio terbuka sebagai tab GPUI biasa dan memakai 0 MB RAM selama belum dibuka.',
    },
    closing: {
      title: 'Mulai ngoding tanpa beban browser.',
      desc: 'Tersedia sekarang untuk Windows x64, Linux (.deb, .rpm, .AppImage), dan macOS Apple Silicon (.dmg, .pkg).',
      downloadBtn: 'Buka Halaman Unduh',
      docsBtn: 'Panduan Memulai',
    },
    footer: {
      copyright: 'Nakroth oleh ShinRyu04. Hak cipta dilindungi.',
    },
  },
} as const;

export const AGENT_MATRIX = [
  {
    name: 'Claude Code (claude)',
    transport: 'Persistent stream-json',
    capabilities: 'Zero follow-up cold boot, MCP_CONNECTION_NONBLOCKING=1, thinking deltas, tool cards, token meter',
  },
  {
    name: 'Google Antigravity (agy)',
    transport: 'Persistent stream-json',
    capabilities: 'Warm prompt cache across turns, normalized model & effort flags, live step streaming',
  },
  {
    name: 'Codex CLI (codex)',
    transport: 'Structured JSON stream',
    capabilities: 'Reasoning trace, shell execution blocks, session resume support',
  },
  {
    name: 'OpenCode (opencode)',
    transport: 'Structured JSON stream',
    capabilities: 'Local profiles, model routing, tool output cards',
  },
  {
    name: 'Gemini CLI (gemini)',
    transport: 'stream-json',
    capabilities: 'Model selection, streaming text deltas, workspace directory binding',
  },
  {
    name: 'GitHub Copilot, Hermes, Pi',
    transport: 'CLI connectors',
    capabilities: 'Cached PATH discovery, clean hidden-console execution on Windows',
  },
  {
    name: 'BYOM Direct API & Ollama',
    transport: 'Native HTTP / SSE',
    capabilities: 'Anthropic, OpenAI, DeepSeek, Gemini, local Ollama, plus sandboxed tool calling',
  },
];

export const STUDIO_GROUPS = [
  {
    title: 'Data & Binary Viewers',
    items: [
      'SQLite Studio (read/write query bar & schema)',
      'CSV & Parquet high-density grid',
      'Hex & PE / ELF / WASM binary inspector',
      'Zero-extract ZIP archive browser',
      'FluxDoc (.flux) & GitHub-flavored Markdown',
      'Native Jupyter (.ipynb) & Image eyedropper',
    ],
  },
  {
    title: 'API, Infra & Remote',
    items: [
      'REST, GraphQL & cURL (.http) studio',
      'OpenAPI 3.1 explorer & loopback mock server',
      'Docker containers, images & compose cockpit',
      'Remote VPS / SSH explorer with Ctrl+S auto-upload',
      'Port forwarding & Cloudflare/SSH tunnel builder',
      '.env Vault camouflage editor & secret-leak guard',
    ],
  },
  {
    title: 'Security, Search & Quality',
    items: [
      'SAST vulnerability auditor & CVSS 3.1 triage',
      'Dependency & license boundary auditor',
      'CyberChef, JWT debugger & Regex lab',
      'Local SQLite FTS5 (BM25 + Trigram) RAG indexer',
      'Visual Git commit graph & 1-click Rewind checkpoints',
      'ER diagram architect & LCOV coverage viewer',
    ],
  },
];
