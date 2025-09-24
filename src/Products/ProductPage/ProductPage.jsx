import "./ProductPage.css";
import { useEffect, useState } from "react";

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
