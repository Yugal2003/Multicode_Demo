import axios from "axios";
import "./Home.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [productData, setProductData] = useState([]);

  const fetchAPI = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      console.log(res.data);
      setProductData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // pagination logic

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const perPageProducts = productData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(productData.length / rowsPerPage);

  const paginate = (page) => setCurrentPage(page);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value)); 
    setCurrentPage(1); 
  };

  return (
    <div>
      <div className="main">
        {productData.length > 0 && (
          <div className="products_h1tag">
            <h1>Products</h1>
          </div>
        )}
        <div>
          {productData.length > 0 ? (
            <div>
              <table>
                <thead>
                  <tr className="th_width">
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {perPageProducts.map((ele, id) => (
                    <tr className="td_width" key={id}>
                      <td>{ele.id}.</td>
                      <td className="max-w-xl">{ele.title}</td>
                      <td>{ele.price}</td>
                      <td>{ele.category}</td>
                      <Link to={`/${ele.id}`}>
                        <td>
                          <button className="btn">SHOW</button>
                        </td>
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-2xl">Loading...</div>
          )}
        </div>
        <div className="pagination">
          {productData.length > 0 && (
            <div>
              <div className="flex gap-4 items-center">
                <span>
                  Rows per page:{" "}
                  <select value={rowsPerPage} onChange={handleRowsChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                  </select>
                </span>
                <span>
                  {firstIndex + 1}-{Math.min(lastIndex, productData.length)} of{" "}
                  {productData.length}
                </span>
                <button
                  disabled={currentPage === 1}
                  style={{ color: currentPage === 1 ? "gray" : "black" }}
                  onClick={() => paginate(currentPage - 1)}
                >
                  &#60;
                </button>
                <button
                  disabled={currentPage === totalPages}
                  style={{
                    color: currentPage === totalPages ? "gray" : "black",
                  }}
                  onClick={() => paginate(currentPage + 1)}
                >
                  &#62;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;