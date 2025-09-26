import React, { useEffect, useState } from "react";
import arrow from "../../assets/arrow.png";
import PriceFilter from "../../assets/adjustments-horizontal.png";
import "./ProductPage.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [open, setOpen] = useState(false);

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
        setOriginalProducts(result.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    GetProduct();
  }, []);

  const handleSort = (criteria) => {
    let sortedProducts = [...originalProducts];
    if (criteria === "newest") {
      sortedProducts.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (criteria === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  return (
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
          <div className="sort-dropdown">
            <button className="sort-btn" onClick={() => setOpen((p) => !p)}>
              Sort by
              <img src={arrow} alt="arrow" />
            </button>
            {open && (
              <div className="sort-menu">
                <p className="sort-title">Sort by</p>
                <p className="sort-para" onClick={() => handleSort("newest")}>
                  New products first
                </p>
                <p
                  className="sort-para"
                  onClick={() => handleSort("priceLowToHigh")}
                >
                  Price, low to high
                </p>
                <p
                  className="sort-para"
                  onClick={() => handleSort("priceHighToLow")}
                >
                  Price, high to low
                </p>
              </div>
            )}
          </div>
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
  );
}

export default ProductPage;
