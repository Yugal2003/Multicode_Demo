import axios from "axios";
import "./SingleProduct.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const SingleProduct = () => {
  const { id } = useParams();
  console.log(id);

  const [productData, setProductData] = useState([]);

  const fetchProduct = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products/" + id);
      console.log(res.data);
      setProductData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Generate star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.5; 
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} style={{ color: "gold", fontSize: "20px" }} />
        ))}
        {/* half stars */}
        {halfStar && <FaStarHalf style={{ color: "gold", fontSize: "20px" }} />}
        {/* empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <CiStar key={index} style={{ color: "gray", fontSize: "20px" }} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="main">
        <div className="products_h1tag">
          <h1>Products</h1>
        </div>
       
        <div style={{ display: "flex" }}>
          <div className="same_div1">
            <img className="img" src={productData.image} alt="" />
          </div>
          <div className="same_div2">
            <h2>{productData.title}</h2>
            <span>Product ID : {id}</span>

            <div>
              <div>
                {productData.rating && renderStars(productData.rating.rate)}
              </div>
              <h6>({productData.rating?.count} reviews)</h6>
            </div>

            <h3>Description</h3>
            <h4>{productData.description}</h4>
            <span className="flex">
              Price: $<h5>{productData.price}</h5>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;