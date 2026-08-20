# Native Setup

## Current State (Release-Readiness Pass)

`@capacitor/core`, `@capacitor/ios`, `@capacitor/android`, `@capacitor/cli`, `@capacitor/app` installed. `capacitor.config.ts`: `webDir: 'dist'`, no StatusBar/SplashScreen plugin overrides (native defaults + CSS `env(safe-area-inset-*)` handling cover it, same as Cake/Ramen).

**Both native platform folders now exist**: `ios/` and `android/` were generated this pass with `npx cap add ios` / `npx cap add android` (both succeeded — iOS scaffolding via `cap add` does not itself require a Mac; it only becomes required for `pod install`/building/archiving, none of which happened in this environment). `npx cap sync` has been run against the current production build (51-dish catalog, real photography) and both platforms consume it.

## Bundle Identity — CONFIRMED AS WORKING DEFAULT, STILL NOT APPLE-REGISTERED

`appId: 'com.letthemeatnoodles.app'` is consistent across `capacitor.config.ts`, `android/app/build.gradle` (`namespace` and `applicationId`), and `ios/App/App.xcodeproj/project.pbxproj` (`PRODUCT_BUNDLE_IDENTIFIER`, both Debug and Release configurations) — verified by direct inspection, not assumed.

This remains a **working default following the family naming convention**, not a confirmed-final identity. Per the Cookies lesson (its bundle ID had to be corrected after an App Store Connect record already existed under a mismatched ID, and a bundle ID cannot change once that record exists): **confirm this value with the project owner before creating any Apple Developer or App Store Connect resource under it.** No such resource has been created.

## App Name, Version, Build

- Display name: "Let Them Eat Noodles" — verified in `ios/App/App/Info.plist` (`CFBundleDisplayName`) and `android/app/src/main/res/values/strings.xml` (`app_name`).
- Version 1.0, Build 1 — verified in `android/app/build.gradle` (`versionName "1.0"`, `versionCode 1`) and `ios/App/App.xcodeproj/project.pbxproj` (`MARKETING_VERSION = 1.0`, `CURRENT_PROJECT_VERSION = 1`), both Capacitor's correct defaults for a first release.

## App Icon & Splash — Generated, Wired, Verified

