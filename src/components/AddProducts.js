import React, { useState,useEffect } from "react";
import axios from 'axios';

export default function AddProducts(props) {
  const [productId, setProductId] = useState();
  const [productName, setProductName] = useState();
  const [categoryName, setCategoryName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productQty, setProductQty] = useState();

  const [isUpdateButton, setIsUpdateButton] = useState(false);

  useEffect(() => {
    if (props.product.id) {
      setProductId(props.product.id);
      setProductName(props.product.name);
      setCategoryName(props.product.category);
      setProductPrice(props.product.price);
      setProductQty(props.product.qty);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

  const handleInput = (e) => {
    switch (e.target.id) {
      case "productId":
        setProductId(e.target.value);
        break;
      case "productName":
        setProductName(e.target.value);
        break;
      case "categoryName":
        setCategoryName(e.target.value);
        break;
      case "productPrice":
        setProductPrice(e.target.value);
        break;
      case "productQty":
        setProductQty(e.target.value);
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const object = {
      id: productId,
      name: productName,
      price: productPrice,
      qty: productQty,
      category: categoryName,
    };

    console.log(object);

    // call api to save product
    if (isUpdateButton) {
      updateProduct(object);
    } else {
      saveProduct(object);
    }
  };
  const resetForm = () => {
    setProductId("");
    setProductName("");
    setCategoryName("");
    setProductPrice("");
    setProductQty("");
    setIsUpdateButton(false);
  };

  const updateProduct = async () => {
    const updatedData = {
      id: productId,
      name: productName,
      price: productPrice,
      qty: productQty,
      category: categoryName,
    };
    const udpatedRecord = await axios.put(
      "http://127.0.0.1:1902/api/user",
      updatedData
    );
    props.updateProductList();
    resetForm();
    alert("Product updated successfully!");
  };

  const saveProduct = async (product) => {
    const response = await axios.post(
      "http://127.0.0.1:1920/api/user",
      product
    );
    if (response.data) {
      props.updateProductList();
      resetForm();
    }
  };


  return (
    <>
      <form>
        <div className="form-group col-4">
          <label htmlFor="productId">Product Id: </label>
          <input
            className="form-control"
            type="text"
            id="productId"
            value={productId}
            onChange={handleInput}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="productName">Product Name: </label>
          <input
            className="form-control"
            type="text"
            id="productName"
            value={productName}
            onChange={handleInput}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="productPrice">Product Price: </label>
          <input
            className="form-control"
            type="text"
            id="productPrice"
            value={productPrice}
            onChange={handleInput}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="productQty">Product Quantity: </label>
          <input
            className="form-control"
            type="text"
            id="productQty"
            value={productQty}
            onChange={handleInput}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="categoryName">Category Name: </label>
          <input
            className="form-control"
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleInput}
          />
        </div>
        <div className="form-group col-4 product-btn">
          <button className="btn btn-success" onClick={handleSubmit}>
            {isUpdateButton ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>
    </>
  );
}
