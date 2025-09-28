import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./LoginRegistration/Login/Login.jsx";
import Registration from "./LoginRegistration/Registration/Registration.jsx";
import Header from "./LoginRegistration/Header/Header.jsx";
import ProductPage from "./Products/ProductPage/ProductPage.jsx";
import SingleProductPage from "./Products/SingleProductPage/SingleProductPage.jsx";
import Checkout from "./Products/Checkout/Checkout.jsx";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <>
      <Header user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
      <Routes>
        <Route path="/" element={<Login onLogin={setLoggedInUser} />} />
        <Route
          path="/Registration"
          element={<Registration onRegister={setLoggedInUser} />}
        />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/ProductPage/:id" element={<SingleProductPage />} />
        <Route path="/Checkout" element={<Checkout />}></Route>
      </Routes>
    </>
  );
}

export default App;
