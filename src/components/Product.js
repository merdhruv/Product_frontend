import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Product() {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);

  const [updateProduct, setUpdateProduct] = useState([]);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:1902/api/user");
      setProductList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (productId) => {
    console.log(productId);
    const deletedRecords = await axios.delete("http://localhost:1902/api/user");
    getProduct();
    alert(`${deletedRecords.data} deleted successfully`);
  };

  const handleUpdateProduct = (product) => {
    console.log(product);
    // pass product object to addProduct component
    setUpdateProduct(product);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/", { replace: true });

    getProduct();
  }, []);

  const handleLogOff = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <button className="btn btn-info" onClick={handleLogOff}>
          Log Off
        </button>
      </div>

      <table className="table table-bordered table-strip">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((productItem) => {
            return (
              <tr key={productItem}>
                <td>{productItem.id}</td>
                <td>{productItem.name}</td>
                <td>{productItem.price}</td>
                <td>{productItem.quantity}</td>
                <td>{productItem.category}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={handleUpdateProduct(productItem)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleUpdateProduct(productItem)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
