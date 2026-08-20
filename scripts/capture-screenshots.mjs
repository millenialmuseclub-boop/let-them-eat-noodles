// Deterministic screenshot pipeline (Puppeteer, not a browser-extension screenshot save --
// matching the Cookies lesson). Captures real application states against the production preview
// server (npm run preview, expected at http://localhost:4173) for both an iPhone-class and an
// iPad-class viewport, seeding localStorage where a surface needs non-empty state (My Noodles,
// Sommelier results) before capture.
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const BASE_URL = process.env.SCREENSHOT_BASE_URL ?? 'http://localhost:4173';
const OUT_DIR = 'app-store-assets';

const DEVICES = {
  iphone: { width: 428, height: 926, deviceScaleFactor: 3, label: '6.5in-iphone' }, // -> 1284x2778
  ipad: { width: 1024, height: 1366, deviceScaleFactor: 2, label: '12.9in-ipad' }, // -> 2048x2732
};

const ONLY_SLUG = process.env.SCREENSHOT_ONLY;
const ALL_SURFACES = [
  { slug: '01-main', path: '/', waitFor: 'main' },
  { slug: '02-encyclopedia', path: '/encyclopedia', waitFor: '.grid' },
  { slug: '03-dish-detail-recipe', path: '/encyclopedia/pho-bo', waitFor: '.recipe-steps' },
  { slug: '04-atlas', path: '/atlas', waitFor: '.atlas-list' },
  { slug: '05-workshop', path: '/workshop', waitFor: 'main' },
  { slug: '06-sommelier-find', path: '/sommelier', waitFor: '[aria-live="polite"]', seedSommelier: true },
  { slug: '07-twirl', path: '/twirl', waitFor: 'main' },
  { slug: '08-my-noodles', path: '/my-noodles', waitFor: 'main', seedMyNoodles: true },
];
const SURFACES = ONLY_SLUG ? ALL_SURFACES.filter((s) => s.slug === ONLY_SLUG) : ALL_SURFACES;

const MY_NOODLES_SEED = JSON.stringify([
  { dishId: 'pho-bo', states: ['favorite', 'tried'], savedAt: '2026-08-01T00:00:00.000Z' },
  { dishId: 'biang-biang-mian', states: ['tried'], savedAt: '2026-08-02T00:00:00.000Z' },
  { dishId: 'khao-soi', states: ['want-to-try'], savedAt: '2026-08-03T00:00:00.000Z' },
  { dishId: 'japchae', states: ['want-to-try', 'favorite'], savedAt: '2026-08-04T00:00:00.000Z' },
]);

async function seedLocalStorage(page, { seedMyNoodles }) {
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle0' });
  if (seedMyNoodles) {
    await page.evaluate((seed) => {
      window.localStorage.setItem('let-them-eat-noodles:my-noodles:v1', seed);
    }, MY_NOODLES_SEED);
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: true });

  for (const [deviceKey, device] of Object.entries(DEVICES)) {
    const page = await browser.newPage();
    await page.setViewport({
      width: device.width,
      height: device.height,
      deviceScaleFactor: device.deviceScaleFactor,
    });

    for (const surface of SURFACES) {
      await seedLocalStorage(page, surface);
      await page.goto(BASE_URL + surface.path, { waitUntil: 'networkidle0' });

      if (surface.seedSommelier) {
        // Move a slider and toggle a tag so results render non-empty, deterministic content.
        await page.evaluate(() => {
          const range = document.querySelector('input[type="range"]');
          if (range) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            setter.call(range, '5');
            range.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
        await page.waitForSelector('.card', { timeout: 5000 }).catch(() => {});
        // Scroll so the "Try These" results are actually in frame rather than below the fold --
        // this is the whole point of the Sommelier screenshot, so composition matters here.
        await page.evaluate(() => {
          const heading = [...document.querySelectorAll('h2')].find((h) => h.textContent.includes('Try These'));
          heading?.scrollIntoView({ block: 'start' });
        });
        await new Promise((r) => setTimeout(r, 150));
      }

      await page.waitForSelector(surface.waitFor, { timeout: 8000 }).catch(() => {});
      // Let fonts/images settle.
      await new Promise((r) => setTimeout(r, 400));

      const fileName = `${OUT_DIR}/${deviceKey}-${surface.slug}.png`;
      await page.screenshot({ path: fileName, fullPage: false });
      console.log(`captured ${fileName} (${device.width * device.deviceScaleFactor}x${device.height * device.deviceScaleFactor})`);
    }

    await page.close();
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
