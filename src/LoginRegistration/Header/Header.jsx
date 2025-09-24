import "./Header.css";
import logo from "../../assets/Vector.png";
import user from "../../assets/Union.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>RedSeam Clothing</h1>
        </div>
        <Link to="/" className="login-link">
            <div className="login">
              <img src={user} alt="user logo" />
              <h2>Log in</h2>
            </div>
        </Link>
      </header>
    </>
  );
}

export default Header;
