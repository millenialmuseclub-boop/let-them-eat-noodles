import { NavLink } from 'react-router-dom';
import { hubs } from '../data/hubs';

export function BottomTabBar() {
  return (
    <nav className="bottom-tab-bar" aria-label="Primary">
      {hubs.map((hub) => (
        <NavLink
          key={hub.id}
          to={hub.path}
          end={hub.path === '/'}
          className="bottom-tab-item"
          aria-label={hub.navLabel}
        >
          <span className="bottom-tab-item__icon" aria-hidden="true">
            {hub.icon}
          </span>
          <span>{hub.navLabel}</span>
        </NavLink>
      ))}
    </nav>
  );
}
