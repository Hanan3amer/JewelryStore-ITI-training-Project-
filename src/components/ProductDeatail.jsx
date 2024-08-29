import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../Context/CarContext.jsx';
import { WishlistContext } from '../Context/WishlistContext';


export async function productDetails(id) {
  try {
    let response = await axios.get(`http://localhost:3000/products/${id}`);
    let products = Array.isArray(response.data) ? response.data : [response.data];
    return products;
  } catch (err) {
    console.error(err);
  }
}

export default function ProductDetail() {
  let { id } = useParams();
  let navigate = useNavigate();

  let { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  let { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  let [products, setProducts] = useState([]);

  async function getDetails() {
    try {
      let data = await productDetails(id);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  let isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  let isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container my-5">
      <div className="row d-flex">
        {products ? products.map((product) => (
          <div className="col-md-6 my-2 bg-transparent" key={product.id}>
            <div className="img d-flex w-50 gap-3">
              <img src={product.image} className="w-100" alt={product.name} />
              <img src={product.imagehover} className="w-100" alt={product.name} />
            </div>
          </div>
        )) : 'No Products'}
        {products ? products.map((product) => (
          <div className="col-md-6" key={product.id}>
            <div className="d-flex align-items-center gap-5">
              <h4>{product.name}</h4>
              <i
                className={`fas fa-heart  bg-black p-2 fa-md rounded-circle ${isInWishlist(product.id) ? 'text-danger' : 'text-white'}`}
                onClick={() => toggleWishlist(product)}
              ></i>
            </div>
            <p className='text-muted'>{product.price}.00<span className=' text-success'>$</span></p>
            <p className=' text-secondary my-5'>{product.description}</p>
            <button className='btn'
              onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}>
              <i class="fa-solid fa-cart-plus"></i> {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </button>
            {isInCart(product.id) && (
              <button className='btn btn-link view text-black' onClick={() => navigate('/cart')}>View Cart</button>
            )}
          </div>
        )) : ''}
      </div>
    </div>
  );
}