import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "./Home.css";
import ProductItem from "../components/Product/Product";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/featured-products`,
    });
    setProducts(response.data);
  };

  return (
    <>
      <Carousel controls={false}>
        <Carousel.Item className="w-100">
          <div className="d-block w-100">
            <img
              className="slide w-100 img-fluid slide"
              // src="https://images.unsplash.com/photo-1615332579037-3c44b3660b53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              src="../../assets/carousel/carousel-crafters.jpg"
              alt=""
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid slide"
            src="https://cdn.pixabay.com/photo/2017/07/24/21/35/beer-2536111_960_720.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid slide"
            src="../../assets/carousel/certification-brewery-1170x660.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <section className="py-5">
        <div className="px-4 px-lg-5 mt-3">
          <p className="display-6 fw-bold py-3 mb-5">Featured products</p>
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center">
            {/* <div className="card h-100"> */}
            {products &&
              products.map((product) => (
                <div key={product.id} className="col mb-5">
                  <ProductItem product={product} />
                </div>
              ))}
            {/* </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
