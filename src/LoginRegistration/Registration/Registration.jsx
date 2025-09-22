import "./Registration.css";
import photo from "../../assets/62bc5492a876268b6b9fc395f006a9259cafde47.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeview from "../../assets/eyeview.png";
import eyehide from "../../assets/eyehide.png";

function Registration() {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
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

  // registration request // registration request //

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // validations

    if (form.username.trim().length < 3) {
      setUsernameError("Username must be at least 3 characters");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!form.email.includes("@")) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (form.password.length < 3) {
      setPasswordError("Password must be at least 3 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (form.password !== form.password_confirmation) {
      setConfirmError("Passwords do not match");
      valid = false;
    } else {
      setConfirmError("");
    }

    if (!valid) return;

    // request to the API

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

      // Check for duplicate username/email error from API

      let hasError = false;
      if (data.errors && data.errors.username) {
        setUsernameError("Username is already taken");
        hasError = true;
      }
      if (data.errors && data.errors.email) {
        setEmailError("Email is already taken");
        hasError = true;
      }
      if (hasError) return;

      console.log("Response:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // registation request end here // registation request end here //

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
                value={form.username}
              />
              {usernameError && (
                <div className="validation-errors">{usernameError}</div>
              )}
              <input
                type="text"
                name="email"
                placeholder="Email *"
                onChange={handleChange}
                value={form.email}
              />
              {emailError && (
                <div className="validation-errors">{emailError}</div>
              )}
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password *"
                  onChange={handleChange}
                  value={form.password}
                />
                <span onClick={togglePassword}>
                  {showPassword ? (
                    <img src={eyeview} alt="eye" className="eye" />
                  ) : (
                    <img src={eyehide} alt="eye" className="eye" />
                  )}
                </span>
                {passwordError && (
                  <div className="pass-validation-errors">{passwordError}</div>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Confirm Password *"
                  onChange={handleChange}
                  value={form.password_confirmation}
                />
                <span onClick={toggleConfirm}>
                  {showConfirm ? (
                    <img src={eyeview} alt="eye" className="eye" />
                  ) : (
                    <img src={eyehide} alt="eye" className="eye" />
                  )}
                </span>
                {confirmError && (
                  <div className="pass-validation-errors">{confirmError}</div>
                )}
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
