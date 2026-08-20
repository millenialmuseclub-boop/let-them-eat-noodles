import { Link } from 'react-router-dom';
import type { NoodleDish } from '../types/noodle';
import { getPlaceLabel } from '../lib/data';
import { PhotoFrame } from './PhotoFrame';

export function DishTile({ dish }: { dish: NoodleDish }) {
  return (
    <Link to={`/encyclopedia/${dish.id}`} className="tile">
      <PhotoFrame subjectId={dish.id} fallbackLabel={dish.name} variant="tile" />
      <div className="tile__scrim" />
      <div className="tile__label">
        <span className="kicker">{getPlaceLabel(dish.place)}</span>
        <strong>{dish.name}</strong>
      </div>
    </Link>
  );
}
