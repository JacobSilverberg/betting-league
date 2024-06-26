import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container">
        <div className="links">
          <Link className="link" to="">
            <h6>League Home</h6>
          </Link>
          <Link className="link" to="picksheet">
            <h6>Picksheet</h6>
          </Link>
          <Link className="link" to="standings">
            <h6>League Standings</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
