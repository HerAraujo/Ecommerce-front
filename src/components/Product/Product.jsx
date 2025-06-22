import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Product.css";
import { toast } from "react-toastify";

function Product({ product }) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const addToCart = () => {
    const productToStore = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      stock: product.stock,
    };

    dispatch({
      type: "ADD_ITEM",
      payload: productToStore,
    });

    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "success",
    });
  };

  const handleClick = () => {
    if (!store.cart.find((item) => item.id === product.id)) {
      if (product.stock === 0) {
        toast.error("Out of stock", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      } else {
        addToCart();
        return;
      }
    }

    store.cart.find((item) => item.id === product.id) &&
    store.cart.find((item) => item.id === product.id).stock -
      store.cart.find((item) => item.id === product.id).quantity >
      0
      ? addToCart()
      : toast.error("Out of stock", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  return (
    <>
      {product.images.length > 0 ? (
        <Link key={product.id} to={`/product/${product.slug}`} className="product-link">
          <img
            id="related-product-image"
            className="mb-2"
            src={`${process.env.REACT_APP_BUCKET_URL}/${product.images[0].name}`}
            alt={product.images[0].title}
          />
        </Link>
      ) : (
        <Link key={product.id} to={`/product/${product.slug}`} className="product-link">
          <img
            id="related-product-image"
            className="mb-2"
            src={`${process.env.REACT_APP_BUCKET_URL}/no-photo-available.png`}
            alt={product.name}
          />
        </Link>
      )}

      <div className="mt-2 product-text-color">
        <div className="text-start">
          <Link key={product.id} to={`/product/${product.slug}`} className="product-link">
            <h5 className="fw-bolder">{product.name}</h5>
          </Link>
          {Number(product.categoryId) === 1 && (
            <div className="d-flex justify-content-start small text-warning mb-2">
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star"></div>
              <span style={{ color: "#795548" }} className="ms-2">
                {`${Math.round(Math.random() * (5000 - 500) + 500)} reviews`}
              </span>
            </div>
          )}
          {Number(product.categoryId) === 2 && (
            <div className="d-flex justify-content-start small text-warning mb-2">
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-half"></div>
              <div className="bi-star"> </div>
              <span style={{ color: "#795548" }} className="ms-2">
                {`${Math.round(Math.random() * (5000 - 500) + 500)} reviews`}
              </span>
            </div>
          )}
          {Number(product.categoryId) === 3 && (
            <div className="d-flex justify-content-start small text-warning mb-2">
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <span style={{ color: "#795548" }} className="ms-2">
                {`${Math.round(Math.random() * (5000 - 500) + 500)} reviews`}
              </span>
            </div>
          )}
          {Number(product.categoryId) >= 4 && (
            <div className="d-flex justify-content-start small text-warning mb-2">
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-fill"></div>
              <div className="bi-star-half"></div>
              <span style={{ color: "#795548" }} className="ms-2">
                {`${Math.round(Math.random() * (5000 - 500) + 500)} reviews`}
              </span>
            </div>
          )}

          <span>U$S {product.price}</span>
          <span className="text-decoration-line-through ms-4">
            U$S {(product.price * 1.25).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="pt-0 border-top-0 bg-transparent">
        <div className="mt-2 mb-3 text-start product-text-color">
          <button className="btn btn-product-add-cart" onClick={() => handleClick()}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
