import React, { useState } from 'react';
import './AddProduct.css'
import axios from 'axios';


const AddProduct = function (props) {

    const [productImage, setProductImage] = useState('');
    const [userInput, setUserInput] = useState({
        productName: '',
        productPrice: '',
        productDescription: ''
    });

    // Handle User Inputs:
    const handleNameChange = (event) => {
        setUserInput((prevState) => { return { ...prevState, productName: event.target.value }; });
    };

    const handlePriceChange = (event) => {
        setUserInput((prevState) => { return { ...prevState, productPrice: event.target.value }; });
    };

    const handleDescChange = (event) => {
        setUserInput((prevState) => { return { ...prevState, productDescription: event.target.value }; });
    };

    const handleImageChange = (event) => {
        setProductImage(event.target.files[0]);
    };

    // Handle Form Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', userInput.productName);
        formData.append('price', userInput.productPrice);
        formData.append('image', productImage);
        formData.append('description', userInput.productDescription);

        console.log("FormData : ", formData);

        axios.defaults.baseURL = 'http://localhost:4000';

        axios.post('/api/product/add', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                console.log("Added Product : ", response.data.product);
                props.addProductHandler(response.data.product);
                setUserInput({ productName: '', productPrice: '', productDescription: '', });
                window.alert("Product Added Successfully!")

            })
            .catch(error => { console.log(error); });

    };


    return (


        <div className='new-product'>
            <form onSubmit={handleSubmit}>
                <div className='new-product-controls'>
                    <div className='new-product-control'>
                        <label>Product Name</label>
                        <input type="text" id="name" value={userInput.productName} onChange={handleNameChange} />
                    </div>
                    <div className='new-product-control'>
                        <label>Product Price</label>
                        <input type="number" id="price" value={userInput.productPrice} onChange={handlePriceChange} />
                    </div>
                    <div className='new-product-control'>
                        <label>Product Description</label>
                        <input type="text" id="description" value={userInput.productDescription} onChange={handleDescChange} />
                    </div>
                    <div className='new-product-control'>
                        <label>Product Image</label>
                        <input type="file" id="image" name="image" onChange={handleImageChange} />
                    </div>
                    <div className='new-product-action'>
                        <button type="submit">Add Product</button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default AddProduct;