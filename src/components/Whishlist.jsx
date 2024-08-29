import React, { useContext } from 'react';
import { WishlistContext } from '../Context/WishlistContext';
import Empty from '../assets/Empty1.png';
import { CartContext } from '../Context/CarContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function Wishlist() {
  let navigate = useNavigate()
  let { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  let { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  let isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };
  return (
    <div>
      <div className="container">
        {wishlistItems.length > 0 ? (
          <ul className=' list-unstyled d-flex gap-3 flex-column '>
            {wishlistItems.map((product) => (
              <li key={product.id} >
                <div className='d-flex justify-content-between align-items-center'>
                  <img src={product.image} alt={product.name} style={{ width: '150px' }} />
                  {product.name} - ${product.price}
                  <i className='fas fa-trash text-danger' onClick={() => removeFromWishlist(product.id)}>Remove</i>

                </div>
                <button className='btn my-3'
                  onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}>
                  <i class="fa-solid fa-cart-plus"></i> {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
                {isInCart(product.id) && (
                  <button className='btn btn-link view text-black' onClick={() => navigate('/cart')}>View Cart</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center mx-auto">
            <img src={Empty} className='empty' alt="Empty Wishlist" />

          </div>
        )}
      </div>

    </div>
  );
}