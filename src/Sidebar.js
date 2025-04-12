import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>AstroDash</h2>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/">Search</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
