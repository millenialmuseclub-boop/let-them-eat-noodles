import { Link } from 'react-router-dom';

export function TopNavBar() {
  return (
    <header className="top-nav">
      <Link to="/" className="top-nav__brand">
        Let Them Eat Noodles
      </Link>
      <Link to="/my-noodles" className="top-nav__icon-link" aria-label="My Noodles">
        <span aria-hidden="true">♡</span> My Noodles
      </Link>
    </header>
  );
}
