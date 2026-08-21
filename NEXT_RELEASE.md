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
- All required secrets now set (Cloudflare, Capgo, App Store Connect, iOS distribution
  cert/profile, Android release keystore) — Android was genuinely missing when an earlier draft
  of this doc claimed otherwise; that's now fixed and verified end-to-end (a real signed `.aab`
  was successfully built in CI against the actual keystore).

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

3. **Run the Android release workflow**: GitHub → Actions → "Build Signed Android Release
   Bundle" → Run workflow.
   ```bash
   gh workflow run "Build Signed Android Release Bundle"
   ```
   Download the signed `.aab` artifact from the completed run and upload it manually to Play
   Console — there's no automated Play Store publish step (unlike iOS's direct App Store Connect
   upload).

4. **Wait for the iOS build to finish processing** in App Store Connect (Activity tab) —
   typically 10–30 minutes after upload before it's selectable as "Ready to Submit."

5. **Attach build 2 to the app version** in App Store Connect and Play Console, paste the release
   notes below, and submit for review on both.

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

- Actual "Submit for Review" in App Store Connect and upload to Play Console are both still
  manual steps — neither store's submission flow is automated here.
- The stale `NOT YET USABLE AS-IS` warning comments at the top of `ios-release.yml` and
  `android-release.yml` (from when this app's release secrets didn't exist yet) are now
  **outdated** — all required secrets are confirmed present and the pipelines verified working.
  Worth cleaning up those comments in a future pass so they don't mislead the next person reading
  these workflows.
- The release keystore (`.jks`, passwords, alias) was backed up and delivered to you directly as
  a zip — store it somewhere durable (password manager/vault). It only exists as an opaque GitHub
  secret otherwise, which works fine for CI builds but isn't human-recoverable if that secret is
  ever accidentally overwritten.
