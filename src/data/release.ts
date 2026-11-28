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
  version: '1.1.5',
  tag: 'v1.1.5',
  released_at: '2026-11-28T11:51:09Z',
  release_url: 'https://github.com/ShinRyu04/Nakroth/releases/tag/v1.1.5',
  checksums_url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.5/SHA256SUMS.txt',
  platforms: {
    windows_exe: {
      filename: 'Nakroth-Setup-1.1.5-x64.exe',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.5/Nakroth-Setup-1.1.5-x64.exe',
      sha256: 'fd340b8fbf6222adb7a17d993a44d99cab6f039192cb1e9188492b789ee1ba6b',
      size_mb: 31.74,
    },
    windows_zip: {
      filename: 'Nakroth-Windows-x64-Portable.zip',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.5/Nakroth-Windows-x64-Portable.zip',
      sha256: '35b9d02ed7210d4eff78a1b7ae21d30d3b8abafda25ece18e2f6cee9c88b8a12',
      size_mb: 45.2,
    },
    linux_deb: {
      filename: 'nakroth_1.1.5_amd64.deb',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.5/nakroth_1.1.5_amd64.deb',
      sha256: '2fa1040602d4cb2f447e37643aee4042637b6919c5fd79c0c984fb06f4ae503c',
      size_mb: 38.11,
    },
    linux_rpm: {
      filename: 'nakroth-1.1.5-1.x86_64.rpm',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.5/nakroth-1.1.5-1.x86_64.rpm',
      sha256: 'ad1f7e50d0b02f04647cfea5a3b39f20ccb58ca0831ec53aadb3a26ba9c9b60b',
      size_mb: 47.59,
    },
    linux_appimage: {
      filename: 'Nakroth-1.1.5-x86_64.AppImage',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.5/Nakroth-1.1.5-x86_64.AppImage',
      sha256: '81386b173f890b12870d69f2586ef3fdad6c47293e6db95b02141e36865907fd',
      size_mb: 47.24,
    },
    macos_dmg: {
      filename: 'Nakroth-1.1.5-arm64.dmg',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.5/Nakroth-1.1.5-arm64.dmg',
      sha256: '0549aaf2da6920fe4e3d11ac78dc1edc4e0371c04c4f776afc9a0c1fdf7e6cca',
      size_mb: 46.8,
    },
    macos_pkg: {
      filename: 'Nakroth-1.1.5-arm64.pkg',
      url: 'https://github.com/ShinRyu04/Nakroth/releases/download/v1.1.5/Nakroth-1.1.5-arm64.pkg',
      sha256: '9c2dc75822d5f549f519ab958cd2adf3648f59020b7ae7b89f48604b6d7d26ee',
      size_mb: 45.09,
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
    // Fallback to embedded v1.1.5 manifest cleanly
  }
  return FALLBACK_MANIFEST;
}
