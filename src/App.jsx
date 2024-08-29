import React from 'react';
import './App.css';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Shop from './components/Shop';
import Contact from './components/Contact';
import About from './components/About';
import Notfound from './components/Notfound';
import Login from './components/Login';
import Register from './components/Register';
import ProductDeatail from './components/ProductDeatail';
import Cart from './components/Cart';
import { CartProvider } from './Context/CarContext';
import Dashboard from './components/Dashboard';
import Addproduct from './components/Addproduct';
import Edit from './components/Edit';
import ConfirmPay from './components/Confirmpay.jsx';
import Editcat from './components/Editcat.jsx'
import Addcat from './components/Addcat.jsx'
import Whishlist from './components/Whishlist.jsx';

function App() {
  let routes = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'shop', element: <Shop /> },
        { path: 'contact', element: <Contact /> },
        { path: 'about', element: <About /> },
        { path: 'cart', element: <Cart /> },
        { path: 'addproduct', element: <Addproduct /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: "/edit/:id", element: <Edit /> },
        { path: "/editcat/:id", element: <Editcat /> },
        { path: "/addcat", element: <Addcat /> },
        { path: 'productdetails/:id', element: <ProductDeatail /> },
        { path: 'login', element: <Login/> },
        { path: 'register', element: <Register/> },
        { path: 'confirmpay', element: <ConfirmPay /> },
        { path: 'whislist', element: <Whishlist /> },
        { path: '*', element: <Notfound /> },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={routes} />
    </CartProvider>
  );
}

export default App;