---
title: Install PlateVault
description: Download and run PlateVault on Windows, Linux, or Apple Silicon macOS.
---

PlateVault ships from the
[GitHub Releases page](https://github.com/platevault/platevault/releases/latest).
Download the asset for your platform, install it, and launch — the
[setup wizard](../../manual/setup-wizard/) takes over from there. Updates
after installation are handled in-app by the signature-verified
[updater](../../manual/updater/).

| Platform | Asset |
| --- | --- |
| Windows x64 | `PlateVault_{version}_x64-setup.exe` (NSIS) or `PlateVault_{version}_x64_en-US.msi` |
| Linux x64 | `PlateVault_{version}_amd64.AppImage`, `PlateVault_{version}_amd64.deb`, or `PlateVault-{version}-1.x86_64.rpm` |
| macOS Apple Silicon | `PlateVault_{version}_aarch64.dmg`, or via [Homebrew](#macos-apple-silicon) |

## Windows

1. Download the NSIS installer (`…_x64-setup.exe`) or the MSI.
2. Run it. When Windows SmartScreen shows "Windows protected your PC",
   click **More info**, then **Run anyway** — this is the standard first-run
   step for an installer that has not yet accumulated SmartScreen
   reputation.
3. Follow the installer prompts and launch PlateVault from the Start menu.

## Linux

Pick the format your distribution prefers:

- **AppImage** — make it executable and run it:

  ```sh
  chmod +x PlateVault_*_amd64.AppImage
  ./PlateVault_*_amd64.AppImage
  ```

- **deb** (Debian, Ubuntu, and derivatives):

  ```sh
  sudo apt install ./PlateVault_*_amd64.deb
  ```

- **rpm** (Fedora, openSUSE, and derivatives):

  ```sh
  sudo dnf install ./PlateVault-*-1.x86_64.rpm
  ```

## macOS (Apple Silicon)

PlateVault only builds for Apple Silicon (arm64) — there is no Intel build.

**Homebrew** (easiest if you already use it):

```sh
brew tap platevault/tap
brew install --cask platevault
```

**Manual download:**

1. Download the `aarch64` dmg and drag PlateVault into **Applications**.
2. On first launch, right-click (or Control-click) the app in Applications
   and choose **Open**, then confirm — this is the standard Gatekeeper step
   for an app distributed outside the App Store without notarization, and
   it is only needed once. This applies whether you installed via Homebrew
   or the dmg: the app is ad-hoc-signed, not notarized.

After install, the in-app [updater](../../manual/updater/) — not
`brew upgrade` — is what keeps PlateVault current; the cask is marked
`auto_updates true` and its version is bumped automatically after each
release.

## Verifying a download

The Windows and Linux installers each ship with a matching `.sig` file: a
minisign signature made with the same release keypair the in-app updater
verifies against. (The macOS dmg has no detached signature; its update
artifact carries one.) Checking a signature is optional for a first
install; every subsequent in-app update is verified automatically before
anything is installed.
