import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './component/Root/Root.jsx';
import Error from './component/Root/Error.jsx';
import Home from './component/Home/Home.jsx';
import About from './component/About/About.jsx';
import Allproducts from './component/AllProducts/Allproducts.jsx';
import Login from './component/Provider/Login.jsx';
import AuthProvider from './component/Firebase/AuthProvider.jsx';
import AddProduct from './component/Dashboard/AddProduct/AddProduct.jsx';
import AllProduct from './component/Dashboard/AllProduct/AllProduct.jsx';
import Dashboard from './component/Dashboard/Dashboard2/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/allproducts',
        element: <Allproducts></Allproducts>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
    ]
  },
{
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
    {
      path: "/dashboard/addproducts",
      element: <AddProduct></AddProduct>
    },
    {
      path: "/dashboard/allproduct",
      element: <AllProduct></AllProduct>
    },
  ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
      <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
