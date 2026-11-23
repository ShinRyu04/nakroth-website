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
  version: '1.0.1',
  tag: 'v1.0.1',
  released_at: '2026-11-23T17:26:21Z',
  release_url: 'https://github.com/ShinRyu04/Nakroth/releases/tag/v1.0.1',
  checksums_url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.0.1/SHA256SUMS.txt',
  platforms: {
    windows_exe: {
      filename: 'Nakroth-Setup-1.0.1-x64.exe',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.0.1/Nakroth-Setup-1.0.1-x64.exe',
      sha256: '244e827d8da852f47a7b4491cbf2e0ab74c9d9c3f2e0154ed62be5d7869e97f1',
      size_mb: 30.2,
    },
    windows_zip: {
      filename: 'Nakroth-Windows-x64-Portable.zip',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.0.1/Nakroth-Windows-x64-Portable.zip',
      sha256: '7bd93dc56ca0676f887d29b22789667c4e4f9375c3d3fd768038aba8628c5cb0',
      size_mb: 42.04,
    },
    linux_deb: {
      filename: 'nakroth_1.0.1_amd64.deb',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.0.1/nakroth_1.0.1_amd64.deb',
      sha256: '1d05568e4feabeb403a7cdee56db8a99b5c34983ce138919b39f32a158dd0b55',
      size_mb: 37.15,
    },
    linux_rpm: {
      filename: 'nakroth-1.0.1-1.x86_64.rpm',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.0.1/nakroth-1.0.1-1.x86_64.rpm',
      sha256: '8fa2b34c8d96291fb4bc1bef186f776783b0b9c0e31ed549dff427c4e01f0756',
      size_mb: 46.24,
    },
    linux_appimage: {
      filename: 'Nakroth-1.0.1-x86_64.AppImage',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.0.1/Nakroth-1.0.1-x86_64.AppImage',
      sha256: '74fac5fc3d40fec58c382b6c4b64440f240aac471aa30e6adbc10bcc43c73bf0',
      size_mb: 46.01,
    },
    macos_dmg: {
      filename: 'Nakroth-1.0.1-arm64.dmg',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.0.1/Nakroth-1.0.1-arm64.dmg',
      sha256: '27d4735d26ab60dac073cb172046f243e66cbe9c40461bb3b47dcb7eddfda846',
      size_mb: 45.45,
    },
    macos_pkg: {
      filename: 'Nakroth-1.0.1-arm64.pkg',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.0.1/Nakroth-1.0.1-arm64.pkg',
      sha256: '1c1f6524f790fa17c0317c9e845039ed4f617d767574dde625211ea937650572',
      size_mb: 43.85,
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
    // Fallback to embedded v1.0.1 manifest cleanly
  }
  return FALLBACK_MANIFEST;
}
