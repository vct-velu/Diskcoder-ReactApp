import ProductItem from './productItem/ProductItem';
import './Products.css'

const Products = function (props) {

    const Products = props.Products;

    // Pass the Id of Deleted Product to App.js
    const passDeletedId = (id) => {
        props.onDeleteProduct(id);
    }

    // Pass Edited Product to App.js
    const passEditedProduct = (editedProduct) => {
        props.onEditProduct(editedProduct);
    }


    return (
        <div className='products'>
            {Products.map((product, index) => (
                <ProductItem
                    key={index}
                    id={product._id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    description={product.description}
                    onDeleteProduct={passDeletedId}
                    onEditProduct={passEditedProduct}
                />
            ))}
        </div>
    );
}

export default Products;