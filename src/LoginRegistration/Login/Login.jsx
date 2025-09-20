import "./Login.css";
import photo from "../../assets/62bc5492a876268b6b9fc395f006a9259cafde47.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeview from "../../assets/eyeview.png";
import eyehide from "../../assets/eyehide.png";

function Login() {
  const [show, setShow] = useState(false);

  function togglePassword() {
    setShow(!show);
  }

  return (
    <>
      <div className="login-container">
        <div className="photo-container">
          <img src={photo} alt="photo" className="photo" />
        </div>
        <form action="" className="form-container">
          <h1 className="login-title">Log in</h1>

          <div className="form-inputs-container">
            <div className="input-container">
              <input type="text" placeholder="Email or username *" />
              <input
                type={show ? "text" : "password"}
                placeholder="Password *"
              />
              <span onClick={togglePassword}>
                {show ? (
                  <img src={eyeview} alt="eye" className="eye" />
                ) : (
                  <img src={eyehide} alt="eye" className="eye" />
                )}
              </span>
            </div>

            <button className="login-btn">Log in</button>

            <p className="register-link-container">
              Not a member?{" "}
              <Link to="/Registration" className="register-link-content">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
