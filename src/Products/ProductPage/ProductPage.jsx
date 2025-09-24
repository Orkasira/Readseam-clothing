import "./ProductPage.css";
import React, { useEffect, useState } from "react";
import PriceFilter from "../../assets/adjustments-horizontal.png";

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const GetProduct = async () => {
      try {
        const res = await fetch(
          "https://api.redseam.redberryinternship.ge/api/products",
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        const result = await res.json();
        setProducts(result.data);
        console.log(result);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    GetProduct();
  }, []);

  return (
    <>
      <div className="product-page-container">
        <div className="filter">
          <h1 className="title">Products</h1>
          <div className="filter-options">
            <p className="showing-pages">Showing 1–10 of 100 results</p>
            <span className="hor-line"></span>
            <div className="price-filter">
              <img src={PriceFilter} alt="Price filter logo" />
              <p>Filter</p>
            </div>
            <select name="" id="" className="sort-by">
              <option>Sort by</option>
              <option>New products first</option>
              <option>Price, low to high</option>
              <option>Price, high to low</option>
            </select>
          </div>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.cover_image}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