Master icon (`assets/icon-1024.png`, 1024×1024, RGB, no alpha channel — verified via `sharp`'s own metadata output) and splash (`assets/splash.png`, 2732×2732) were designed fresh for Noodles (a jade ceramic bowl with lacquer-red and brass chopsticks and a steam wisp, on the app's own ivory background — reuses the app's actual token palette rather than generic noodle clip art, and is visually distinct from Cake's raspberry/gold, Ramen's cocoa/gold, and Cookies' plum/champagne icon treatments while clearly sharing the family's "one strong accent on a warm neutral" shape).

Generated via `npx capacitor-assets generate`, which replaced **every** default Capacitor launcher icon and splash asset in both `android/` (all `mipmap-*` densities, adaptive icon foreground/background, light and dark splash for all `drawable-*` density/orientation buckets) and `ios/` (`AppIcon.appiconset`, `Splash.imageset` light and dark) — directly addressing the Cookies lesson about not leaving the default icon in a final native project. Verified visually by reading back the generated `ic_launcher.png` (Android) and `AppIcon-512@2x.png` (iOS) — both render the real bowl artwork correctly at full resolution and remain legible at launcher-icon scale.

Source files: `assets/icon-master.svg`, `assets/splash-master.svg`, `assets/icon.png` (rasterized master used as input), `assets/icon-1024.png`, `assets/splash.png`.

## iOS Release Configuration — Code/Config Ready, Apple Account Resources Required

**Ready in this repo:**
- `ios/release.xcconfig` — manual code-signing configuration (`CODE_SIGN_STYLE = Manual`, `CODE_SIGN_IDENTITY = Apple Distribution`), with `DEVELOPMENT_TEAM` and `PROVISIONING_PROFILE_SPECIFIER` as clearly marked placeholders.
- `.github/workflows/ios-release.yml` — a manual-dispatch GitHub Actions workflow, structurally identical to Let Them Eat Ramen's proven working version (macOS runner, temporary keychain + distribution cert import, provisioning profile install, App Store Connect API key setup, `xcodebuild archive` → `-exportArchive` → `altool --upload-app`, cleanup). Bundle ID and artifact names updated for Noodles; Team ID left as an explicit placeholder.

**Requires Apple account resources not created this pass** (per the master brief — do not create these without the user):
1. An Apple Developer Program membership / Team ID for this app.
2. Confirmation (or correction) of the `com.letthemeatnoodles.app` bundle ID as final, then an App Store Connect app record created under it.
3. An Apple Distribution certificate (`.p12`) and an App Store provisioning profile for that bundle ID, named `Let Them Eat Noodles App Store` to match the xcconfig/workflow placeholder (or the placeholder updated to match whatever name is actually chosen).
4. An App Store Connect API key (Key ID, `.p8` file, Issuer ID).
5. Six GitHub repo secrets populated from the above: `IOS_DIST_CERT_P12_BASE64`, `IOS_DIST_CERT_PASSWORD`, `IOS_PROVISION_PROFILE_BASE64`, `APP_STORE_CONNECT_KEY_ID`, `APP_STORE_CONNECT_API_KEY_BASE64`, `APP_STORE_CONNECT_ISSUER_ID`.
6. `ios/release.xcconfig` set as the App target's Release configuration's base configuration file in Xcode (Project navigator → App project → App target → Info tab → Configurations → Release → App row) — this specific step requires Xcode and cannot be done from this (non-Mac) environment.

No credentials, Team IDs, Issuer IDs, or provisioning profiles were invented anywhere in this repo.

## Android Release Configuration — Code/Config Ready, Keystore Required

**Ready in this repo:**
- `android/app/build.gradle` now has a `signingConfigs.release` block reading `ANDROID_KEYSTORE_PATH`/`ANDROID_KEYSTORE_PASSWORD`/`ANDROID_KEY_ALIAS`/`ANDROID_KEY_PASSWORD` from the environment, applied to `buildTypes.release` only when a keystore path is actually set (mirrors Cake's proven pattern exactly) — so a local or CI build without a keystore still succeeds as an **unsigned** release build rather than silently falling back to debug signing.
- `.github/workflows/android-release.yml` — manual-dispatch workflow, Ubuntu runner, decodes a base64 keystore secret, runs `./gradlew bundleRelease`, uploads the signed `.aab`.
- Launcher icon and adaptive icon: real artwork wired in for every density (see App Icon section above) — the Cookies lesson about the default Capacitor icon does not apply here; it was fixed proactively, not left as a defect.

**Requires one thing not created this pass:** a real Android signing keystore (`keytool -genkey -v -keystore release.keystore.jks ...`) and the four `ANDROID_KEYSTORE_*` GitHub secrets derived from it. Generating a production signing keystore is a one-way, user-owned decision (losing it permanently blocks future updates to a published app) and was intentionally left for the user to create and store securely, not generated speculatively in this pass.

## Privacy / Data Behavior — Audited, Not Assumed

Verified by reading `package.json` and the app's own source, not assumed:
- Runtime dependencies: React, React Router, `react-simple-maps` + `world-atlas` (Atlas rendering only, no network calls of their own), and the Capacitor core/iOS/Android/app packages. **No analytics SDK, no ads SDK, no crash-reporting SDK.**
- The only client-side storage used anywhere in the app is `window.localStorage`, and only by `src/lib/useMyNoodles.ts` (the My Noodles personal library) — confirmed via `grep -rl localStorage src/`, one match.
- No account/login flow exists anywhere in the router (`src/App.tsx`).
- The only outbound network activity a user can trigger is tapping an affiliate link (Curated Kitchen or a Workshop lab's contextual product links), which opens the system browser to an external merchant site — the app makes no request itself.

See `APP_STORE_METADATA.md` and `GOOGLE_PLAY_METADATA.md` for the resulting privacy-facing copy.

## Screenshot Pipeline

`scripts/capture-screenshots.mjs` — deterministic Puppeteer capture (not a browser-extension screenshot save) against the production preview server, seeding My Noodles localStorage and a live Sommelier FIND result before capturing so no screenshot shows an empty state. See `STORE_SCREENSHOT_PLAN.md` for surfaces, dimensions, and QA results.

## What's Still Deferred

- Actually running the release workflows (blocked on the Apple/Android account resources above)
- App Store Connect / Google Play Console app records
- TestFlight/internal testing distribution
