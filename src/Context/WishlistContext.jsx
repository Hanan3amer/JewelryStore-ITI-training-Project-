import React, { createContext, useState } from 'react';

export let WishlistContext = createContext();

export let WishlistProvider = ({ children }) => {
  let [wishlistItems, setWishlistItems] = useState(() => {
    let localStorageWishlist = localStorage.getItem('wishlistItems');
    return localStorageWishlist ? JSON.parse(localStorageWishlist) : [];
  });

  let addToWishlist = (product) => {
    setWishlistItems((prevWishlistItems) => {
      let updatedWishlist = [...prevWishlistItems, product];
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  let removeFromWishlist = (productId) => {
    setWishlistItems((prevWishlistItems) => {
      let updatedWishlist = prevWishlistItems.filter(item => item.id !== productId);
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};