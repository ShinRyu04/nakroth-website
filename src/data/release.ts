export type PlatformKey =
  | 'windows_exe'
  | 'windows_zip'
  | 'linux_deb'
  | 'linux_rpm'
  | 'linux_appimage'
  | 'macos_dmg'
  | 'macos_pkg';

export type OsFamily = 'windows' | 'linux' | 'macos';

export interface ReleaseAsset {
  filename: string;
  url: string;
  sha256: string;
  size_mb: number;
}

export interface ReleaseManifest {
  version: string;
  tag: string;
  released_at: string;
  release_url: string;
  checksums_url: string;
  platforms: Record<PlatformKey, ReleaseAsset>;
}

export const FALLBACK_MANIFEST: ReleaseManifest = {
  version: '1.1.3',
  tag: 'v1.1.3',
  released_at: '2026-11-26T12:06:52Z',
  release_url: 'https://github.com/ShinRyu04/Nakroth/releases/tag/v1.1.3',
  checksums_url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.3/SHA256SUMS.txt',
  platforms: {
    windows_exe: {
      filename: 'Nakroth-Setup-1.1.3-x64.exe',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.3/Nakroth-Setup-1.1.3-x64.exe',
      sha256: '2dbcc01db83e716d3ae4c807a20292ab2590e1787252aca487e5c263c8773d8c',
      size_mb: 31.01,
    },
    windows_zip: {
      filename: 'Nakroth-Windows-x64-Portable.zip',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.3/Nakroth-Windows-x64-Portable.zip',
      sha256: 'd3af11b04b0cb8ff02536b3d9dfcca663c4c6c5c8b5a0e83c23488df6cb7158b',
      size_mb: 43.42,
    },
    linux_deb: {
      filename: 'nakroth_1.1.3_amd64.deb',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.3/nakroth_1.1.3_amd64.deb',
      sha256: '37701693c36028ae53fb3ecb15d66b091163ef1d8f263aa2f6880559472f70fd',
      size_mb: 38.23,
    },
    linux_rpm: {
      filename: 'nakroth-1.1.3-1.x86_64.rpm',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.3/nakroth-1.1.3-1.x86_64.rpm',
      sha256: '1d7cff16a2835e8c3d589eadc9b532a248b1d8dae650bdc7e3ce9529dee3a30d',
      size_mb: 47.62,
    },
    linux_appimage: {
      filename: 'Nakroth-1.1.3-x86_64.AppImage',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.3/Nakroth-1.1.3-x86_64.AppImage',
      sha256: '29f5ab324f6d7662c782e5ed352c5ca1c19800cdb46042a49bef6b6feb79d1e0',
      size_mb: 47.23,
    },
    macos_dmg: {
      filename: 'Nakroth-1.1.3-arm64.dmg',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.3/Nakroth-1.1.3-arm64.dmg',
      sha256: '7b3e93eeacd7755d0b07f07fc23f2794475dd667d580d1cefbc2b3287731ce63',
      size_mb: 46.8,
    },
    macos_pkg: {
      filename: 'Nakroth-1.1.3-arm64.pkg',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.3/Nakroth-1.1.3-arm64.pkg',
      sha256: 'd7c6f85fa66b4136290deacc77d7bef0bfe55744e63dfa10ac2ab2138cf28e67',
      size_mb: 45.11,
    },
  },
};

export const INSTALL_COMMANDS: Record<OsFamily, string> = {
  windows: 'irm https://github.com/ShinRyu04/Nakroth/releases/latest/download/install.ps1 | iex',
  linux: 'curl -fsSL https://github.com/ShinRyu04/Nakroth/releases/latest/download/install.sh | sh',
  macos: 'curl -fsSL https://github.com/ShinRyu04/Nakroth/releases/latest/download/install.sh | sh',
};

export function detectUserOs(): OsFamily {
  if (typeof navigator === 'undefined') return 'windows';
  const ua = `${navigator.userAgent} ${navigator.platform ?? ''}`.toLowerCase();
  if (ua.includes('mac') || ua.includes('darwin')) return 'macos';
  if (ua.includes('linux') || ua.includes('x11')) return 'linux';
  return 'windows';
}

export function primaryAssetForOs(manifest: ReleaseManifest, os: OsFamily): ReleaseAsset {
  switch (os) {
    case 'macos':
      return manifest.platforms.macos_dmg;
    case 'linux':
      return manifest.platforms.linux_deb;
    default:
      return manifest.platforms.windows_exe;
  }
}

export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
}

export async function loadLatestManifest(): Promise<ReleaseManifest> {
  try {
    const res = await fetch(assetUrl('latest.json'), { cache: 'no-store' });
    if (res.ok) {
      const data = (await res.json()) as ReleaseManifest;
      if (data?.version && data?.platforms?.windows_exe) {
        return data;
      }
    }
  } catch {
    // Fallback to embedded v1.1.3 manifest cleanly
  }
  return FALLBACK_MANIFEST;
}
