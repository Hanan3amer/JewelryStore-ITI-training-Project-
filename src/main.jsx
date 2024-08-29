import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import AuthContextProvider from './Context/AuthContext.jsx'
import { WishlistProvider } from './Context/WishlistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </AuthContextProvider>
)
