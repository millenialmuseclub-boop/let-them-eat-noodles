// Data-integrity check — run with: node scripts/check-data-integrity.mjs
// Compiled ad hoc via tsx-less approach: we re-implement minimal ESM loading by importing the
// TS source through Vite's dev transform isn't available here, so this script expects the data
// arrays to already be valid ESM/TS. We instead just check the .ts source text with regex-free
// structural checks by requiring ts-node-less execution via node's TS strip (Node 24 supports
// stripping types with --experimental-strip-types). Simpler: shell out to vite build output and
// inspect there isn't practical either -- instead we do a lightweight source-level check.
import { readFileSync } from 'node:fs';

function extractIds(source, idRegex) {
  const ids = new Set();
  let m;
  while ((m = idRegex.exec(source))) ids.add(m[1]);
  return ids;
}

const dishesSrc = readFileSync(new URL('../src/data/dishes.ts', import.meta.url), 'utf8');
const typesSrc = readFileSync(new URL('../src/data/noodleTypes.ts', import.meta.url), 'utf8');
const geoSrc = readFileSync(new URL('../src/data/geo.ts', import.meta.url), 'utf8');
const recipesSrc = readFileSync(new URL('../src/data/recipes.ts', import.meta.url), 'utf8');
const workshopSrc = readFileSync(new URL('../src/data/workshop.ts', import.meta.url), 'utf8');

const dishIds = [...dishesSrc.matchAll(/^\s{2}\{\s*\n\s*id: '([a-z0-9-]+)'/gm)].map((m) => m[1]);
const noodleTypeIds = [...typesSrc.matchAll(/^\s{2}\{\s*\n\s*id: '([a-z0-9-]+)'/gm)].map((m) => m[1]);
const countryIds = [...geoSrc.matchAll(/id: '([a-z0-9-]+)', regionId:/g)].map((m) => m[1]);
const placeIds = [...geoSrc.matchAll(/id: '([a-z0-9-]+)',\s*\n\s*countryId:/g)].map((m) => m[1]);
const recipeIds = [...recipesSrc.matchAll(/id: '([a-z0-9-]+)',\s*\n\s*dishId:/g)].map((m) => m[1]);
const labSlugs = [...workshopSrc.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1]);

let errors = [];

function checkDuplicates(list, label) {
  const seen = new Set();
  for (const id of list) {
    if (seen.has(id)) errors.push(`Duplicate ${label} id: ${id}`);
    seen.add(id);
  }
}
checkDuplicates(dishIds, 'dish');
checkDuplicates(noodleTypeIds, 'noodleType');
checkDuplicates(recipeIds, 'recipe');
checkDuplicates(labSlugs, 'lab slug');

// every dish references a valid noodleTypeId, countryId, recipeId
const dishBlocks = dishesSrc.split(/^\s{2}\{/m).slice(1);
for (const block of dishBlocks) {
  const idMatch = block.match(/id: '([a-z0-9-]+)'/);
  const dishId = idMatch ? idMatch[1] : '(unknown)';
  const noodleTypeMatch = block.match(/noodleTypeId: '([a-z0-9-]+)'/);
  const countryMatch = block.match(/countryId: '([a-z0-9-]+)'/);
  const recipeMatch = block.match(/recipeId: '([a-z0-9-]+)'/);
  if (noodleTypeMatch && !noodleTypeIds.includes(noodleTypeMatch[1])) {
    errors.push(`Dish ${dishId} references missing noodleTypeId ${noodleTypeMatch[1]}`);
  }
  if (countryMatch && !countryIds.includes(countryMatch[1])) {
    errors.push(`Dish ${dishId} references missing countryId ${countryMatch[1]}`);
  }
  if (recipeMatch && !recipeIds.includes(recipeMatch[1])) {
    errors.push(`Dish ${dishId} references missing recipeId ${recipeMatch[1]}`);
  }
  const relatedDishMatches = [...block.matchAll(/relatedDishIds: \[([^\]]*)\]/g)];
  for (const rm of relatedDishMatches) {
    const ids = [...rm[1].matchAll(/'([a-z0-9-]+)'/g)].map((x) => x[1]);
    for (const rid of ids) {
      if (!dishIds.includes(rid)) errors.push(`Dish ${dishId} relatedDishIds references missing dish ${rid}`);
    }
  }
}

// every noodle type used by a dish should exist (already checked), and every noodle type should be used by >=1 dish (no orphans), except intentionally standalone entries
const usedNoodleTypes = new Set([...dishesSrc.matchAll(/noodleTypeId: '([a-z0-9-]+)'/g)].map((m) => m[1]));
for (const nt of noodleTypeIds) {
  if (!usedNoodleTypes.has(nt)) errors.push(`Orphan noodle type (no dish references it): ${nt}`);
}

// every recipe has a matching dish
for (const rid of recipeIds) {
  if (!dishIds.includes(rid)) errors.push(`Recipe ${rid} has no matching dish id`);
}
for (const did of dishIds) {
  if (!recipeIds.includes(did)) errors.push(`Dish ${did} has no matching recipe`);
}

if (errors.length) {
  console.error(`Data integrity check FAILED with ${errors.length} issue(s):`);
  for (const e of errors) console.error(' -', e);
  process.exit(1);
} else {
  console.log(`Data integrity check passed. ${dishIds.length} dishes, ${noodleTypeIds.length} noodle types, ${recipeIds.length} recipes, all cross-references resolve, no duplicates, no orphans.`);
}
