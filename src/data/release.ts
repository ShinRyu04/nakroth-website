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
  version: '1.1.2',
  tag: 'v1.1.2',
  released_at: '2026-11-25T07:55:00Z',
  release_url: 'https://github.com/ShinRyu04/Nakroth/releases/tag/v1.1.2',
  checksums_url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.2/SHA256SUMS.txt',
  platforms: {
    windows_exe: {
      filename: 'Nakroth-Setup-1.1.2-x64.exe',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.2/Nakroth-Setup-1.1.2-x64.exe',
      sha256: '222aeca760f4c65b963d1f3d7d3f65ce49ca2718a4ace1c7f114cd9d4926f523',
      size_mb: 30.51,
    },
    windows_zip: {
      filename: 'Nakroth-Windows-x64-Portable.zip',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.2/Nakroth-Windows-x64-Portable.zip',
      sha256: '2f6de13fb870452b424ebd8f8a391462bbaf66c7e322c7eb3403388fcafc6935',
      size_mb: 42.82,
    },
    linux_deb: {
      filename: 'nakroth_1.1.2_amd64.deb',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.2/nakroth_1.1.2_amd64.deb',
      sha256: '27f6f77f8b075fe2b361b8f0eaa876c29558b51d4f53adee7cdcf04d8f36cc5f',
      size_mb: 37.48,
    },
    linux_rpm: {
      filename: 'nakroth-1.1.2-1.x86_64.rpm',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.2/nakroth-1.1.2-1.x86_64.rpm',
      sha256: 'b6bef229187da558b7403d57572fe8a970fad79d22bc0b992dc031f45c12c90e',
      size_mb: 46.72,
    },
    linux_appimage: {
      filename: 'Nakroth-1.1.2-x86_64.AppImage',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.2/Nakroth-1.1.2-x86_64.AppImage',
      sha256: '5c859723386a340c4e196d5638601e034a6932b5b6a25d2b03045ebbb60c0885',
      size_mb: 46.43,
    },
    macos_dmg: {
      filename: 'Nakroth-1.1.2-arm64.dmg',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.2/Nakroth-1.1.2-arm64.dmg',
      sha256: '1f89c09608e50b1112558b1ec195d9a104a2fcab3d6d1e97e24bf9d6e76ad488',
      size_mb: 45.92,
    },
    macos_pkg: {
      filename: 'Nakroth-1.1.2-arm64.pkg',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.2/Nakroth-1.1.2-arm64.pkg',
      sha256: '9eab8f800723b2f6f4647c2f67294641ad7cdc8cc68f2b732beb60f58cb293fc',
      size_mb: 44.31,
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
    // Fallback to embedded v1.1.2 manifest cleanly
  }
  return FALLBACK_MANIFEST;
}
