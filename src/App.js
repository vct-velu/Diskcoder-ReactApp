import './App.css';
import AddProduct from './components/AddProduct/AddProduct';
import Products from './components/products/Products';
import React, { useState, useEffect } from 'react';


const App = function () {

  const [data, setData] = useState([]);

  // Change Product State when New Product Added
  const addProductHandler = (newProduct) => {
    console.log("Function triggerred!");
    setData((prevData) => { return [...prevData, newProduct] });
  }

  // Change Product State when a Product deleted
  const deleteProductHandler = (id) => {
    const updatedData = data.filter((item) => item._id !== id);
    setData(updatedData);
  }

  // Change Product State when a Product Edited
  const editProductHandler = (editedProduct) => {
    let index = data.findIndex(item => item._id === editedProduct._id);

    if (index !== -1) {
      const updatedData = [
        ...data.slice(0, index),
        { _id: editedProduct._id, name: editedProduct.name, price: editedProduct.price, image: editedProduct.image, description: editedProduct.description },
        ...data.slice(index + 1)
      ];
      setData(updatedData);
    }
  }

// Fetch the Products from Backend
  useEffect(() => {
    fetch('http://localhost:4000/api/product')
      .then(response => response.json())
      .then(data => setData(data.Products));
  }, []);

  return (

    <div>
      <AddProduct addProductHandler={addProductHandler} />
      <Products Products={data} onDeleteProduct={deleteProductHandler} onEditProduct={editProductHandler} />
    </div>


  );
}

export default App;
