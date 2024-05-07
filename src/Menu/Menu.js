import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import './Menu.css'; // Make sure to create this CSS file

function Menu() {
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = () => {
    logout();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem('expirationTime');
  };

  return (
    <div className="menu-container">
      <nav className="navbar">
        <ul className="menu-items">
          <li className="menu-item">
            <Link to="/">Home</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="menu-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="menu-item">
                <Link to="/visual">Visuals</Link>
              </li>
              <li className="menu-item">
                <Link to="/login" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="menu-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="menu-item">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;