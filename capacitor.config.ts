import type { CapacitorConfig } from '@capacitor/cli';

// Mirrors Cake/Ramen's capacitor.config.ts shape: appId naming convention
// (com.letthemeat<app>.app), webDir 'dist'. NOT copying Cake's CapacitorUpdater/OTA block for
// the same reason Ramen didn't -- no private signing key or R2 bucket provisioned for Noodles.
//
// IMPORTANT (per the Cookies bundle-ID lesson): this appId is a WORKING DEFAULT following the
// family convention, NOT a confirmed final identity. Cookies had to correct its bundle ID after
// the fact because an App Store Connect record was created under a different ID before the
// mismatch was caught -- and a bundle ID cannot change once an ASC record exists. Confirm this
// value with the project owner BEFORE creating any Apple Developer / App Store Connect resources.
const config: CapacitorConfig = {
  appId: 'com.letthemeatnoodles.app',
  appName: 'Let Them Eat Noodles',
  webDir: 'dist',
};

export default config;
