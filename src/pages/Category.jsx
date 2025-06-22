import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from "../components/Product/Product";
import "./Category.css";

function Category() {
  const [category, setCategory] = useState({});
  const { slug } = useParams();

  const getProductsByCategory = async () => {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/categories/${slug}`,
    });
    setCategory(response.data);
  };

  useEffect(() => {
    getProductsByCategory();
  }, [slug]);

  return (
    <>
      {category && (
        <>
          <header className="bg-image">
            <div className="bg-opacity py-5 d-flex align-items-center">
              <div className="container px-4 px-lg-5 my-5 ">
                <div className="text-start text-white">
                  <h1 className="display-2 fw-bolder">{category.name}</h1>
                  <p className="display-5 fs-3">{category.description}</p>
                </div>
              </div>
            </div>
          </header>
          <section className="py-5">
            <div className="px-4 px-lg-5 mt-5">
              <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center">
                {category.products &&
                  category.products.map(function (product) {
                    return (
                      <div key={product.id} className="col mb-5">
                        <Product product={product} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Category;
