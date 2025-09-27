import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SingleProductPage.css";
import cart from "../../assets/cart.png";

function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fade, setFade] = useState(false);

  // Fetch product details when component mounts or id changes

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `https://api.redseam.redberryinternship.ge/api/products/${id}`,
        { headers: { accept: "application/json" } }
      );
      const result = await res.json();
      setProduct(result);
    };
    fetchProduct();
  }, [id]);

  // Main img set

  useEffect(() => {
    if (product) setSelectedImage(product.cover_image);
  }, [product]);

  // Image fade effect

  const changeImage = (img) => {
    if (img === selectedImage) return;
    setFade(true);
    setTimeout(() => {
      setSelectedImage(img);
      setFade(false);
    }, 200);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <p className="para">Listing / Product</p>
      <div className="product-detail-wrapper">
        <div className="all-products-photos">
          {product && product.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="single-photo"
                onClick={() => changeImage(image)}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="main-photo">
          <img
            src={selectedImage}
            alt={product.name}
            className={fade ? "fade-out" : "fade-in"}
          />
        </div>
        <div className="product-detail-content">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">$ {product.price}</p>
          <p className="color-name">
            Color: {selectedColor ? selectedColor : "—"}
          </p>
          <div className="product-colors">
            {product.available_colors && product.available_colors.length > 0 ? (
              product.available_colors.map((color, index) => (
                <div
                  key={index}
                  className="color-box"
                  style={{
                    backgroundColor: color,
                    border: `3px solid ${
                      selectedColor === color ? "#4e4e4eff" : "#ccc"
                    }`,
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))
            ) : (
              <p>No colors available</p>
            )}
          </div>
          <p className="size-name">Size: {selectedSize ? selectedSize : "—"}</p>
          <div className="product-sizes">
            {product.available_sizes && product.available_sizes.length > 0 ? (
              product.available_sizes.map((size, index) => (
                <div
                  key={index}
                  className="size-box"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))
            ) : (
              <p>No sizes available</p>
            )}
          </div>
          <p className="quantity-name"> Quantity</p>
          <select name="" id="" className="quantity-select">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
            <option value="">6</option>
            <option value="">7</option>
            <option value="">8</option>
            <option value="">9</option>
            <option value="">10</option>
          </select>
          <br />
          <button className="add-to-cart-btn">
            <img src={cart} alt="" /> Add to cart
          </button>
          <hr className="hor-line" />
          <div className="product-description-container">
            <div className="details-header">
              <h2>Details</h2>
              <img src={product.brand.image} alt={product.brand.name} />
            </div>
            <p className="product-brand">Brand: {product.brand.name}</p>
            <p className="product-description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
