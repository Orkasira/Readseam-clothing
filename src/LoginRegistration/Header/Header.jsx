import "./Header.css";
import logo from "../../assets/vector.png";
import user from "../../assets/union.png";

function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>RedSeam Clothing</h1>
        </div>
        <div className="login">
          <img src={user} alt="user logo" />
          <h2>Log in</h2>
        </div>
      </header>
    </>
  );
}

export default Header;
