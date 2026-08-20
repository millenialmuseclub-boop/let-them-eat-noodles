# Native Setup

## Current State

`@capacitor/core`, `@capacitor/ios`, `@capacitor/android`, `@capacitor/cli`, `@capacitor/app` installed (matching the family's exact dependency versions). `capacitor.config.ts` created with `webDir: 'dist'`, no StatusBar/SplashScreen overrides (native defaults + CSS `env(safe-area-inset-*)` handling cover it, same as Cake/Ramen).

**Native iOS/Android platform folders (`ios/`, `android/`) have NOT been generated this pass** — `npx cap add ios` / `npx cap add android` require Xcode/Android Studio tooling not available in this environment. This is scaffolding-ready, not yet run.

## Bundle Identity — NOT YET CONFIRMED

`appId: 'com.letthemeatnoodles.app'` in `capacitor.config.ts` is a **working default** following the family naming convention (`com.letthemeat<app>.app`, as used by Cake and Ramen). It is explicitly **not** a confirmed final identity.

Learn directly from Cookies: its bundle ID had to be corrected after the fact because an App Store Connect record was created under a different ID before the mismatch was caught, and a bundle ID cannot change once an ASC record exists. **Confirm this value with the project owner before creating any Apple Developer or App Store Connect resource** — no such resources were created this pass, per the master brief.

## What's Deferred to Release Prep

- Running `npx cap add ios` / `npx cap add android` and `npx cap sync`
- Apple Developer account / certificates / provisioning profiles / App Store Connect record
- The GitHub Actions macOS iOS-release workflow (Ramen's `APP_STORE_SUBMISSION_PLAYBOOK.md` is the documented no-Mac walkthrough to follow when this app reaches that stage)
- App Store / Google Play metadata and screenshots
