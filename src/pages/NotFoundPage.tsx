import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="page-container">
      <h1>Page not found</h1>
      <Link to="/">← Back to Discover</Link>
    </div>
  );
}
