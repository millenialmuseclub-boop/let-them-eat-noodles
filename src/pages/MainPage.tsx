import { Link } from 'react-router-dom';
import { dishes, noodleTypes, regions } from '../lib/data';
import { DishTile } from '../components/DishTile';
import { PhotoFrame } from '../components/PhotoFrame';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const noodleOfTheDay = dishes[new Date().getDate() % dishes.length];

export function MainPage() {
  useDocumentTitle('Discover');

  return (
    <div className="page-container">
      <div className="hero-bleed">
        <PhotoFrame subjectId={noodleOfTheDay.id} fallbackLabel={noodleOfTheDay.name} variant="hero" />
        <div className="hero-bleed__scrim" />
        <div className="hero-bleed__content">
          <span className="eyebrow">Noodle of the Day</span>
          <h1>{noodleOfTheDay.name}</h1>
          <Link to={`/encyclopedia/${noodleOfTheDay.id}`} className="btn btn-primary" style={{ marginTop: 8 }}>
            Explore this dish
          </Link>
        </div>
      </div>

      <p className="prose" style={{ maxWidth: 560 }}>
        A world of noodles — pulled, cut, rolled, stretched, and slurped across cultures. Explore
        how a single idea takes a different shape in every kitchen it passes through.
      </p>

      <div className="section-heading">
        <h2>Explore the Encyclopedia</h2>
        <Link to="/encyclopedia">Browse all →</Link>
      </div>
      <div className="grid">
        {dishes.slice(0, 8).map((dish) => (
          <DishTile key={dish.id} dish={dish} />
        ))}
      </div>

      <div className="section-heading">
        <h2>Explore the Atlas</h2>
        <Link to="/atlas">Browse by origin →</Link>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {regions.map((region) => (
          <Link key={region.id} to="/atlas" className="chip">
            {region.name}
          </Link>
        ))}
      </div>

      <div className="section-heading">
        <h2>Featured Traditions</h2>
      </div>
      <div className="grid">
        {noodleTypes.slice(0, 6).map((type) => (
          <Link key={type.id} to={`/encyclopedia/type/${type.id}`} className="tile">
            <PhotoFrame subjectId={type.id} fallbackLabel={type.name} variant="tile" fallbackEmoji="🍥" />
            <div className="tile__scrim" />
            <div className="tile__label">
              <span className="kicker">{type.base.replace('-', ' ')}</span>
              <strong>{type.name}</strong>
            </div>
          </Link>
        ))}
      </div>

      <hr className="divider" />

      <div className="section-heading">
        <h2>Curated Kitchen</h2>
        <Link to="/curated-kitchen">Shop the essentials →</Link>
      </div>
      <p className="prose">Bowls, hand-noodle tools, and broth essentials, reused from the family's verified affiliate catalog.</p>
    </div>
  );
}
