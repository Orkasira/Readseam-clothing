import "./Registration.css";
import photo from "../../assets/62bc5492a876268b6b9fc395f006a9259cafde47.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeview from "../../assets/eyeview.png";
import eyehide from "../../assets/eyehide.png";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }
  function toggleConfirm() {
    setShowConfirm((prev) => !prev);
  }

  return (
    <>
      <div className="registration-container">
        <div className="photo-container">
          <img src={photo} alt="photo" className="photo" />
        </div>
        <form action="" className="form-container">
          <h1 className="registration-title">Registration</h1>

          <div className="form-inputs-container">
            <div className="input-container">
              <input type="text" placeholder="username *" />
              <input type="text" placeholder="Email *" />
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                />
                <span onClick={togglePassword}>
                  {showPassword ? (
                    <img src={eyeview} alt="eye" className="eye" />
                  ) : (
                    <img src={eyehide} alt="eye" className="eye" />
                  )}
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password *"
                />
                <span onClick={toggleConfirm}>
                  {showConfirm ? (
                    <img src={eyeview} alt="eye" className="eye" />
                  ) : (
                    <img src={eyehide} alt="eye" className="eye" />
                  )}
                </span>
              </div>
            </div>

            <button className="registration-btn">Log in</button>

            <p className="register-link-container">
              Already member?{" "}
              <Link to="/Login" className="register-link-content">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
