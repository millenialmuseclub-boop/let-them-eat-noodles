# Next Release Checklist

Status as of this writing: v1.0 (build 1) is submitted and in Apple review. **Do not touch that
submission.** This doc is what to run once it clears (approved, or rejected and needing a fix) —
everything below is already prepped so the only remaining work is running two workflows and a few
minutes in App Store Connect / Play Console.

## What's already done, ready to ship

- Build number bumped to **2** in `ios/App/App.xcodeproj/project.pbxproj` and
  `android/app/build.gradle` (marketing version stays `1.0`, matching Cake's convention of
  incrementing only the build number across releases under the same version).
- Zero-server OTA infrastructure (`OTA_UPDATES.md`) — this release is what actually activates it;
  no build has shipped with the plugin until this one.
- The family-wide visual refinement pass: enriched jade/lacquer/brass palette usage, homepage
  emoji-fallback fix, complete Twirl story photography (all 6 stories), medium photo tier,
  lighter Workshop rail (see git log for full detail).
- iOS release secrets already set (Cloudflare, Capgo, App Store Connect, iOS distribution
  cert/profile). **Android release secrets are NOT set** — see Known Gaps below, this was wrong
  in an earlier draft of this doc.

## Steps, in order

1. **Confirm the current v1.0 (build 1) review outcome** in App Store Connect.
   - If **rejected**: read the rejection reason first. If it requires a code change beyond what's
     already on `main`, make that fix before proceeding — don't ship build 2 blind to a known
     rejection reason.
   - If **approved**: proceed directly.

2. **Run the iOS release workflow**: GitHub → Actions → "Build, Sign, and Upload iOS Release
   Build" → Run workflow. This runs entirely on GitHub's macOS runner — no local Mac needed.
   ```bash
   gh workflow run "Build, Sign, and Upload iOS Release Build"
   ```

3. **Android is not ready yet** — `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`,
   `ANDROID_KEY_ALIAS`, and `ANDROID_KEY_PASSWORD` are not set in this repo's secrets. Running
   "Build Signed Android Release Bundle" right now will fail safe and produce an **unsigned**
   bundle per the workflow's own comment, not something you can upload to Play Console. Generate
   a release keystore first (see the workflow's header comment / `NATIVE_SETUP.md` for how), add
   the four secrets, then this step becomes real. Until then, iOS is the only store this release
   actually ships to.

4. **Wait for the iOS build to finish processing** in App Store Connect (Activity tab) —
   typically 10–30 minutes after upload before it's selectable as "Ready to Submit."

5. **Attach build 2 to the app version** in App Store Connect, paste the release notes below, and
   submit for review. (Play Console submission waits on the Android keystore setup above.)

6. **Once build 2 is approved and live**, confirm OTA is actually reachable: the `production`
   manifest is already published (verified live during this pass), so any device running build 2
   should silently pick it up on its next launch. No further action needed unless you want to spot
   check via device logs.

## Draft release notes ("What's New in This Version")

> A visual refresh across the app — richer color throughout Atlas and Twirl, complete photography
> for every Twirl story, and small polish fixes. Under the hood, we've also laid the groundwork
> for faster future updates.

Feel free to shorten or restyle this — it's a starting draft, not final copy.

## Known gaps (not addressed in this pass)

- **Android release keystore/secrets don't exist** — `android-release.yml` will produce an
  unsigned bundle until `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`,
  `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD` are generated and added as secrets.
- Actual "Submit for Review" in App Store Connect is still a manual step — Apple's submission
  flow (export compliance question, etc.) isn't automated here.
- The stale `NOT YET USABLE AS-IS` warning comment at the top of `ios-release.yml` (from when
  this app's iOS release secrets didn't exist yet) is now **outdated** for iOS — those secrets
  are confirmed present. The equivalent comment on `android-release.yml` is still accurate.
