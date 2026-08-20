import { products } from '../data/products';
import { AffiliateDisclosure } from '../components/AffiliateDisclosure';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { AffiliateProduct } from '../types/product';

const CATEGORY_LABELS: Record<AffiliateProduct['category'], string> = {
  bowls: 'Bowls & Tableware',
  'chopsticks-spoons': 'Chopsticks & Spoons',
  serving: 'Serving',
  cookware: 'Cookware',
  'noodle-making-equipment': 'Noodle-Making Equipment',
  'prep-tools': 'Prep Tools',
  storage: 'Storage',
  pantry: 'Pantry',
  'books-gifts': 'Books & Gifts',
};

export function CuratedKitchenPage() {
  useDocumentTitle('Curated Kitchen');
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="page-container">
      <span className="eyebrow">Curated Kitchen</span>
      <h1>Curated Kitchen</h1>
      <p className="prose" style={{ maxWidth: 560 }}>
        Reused and verified from the Let Them Eat family's affiliate catalog — bowls, hand-noodle
        tools, and broth essentials that translate directly to noodle cooking.
      </p>
      <AffiliateDisclosure />

      {categories.map((category) => (
        <div key={category}>
          <div className="section-heading">
            <h2>{CATEGORY_LABELS[category]}</h2>
          </div>
          <div className="grid">
            {products
              .filter((p) => p.category === category)
              .map((product) => (
                <a
                  key={product.id}
                  href={product.route.status === 'active' ? product.route.url : undefined}
                  target="_blank"
                  rel="noreferrer sponsored"
                  className="card"
                  style={{ display: 'block', opacity: product.route.status === 'active' ? 1 : 0.6 }}
                >
                  <h3 style={{ fontSize: 15, marginBottom: 4 }}>{product.name}</h3>
                  <p style={{ margin: 0, fontSize: 13, opacity: 0.75 }}>{product.description}</p>
                  {product.route.status !== 'active' && (
                    <span className="chip" style={{ marginTop: 8 }}>
                      Coming Soon
                    </span>
                  )}
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
