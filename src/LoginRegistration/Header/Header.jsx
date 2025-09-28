import "./Header.css";
import logo from "../../assets/Vector.png";
import defaultUser from "../../assets/defaultphoto.jpg";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow.png";
import { useState } from "react";

function Header({ user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <header>
      {user ? (
        <Link to="/ProductPage" className="logo">
          <img src={logo} alt="logo" />
          <h1>RedSeam Clothing</h1>
        </Link>
      ) : (
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>RedSeam Clothing</h1>
        </div>
      )}

      <div className="login">
        {user ? (
          <div className="user-container">
            <img
              src={user.photo || defaultUser}
              alt="user photo"
              className="user-photo"
            />
            <img
              src={arrow}
              alt="arrow"
              className="arrow-icon"
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
            />
            {showDropdown && (
              <div className="dropdown">
                <p>{user.username}</p>
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/" className="login-link">
            <h2>Log in</h2>
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;
