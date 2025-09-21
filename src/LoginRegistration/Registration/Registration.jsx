import "./Registration.css";
import photo from "../../assets/62bc5492a876268b6b9fc395f006a9259cafde47.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeview from "../../assets/eyeview.png";
import eyehide from "../../assets/eyehide.png";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // handle input change

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // registration request

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("password_confirmation", form.password_confirmation);
      const res = await fetch(
        "https://api.redseam.redberryinternship.ge/api/register",
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Response:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // toggle password visibility

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
        <form className="form-container" onSubmit={handleSubmit}>
          <h1 className="registration-title">Registration</h1>

          <div className="form-inputs-container">
            <div className="input-container">
              <input
                type="text"
                name="username"
                placeholder="username *"
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email *"
                onChange={handleChange}
              />
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password *"
                  onChange={handleChange}
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
                  name="password_confirmation"
                  placeholder="Confirm Password *"
                  onChange={handleChange}
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

            <button type="submit" className="registration-btn">
              Log in
            </button>

            <p className="register-link-container">
              Already member?{" "}
              <Link to="/" className="register-link-content">
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
