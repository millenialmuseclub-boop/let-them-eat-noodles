import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { dishes, countries } from '../lib/data';
import { DishTile } from '../components/DishTile';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { PreparationStyle } from '../types/noodle';

const PREP_STYLES: PreparationStyle[] = ['soup', 'dry-sauced', 'stir-fried', 'chilled', 'dressed'];

export function EncyclopediaIndexPage() {
  useDocumentTitle('Encyclopedia');
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [prepFilter, setPrepFilter] = useState<PreparationStyle | null>(null);

  const filtered = useMemo(() => {
    return dishes
      .filter((d) => !countryFilter || d.place.countryId === countryFilter)
      .filter((d) => !prepFilter || d.preparationStyle === prepFilter)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [countryFilter, prepFilter]);

  return (
    <div className="page-container">
      <span className="eyebrow">Encyclopedia</span>
      <h1>The Noodle Encyclopedia</h1>
      <p className="prose" style={{ maxWidth: 560 }}>
        Every canonical dish, browsable by region and by how it's prepared. All browsing here
        resolves to a canonical detail page.
      </p>

      <div className="section-heading">
        <h2>By Region</h2>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} role="group" aria-label="Filter by country">
        <button type="button" className="chip" aria-pressed={countryFilter === null} onClick={() => setCountryFilter(null)}>
          All
        </button>
        {countries.map((c) => (
          <button
            key={c.id}
            type="button"
            className="chip"
            aria-pressed={countryFilter === c.id}
            onClick={() => setCountryFilter(c.id === countryFilter ? null : c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="section-heading">
        <h2>By Preparation</h2>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} role="group" aria-label="Filter by preparation style">
        <button type="button" className="chip" aria-pressed={prepFilter === null} onClick={() => setPrepFilter(null)}>
          All
        </button>
        {PREP_STYLES.map((style) => (
          <button
            key={style}
            type="button"
            className="chip"
            aria-pressed={prepFilter === style}
            onClick={() => setPrepFilter(style === prepFilter ? null : style)}
          >
            {style.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="section-heading">
        <h2>
          {filtered.length} Dish{filtered.length === 1 ? '' : 'es'}
        </h2>
        <Link to="/encyclopedia/noodle-types">Browse by noodle type →</Link>
      </div>
      <div className="grid" aria-live="polite">
        {filtered.map((dish) => (
          <DishTile key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}
