import { useState } from 'react';
import { CopyCommand } from '../components/CopyCommand';
import { DownloadIcon } from '../components/Icons';
import { UI_COPY, type Locale } from '../data/i18n';
import {
  INSTALL_COMMANDS,
  detectUserOs,
  type OsFamily,
  type ReleaseManifest,
} from '../data/release';

interface DownloadPageProps {
  locale: Locale;
  manifest: ReleaseManifest;
}

export function DownloadPage({ locale, manifest }: DownloadPageProps) {
  const [selectedOs, setSelectedOs] = useState<OsFamily>(() => detectUserOs());
  const t = UI_COPY[locale];

  const rowsByOs: Record<
    OsFamily,
    Array<{ title: string; subtitle: string; filename: string; sizeMb: number; sha256: string; url: string }>
  > = {
    windows: [
      {
        title: 'Windows x64 Installer (.exe)',
        subtitle: 'Inno Setup 6 wizard — adds nakroth / nk to PATH and optional Explorer context menu',
        filename: manifest.platforms.windows_exe.filename,
        sizeMb: manifest.platforms.windows_exe.size_mb,
        sha256: manifest.platforms.windows_exe.sha256,
        url: manifest.platforms.windows_exe.url,
      },
      {
        title: 'Windows x64 Portable (.zip)',
        subtitle: 'Zero-install archive containing nakroth.exe, nakroth-cli.exe, and nakroth-remote-server.exe',
        filename: manifest.platforms.windows_zip.filename,
        sizeMb: manifest.platforms.windows_zip.size_mb,
        sha256: manifest.platforms.windows_zip.sha256,
        url: manifest.platforms.windows_zip.url,
      },
    ],
    linux: [
      {
        title: 'Debian / Ubuntu / Mint (.deb)',
        subtitle: `Install with sudo apt install ./${manifest.platforms.linux_deb.filename}`,
        filename: manifest.platforms.linux_deb.filename,
        sizeMb: manifest.platforms.linux_deb.size_mb,
        sha256: manifest.platforms.linux_deb.sha256,
        url: manifest.platforms.linux_deb.url,
      },
      {
        title: 'Fedora / openSUSE / RHEL (.rpm)',
        subtitle: `Install with sudo dnf install ./${manifest.platforms.linux_rpm.filename}`,
        filename: manifest.platforms.linux_rpm.filename,
        sizeMb: manifest.platforms.linux_rpm.size_mb,
        sha256: manifest.platforms.linux_rpm.sha256,
        url: manifest.platforms.linux_rpm.url,
      },
      {
        title: 'Universal Linux (.AppImage)',
        subtitle: 'Portable executable: chmod +x Nakroth-*.AppImage && ./Nakroth-*.AppImage',
        filename: manifest.platforms.linux_appimage.filename,
        sizeMb: manifest.platforms.linux_appimage.size_mb,
        sha256: manifest.platforms.linux_appimage.sha256,
        url: manifest.platforms.linux_appimage.url,
      },
    ],
    macos: [
      {
        title: 'macOS Apple Silicon Disk Image (.dmg)',
        subtitle: 'Drag Nakroth.app into Applications. On unsigned builds run: xattr -cr /Applications/Nakroth.app',
        filename: manifest.platforms.macos_dmg.filename,
        sizeMb: manifest.platforms.macos_dmg.size_mb,
        sha256: manifest.platforms.macos_dmg.sha256,
        url: manifest.platforms.macos_dmg.url,
      },
      {
        title: 'macOS Apple Silicon Installer (.pkg)',
        subtitle: 'Guided installer that also links nakroth and nk into /usr/local/bin',
        filename: manifest.platforms.macos_pkg.filename,
        sizeMb: manifest.platforms.macos_pkg.size_mb,
        sha256: manifest.platforms.macos_pkg.sha256,
        url: manifest.platforms.macos_pkg.url,
      },
    ],
  };

  const activeRows = rowsByOs[selectedOs];
  const checksumBlock = activeRows.map((r) => `${r.sha256}  ${r.filename}`).join('\n');

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="section-title">
            {locale === 'id' ? `Unduh Nakroth ${manifest.tag}` : `Download Nakroth ${manifest.tag}`}
          </h1>
          <p className="section-desc">
            {locale === 'id'
              ? 'Semua installer resmi diverifikasi SHA-256 dan dibuild langsung dari source Rust GPUI.'
              : 'Official signed-checksum packages for Windows x64, Linux x86_64, and macOS Apple Silicon.'}
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="container">
          <div className="os-tabs" role="tablist" aria-label="Operating system">
            {(['windows', 'linux', 'macos'] as const).map((os) => (
              <button
                key={os}
                type="button"
                role="tab"
                aria-selected={selectedOs === os}
                className="mode-tab"
                onClick={() => setSelectedOs(os)}
              >
                {os === 'windows' ? 'Windows x64' : os === 'linux' ? 'Linux x86_64' : 'macOS Apple Silicon'}
              </button>
            ))}
          </div>

          <div className="download-command-wrap">
            <CopyCommand
              command={INSTALL_COMMANDS[selectedOs]}
              copyLabel={t.hero.copy}
              copiedLabel={t.hero.copied}
            />
          </div>

          <div key={selectedOs} className="download-list mode-stage-swap">
            {activeRows.map((row) => (
              <div key={row.filename} className="download-row">
                <div>
                  <div className="download-row-title">{row.title}</div>
                  <div className="download-row-sub">{row.subtitle}</div>
                </div>
                <div className="download-row-meta">
                  {row.filename} ({row.sizeMb.toFixed(2)} MB)
                </div>
                <div>
                  <a href={row.url} className="btn-primary btn-sm">
                    <DownloadIcon />
                    <span>{locale === 'id' ? 'Unduh' : 'Download'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="checksum-box">
            <div className="code-block">
              <div className="code-block-head">
                <span>SHA-256 checksums ({manifest.tag})</span>
                <a href={manifest.checksums_url} target="_blank" rel="noreferrer" className="nav-link">
                  SHA256SUMS.txt
                </a>
              </div>
              <pre>
                <code>{checksumBlock}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
