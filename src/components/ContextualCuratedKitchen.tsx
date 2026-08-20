import { products } from '../data/products';

/** Surfaces Curated Kitchen products relevant to a given Workshop lab or dish context.
    Only renders products with an 'active' route status — 'needs-verification' items never
    render as clickable, matching the family safety gate. */
export function ContextualCuratedKitchen({ context }: { context: string }) {
  const relevant = products.filter((p) => p.contexts?.includes(context) && p.route.status === 'active');
  if (relevant.length === 0) return null;

  return (
    <div className="card" style={{ marginTop: 20 }}>
      <span className="eyebrow">From the Kitchen</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {relevant.map((product) => (
          <a
            key={product.id}
            href={product.route.url}
            target="_blank"
            rel="noreferrer sponsored"
            style={{ fontWeight: 600 }}
          >
            {product.name} →
          </a>
        ))}
      </div>
    </div>
  );
}
