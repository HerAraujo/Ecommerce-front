import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductItem from "../../components/Product/Product";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import { toast } from "react-toastify";

function Product() {
  const [mainProduct, setMainProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const navigate = useNavigate();

  const addToCart = () => {
    const productToStore = {
      id: mainProduct.id,
      name: mainProduct.name,
      price: mainProduct.price,
      images: mainProduct.images,
      stock: mainProduct.stock,
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

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}/products/${params.slug}`,
        });

        setMainProduct(response.data);
      } catch (err) {
        err.response.status === 404 && navigate("../*");
      }
    };

    getProduct();
  }, []);

  /* TO DO: CHANGE MAIN PRODUCT WHEN CLICK IMAGE PRODUCT COMPONENT*/
  // useEffect(() => {
  //   try {
  //     const getRelatedProducts = async () => {
  //       try {
  //         const response = await axios({
  //           method: "GET",
  //           url: `${process.env.REACT_APP_API_URL}/products/${mainProduct.categoryId}/category`,
  //         });
  //         setRelatedProducts(response.data.filter((product) => product.slug !== mainProduct.slug));
  //       } catch (err) {}
  //     };

  //     if (mainProduct) getRelatedProducts();
  //   } catch (err) {}
  // }, [mainProduct]);

  const handleClick = () => {
    if (!store.cart.find((item) => item.id === mainProduct.id)) {
      if (mainProduct.stock === 0) {
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

    store.cart.find((item) => item.id === mainProduct.id) &&
    store.cart.find((item) => item.id === mainProduct.id).stock -
      store.cart.find((item) => item.id === mainProduct.id).quantity >
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

  return (
    <main className="flex-shrink-0 text-start">
      {mainProduct && (
        <section id="mainSection" className="py-3">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-xl-6">
                <Carousel controls={false}>
                  {mainProduct.images.length > 0 ? (
                    mainProduct.images.map((image) => (
                      <Carousel.Item key={image.name} className="w-100">
                        <div className="d-block w-100">
                          <img
                            className="slide w-100 img-fluid"
                            src={`${process.env.REACT_APP_BUCKET_URL}/${image.name}`}
                            alt={image.title}
                          />
                        </div>
                      </Carousel.Item>
                    ))
                  ) : (
                    <img
                      className="slide w-100 img-fluid slide"
                      src={`${process.env.REACT_APP_BUCKET_URL}/no-photo-available.png`}
                      alt={mainProduct.name}
                    />
                  )}
                </Carousel>
              </div>
              <div className="col-xl-6">
                <p className="display-5 fw-bold">{mainProduct.name}</p>
                <div className="fs-5 mt-2 mb-2">
                  {Number(mainProduct.categoryId) === 1 && (
                    <div className="d-flex justify-content-start small text-warning mb-2">
                      <span style={{ color: "#795548" }} className="me-2">
                        Reviews:
                      </span>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star"></div>
                    </div>
                  )}
                  {Number(mainProduct.categoryId) === 2 && (
                    <div className="d-flex justify-content-start small text-warning mb-2">
                      <span style={{ color: "#795548" }} className="me-2">
                        Reviews:
                      </span>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-half"></div>
                      <div className="bi-star"></div>
                    </div>
                  )}
                  {Number(mainProduct.categoryId) === 3 && (
                    <div className="d-flex justify-content-start small text-warning mb-2">
                      <span style={{ color: "#795548" }} className="me-2">
                        Reviews:
                      </span>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                    </div>
                  )}
                  {Number(mainProduct.categoryId) >= 4 && (
                    <div className="d-flex justify-content-start small text-warning mb-2">
                      <span style={{ color: "#795548" }} className="me-2">
                        Reviews:
                      </span>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-fill"></div>
                      <div className="bi-star-half"></div>
                    </div>
                  )}

                  <span>U$S {mainProduct.price}</span>
                  <span className="text-decoration-line-through ms-4">
                    U$S {(mainProduct.price * 1.25).toFixed(2)}
                  </span>
                </div>
                <p className="lead text-start">{mainProduct.description}</p>
                <div className="d-flex justify-content-start mt-5">
                  <button
                    className="btn btn-product-page flex-shrink-0"
                    onClick={() => handleClick()}
                  >
                    <i className="bi-cart-fill me-1"></i>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {relatedProducts && relatedProducts.length > 0 && (
        <>
          <hr />
          <section className="py-2">
            <div className="px-4 px-lg-5">
              <p className="display-6 fw-bold mb-5 py-3 text-center">Related products</p>
              <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center">
                {relatedProducts &&
                  relatedProducts.map((product) => (
                    <div key={product.id} className="col-md-6 mb-5">
                      <ProductItem product={product} />{" "}
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Product;
