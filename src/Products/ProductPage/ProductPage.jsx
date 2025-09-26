import React, { useEffect, useState, useRef } from "react";
import arrow from "../../assets/arrow.png";
import PriceFilter from "../../assets/adjustments-horizontal.png";
import "./ProductPage.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  const sortRef = useRef(null);
  const priceRef = useRef(null);

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

  // Sorting function

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

  // Price filtering function

  const handlePriceFilter = () => {
    const min = from ? Number(from) : 0;
    const max = to ? Number(to) : Infinity;

    const filtered = originalProducts.filter((product) => {
      const price = Number(product.price);
      return price >= min && price <= max;
    });

    setProducts(filtered);
    setPriceOpen(false);

    // აქ ჩაიწერება აქტიური ფილტრი, რომ ტეგი გამოჩნდეს
    setActiveFilter({ from: min, to: max === Infinity ? null : max });
  };

  // Close dropdowns when clicking outside

  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(e.target)) {
        setPriceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="product-page-container">
      <div className="filter">
        <h1 className="title">Products</h1>
        <div className="filter-options">
          <p className="showing-pages">Showing 1–10 of 100 results</p>
          <span className="hor-line"></span>
          <div className="price-filter" ref={priceRef}>
            <img
              src={PriceFilter}
              alt="Price filter logo"
              onClick={() => setPriceOpen((p) => !p)}
            />
            <p onClick={() => setPriceOpen((p) => !p)}>Filter</p>
            {priceOpen && (
              <div className="price-filter-popup">
                <p className="price-title">Select price</p>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="From *"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="To *"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
                <button className="apply-btn" onClick={handlePriceFilter}>
                  Apply
                </button>
              </div>
            )}
          </div>
          <div className="sort-dropdown" ref={sortRef}>
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
      {activeFilter && (
        <div className="active-filters">
          <div className="filter-tag">
            Price: {activeFilter.from}–{activeFilter.to || "∞"}
            <span
              className="close-btn"
              onClick={() => {
                setActiveFilter(null);
                setFrom("");
                setTo("");
                setProducts(originalProducts);
              }}
            >
              ×
            </span>
          </div>
        </div>
      )}
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
