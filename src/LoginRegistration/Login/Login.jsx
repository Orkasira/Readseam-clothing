import React from "react";
import "./Login.css";
import photo from "../../assets/62bc5492a876268b6b9fc395f006a9259cafde47.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeview from "../../assets/eyeview.png";
import eyehide from "../../assets/eyehide.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations

    let valid = true;

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

    if (!valid) return;

    // request to the API

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      const res = await fetch(
        "https://api.redseam.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: formData,
        }
      );

      if (res.status === 200) {
        navigate("/ProductPage");
      } else {
        alert("Login failed. Please check your Email or password.");
      }

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // toggle password visibility

  function togglePassword() {
    setShow(!show);
  }

  return (
    <>
      <div className="login-container">
        <div className="photo-container">
          <img src={photo} alt="photo" className="photo" />
        </div>
        <form action="" className="form-container" onSubmit={handleSubmit}>
          <h1 className="login-title">Log in</h1>

          <div className="form-inputs-container">
            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder="Email or username *"
                onChange={handleChange}
                value={form.email}
              />
              {emailError && (
                <div className="validation-errors">{emailError}</div>
              )}
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password *"
                onChange={handleChange}
                value={form.password}
              />
              <span onClick={togglePassword}>
                {show ? (
                  <img src={eyeview} alt="eye" className="eye" />
                ) : (
                  <img src={eyehide} alt="eye" className="eye" />
                )}
              </span>
              {passwordError && (
                <div className="pass-validation-errors">{passwordError}</div>
              )}
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
