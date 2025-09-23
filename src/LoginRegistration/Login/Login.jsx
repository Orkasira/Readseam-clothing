import "./Login.css";
import photo from "../../assets/62bc5492a876268b6b9fc395f006a9259cafde47.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeview from "../../assets/eyeview.png";
import eyehide from "../../assets/eyehide.png";

function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // request to the API

    try {
      const formData = new FormData();
      // Only send username/email and password for login
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
                type="text"
                name="email"
                placeholder="Email or username *"
                onChange={handleChange}
              />
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password *"
                onChange={handleChange}
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
