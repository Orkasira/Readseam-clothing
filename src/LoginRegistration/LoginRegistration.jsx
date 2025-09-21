import Header from "./Header/Header.jsx";
import Login from "./Login/Login.jsx";
import Registration from "./Registration/Registration.jsx";
import { Route, Routes } from "react-router";

function LoginRegistration() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default LoginRegistration;
