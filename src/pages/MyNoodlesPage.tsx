import { useMyNoodles } from '../lib/useMyNoodles';
import { getDish } from '../lib/data';
import { DishTile } from '../components/DishTile';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { MyNoodlesState } from '../types/myNoodles';

const SECTIONS: { state: MyNoodlesState; label: string }[] = [
  { state: 'want-to-try', label: 'Want to Try' },
  { state: 'tried', label: 'Tried' },
  { state: 'favorite', label: 'Favorites' },
];

export function MyNoodlesPage() {
  useDocumentTitle('My Noodles');
  const entries = useMyNoodles();

  return (
    <div className="page-container">
      <span className="eyebrow">My Noodles</span>
      <h1>My Noodles</h1>
      <p className="prose" style={{ maxWidth: 560 }}>
        Local and private — nothing here leaves your device. No account required.
      </p>

      {SECTIONS.map((section) => {
        const sectionEntries = entries.filter((e) => e.states.includes(section.state));
        return (
          <div key={section.state}>
            <div className="section-heading">
              <h2>{section.label}</h2>
            </div>
            {sectionEntries.length === 0 ? (
              <p style={{ opacity: 0.6, fontSize: 14 }}>Nothing here yet.</p>
            ) : (
              <div className="grid">
                {sectionEntries.map((entry) => {
                  const dish = getDish(entry.dishId);
                  return dish ? <DishTile key={entry.dishId} dish={dish} /> : null;
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
