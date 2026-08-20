import { Link } from 'react-router-dom';
import { twirlStories, vocabulary } from '../data/twirl';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function TwirlPage() {
  useDocumentTitle('Twirl');
  return (
    <div className="page-container">
      <span className="eyebrow">Twirl</span>
      <h1>A Small Noodle Culture Magazine</h1>
      <p className="prose" style={{ maxWidth: 560 }}>
        How the world eats noodles — technique stories, vocabulary, and the culture behind the bowl.
      </p>

      <div className="section-heading">
        <h2>Editorial Stories</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {twirlStories.map((story) => (
          <Link key={story.slug} to={`/twirl/${story.slug}`} className="card" style={{ display: 'block' }}>
            <h3 style={{ marginBottom: 4 }}>{story.title}</h3>
            <p style={{ margin: 0, fontSize: 14, opacity: 0.75 }}>{story.dek}</p>
          </Link>
        ))}
      </div>

      <div className="section-heading">
        <h2>Vocabulary</h2>
      </div>
      <dl style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: 0 }}>
        {vocabulary.map((term) => (
          <div key={term.term} style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
            <dt style={{ fontWeight: 700 }}>
              {term.term} {term.localScript && <span style={{ opacity: 0.6, fontWeight: 400 }}>{term.localScript}</span>}
            </dt>
            <dd style={{ margin: '2px 0 0' }}>{term.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
