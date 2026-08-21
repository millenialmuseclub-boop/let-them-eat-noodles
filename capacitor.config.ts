import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.letthemeatnoodles.app',
  appName: 'Let Them Eat Noodles',
  webDir: 'dist',
  plugins: {
    extConfig: {},
    CapacitorUpdater: {
      // Zero-server OTA (see OTA_UPDATES.md): app-side TS in src/lib/otaUpdater.ts
      // owns the update decision by polling a static manifest.json on R2, so
      // autoUpdate must stay off — the plugin never talks to a Capgo backend.
      autoUpdate: false,
      // Public half of the key pair generated via `npx @capgo/cli key create`.
      // Safe to embed — it only lets the plugin verify/decrypt bundles signed
      // with the matching private key, which lives only in the CAPGO_PRIVATE_KEY
      // GitHub secret. Rotating this requires a new store build (see OTA_UPDATES.md).
      publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAoxzMPA+YNqBAvtnB9rqSwHRENxo98v22eWQHMM/Jr5U0pSv3Ioop\ngHdJzAINTH5EJavajTPGvUluunSxuTJR89OuoraXvfuYAlCnBiW5wJBVzfrjYKGi\n/nfglevHz251EdcnDSqOnXNPjZEOt4v5WY51KQDwIyaElas5apT72BdX6FoXv8uf\n8FIBsNjw2vxUNw5GVYP9dTGkuMqoCX52D54k2IQ5RJoWJWF9x+rDs7YIWVWgorE5\nrnDzKPnYvQqsB9+vNBnI7jx3948Qgw1Czk3Sx/m2HdjU7+sFQYTrI5ncOyNbkhDb\nlZkq3R1A3W1wkIc7QdKQkv4To+kGAW9AtQIDAQAB\n-----END RSA PUBLIC KEY-----\n',
      // A monotonically-increasing build timestamp (git commit time, seconds since
      // epoch), set by each native build workflow before `npx cap sync`. Lets
      // src/lib/otaUpdater.ts tell whether an OTA manifest is actually NEWER than
      // what's natively baked in, instead of just "different".
      version: process.env.APP_BUILD_VERSION,
    }
  }
};

export default config;
