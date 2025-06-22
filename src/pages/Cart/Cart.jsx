import "./Cart.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Cart() {
  const cartStore = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    cartStore.map((item) => {
      let price = item.price * item.quantity;
      return (totalPrice = totalPrice + price);
    });
    setTotal(totalPrice);
  }, [cartStore]);

  useEffect(() => {
    let totalQuantity = 0;
    cartStore.map((item) => {
      let quantity = item.quantity;
      return (totalQuantity = totalQuantity + quantity);
    });
    setTotalQuantity(totalQuantity);
  }, [cartStore]);

  const addToCart = (product) => {
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

  const handleClick = (product) => {
    if (!cartStore.find((item) => item.id === product.id)) {
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
        addToCart(product);
        return;
      }
    }

    cartStore.find((item) => item.id === product.id) &&
    cartStore.find((item) => item.id === product.id).stock -
      cartStore.find((item) => item.id === product.id).quantity >
      0
      ? addToCart(product)
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
    <section className="h-custom text-start">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h4 className="fw-bold mb-0">Shopping cart</h4>
                        <h6 className="mb-0 ">{cartStore && cartStore.length} items</h6>
                      </div>
                      <hr className="my-4" />
                      {cartStore &&
                        cartStore.map((item) => (
                          <div
                            key={item.id}
                            className="row mb-4 d-flex justify-content-between align-items-center"
                          >
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              {item.images.length > 0 ? (
                                <img
                                  src={`${process.env.REACT_APP_BUCKET_URL}/${item.images[0].name}`}
                                  className="img-thumbnail"
                                  alt={item.name}
                                />
                              ) : (
                                <img
                                  src={`${process.env.REACT_APP_BUCKET_URL}/no-photo-available.png`}
                                  alt={item.name}
                                  className="img-thumbnail"
                                />
                              )}
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="">{item.name}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "REDUCE_QUANTITY",
                                    payload: item,
                                  })
                                }
                                className="btn custom-btn-quantity px-2"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <span className="d-flex align-items-center fs-5 custom-btn-quantity px-2">
                                {item.quantity}
                              </span>

                              <button className="btn custom-btn-quantity px-2">
                                <i onClick={() => handleClick(item)} className="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3 offset-lg-1">
                              <h6 className="mb-0">U$S{(item.price * item.quantity).toFixed(2)}</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <i
                                className="fas fa-times"
                                onClick={() =>
                                  dispatch({
                                    type: "REMOVE_ITEM",
                                    payload: item,
                                  })
                                }
                              ></i>
                            </div>
                          </div>
                        ))}
                      <hr className="my-4" />

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <Link to="/" className="back">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="p-5">
                      <h4 className="fw-bold mb-5 mt-2 pt-1">Summary</h4>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h6>Items {totalQuantity}</h6>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h6>Total price</h6>
                        <h6>U$S {total.toFixed(2)}</h6>
                      </div>
                      <Link to={"/checkout"}>
                        <button
                          type="button"
                          className="btn btn-cart-page btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                        >
                          Checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Cart;
