import './ProductItem.css'
import React, { useState } from 'react';
import axios from 'axios';

const ProductItem = function (props) {

    const [editWindow, setEditWindow] = useState(false);
    const [showButton, setshowButton] = useState(true);
    const [image, setImage] = useState('');
    const [userInput, setUserInput] = useState({
        name: '',
        price: '',
        description: ''
    });

    // Handle Edit Product
    const editHandler = (event) => {
        setEditWindow(true);
        setshowButton(false);
        setUserInput({ name: props.name, price: props.price, description: props.description });

    }

    // Handle User Inputs:
    const handleNameChange = (event) => {
        // setProductName(event.target.value);
        setUserInput((prevState) => { return { ...prevState, name: event.target.value }; });
    };

    const handlePriceChange = (event) => {
        // setProductPrice(event.target.value);
        setUserInput((prevState) => { return { ...prevState, price: event.target.value }; });

    };

    const handleDescChange = (event) => {
        // setProductDescription(event.target.value);
        setUserInput((prevState) => { return { ...prevState, description: event.target.value }; });

    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        // setUserInput((prevState)=>{ return{ ...prevState, productImage: event.target.files[0] }; });

    };

    //Handle Edit Product Submit
    const handleSubmit = (event) => {
        event.preventDefault();

        if (image != '') {
            setEditWindow(false);
            setshowButton(true);
            const formData = new FormData();
            formData.append('name', userInput.name);
            formData.append('price', userInput.price);
            formData.append('image', image);
            formData.append('description', userInput.description);

            console.log("FormData : ", formData);

            axios.defaults.baseURL = 'http://localhost:4000';

            axios.put(`/api/product/edit/${props.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(response => {
                    console.log("Edited Product : ", response.data.updatedProduct);
                    props.onEditProduct(response.data.updatedProduct);
                    // setUserInput({ productName: '', productPrice: '', productDescription: '', });
                    window.alert("Product Edited Successfully!")

                })
                .catch(error => { console.log(error); });
        } else {
            window.alert("Upload Image")
        }
    };

    // Handle Cancel Edit Product
    const cancelEdit = () => {
        setEditWindow(false);
        setshowButton(true);
    }


    // Handle Delete Product
    const deleteHandler = (event) => {
        let prompt = window.confirm("Confirm Delete");
        if (prompt == true) {

            axios.defaults.baseURL = 'http://localhost:4000';

            axios.delete(`/api/product/delete/${props.id}`)
                .then(response => {
                    console.log("Deleted Data :", response.data);
                    props.onDeleteProduct(props.id);

                })
                .catch(error => { console.log(error); });
        }
    }

    return (
        <>
            <div className="product-item">
                <div className='product-image'>
                    <img src={`data:image/png;base64,${props.image}`} className='product-image' />
                </div>
                <div className='product-detail'>
                    <label name="name" className='name'>{props.name}</label>
                    <label name="price" className='price'> Rs: {props.price}</label>
                    <label name="price" className='description'> {props.description}</label>

                </div>
                {showButton ?
                    <div className='product-action'>
                        <button className='button' onClick={editHandler} > Edit </button>
                        <button className='button' onClick={deleteHandler}> Delete </button>
                    </div>
                    : null
                }
            </div>
            {editWindow ?
                <div className='edit-product-window'>
                    <form onSubmit={handleSubmit}>
                        <div className='edit-product-controls'>
                            <div className='edit-product-control'>
                                <label>Product Name</label>
                                <input type="text" id="name" value={userInput.name} onChange={handleNameChange} />
                            </div>
                            <div className='edit-product-control'>
                                <label>Product Price</label>
                                <input type="number" id="price" value={userInput.price} onChange={handlePriceChange} />
                            </div>
                            <div className='edit-product-control'>
                                <label>Product Description</label>
                                <input type="text" id="description" value={userInput.description} onChange={handleDescChange} />
                            </div>
                            <div className='edit-product-control'>
                                <label>Product Image</label>
                                <input type="file" id="image" name="image" onChange={handleImageChange} />
                            </div>
                            <div className='edit-product-action'>
                                <button className='button' onClick={cancelEdit}> Cancel </button>
                                <button className='button' type="submit" > Submit </button>
                            </div>
                        </div>
                    </form>
                </div>
                : null
            }
        </>



    );

}
export default ProductItem;