import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./LoginRegistration/Login/Login.jsx";
import Registration from "./LoginRegistration/Registration/Registration.jsx";
import Header from "./LoginRegistration/Header/Header.jsx";
import ProductPage from "./Products/ProductPage/ProductPage.jsx";
import SingleProductPage from "./Products/SingleProductPage/SingleProductPage.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/ProductPage/:id" element={<SingleProductPage />} />
      </Routes>
      {/* <LoginRegistration /> */}
    </>
  );
}

export default App;
