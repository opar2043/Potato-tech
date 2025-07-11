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
import Register from './component/Provider/Register.jsx';
import EditProduct from './component/Dashboard/AllProduct/EditProduct.jsx';
import User from './component/Dashboard/User/User.jsx';
import ViewCard from './component/AllProducts/ViewCard.jsx';
import Checkout from './component/Checkout/Checkout.jsx';
import Order from './component/Dashboard/Order/Order.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import SubCategory from './component/AllProducts/SubCategory.jsx';
const queryClient = new QueryClient()
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
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/view/:id',
        element: <ViewCard></ViewCard>
      },
      {
        path: '/checkout',
        element: <Checkout></Checkout>
      },
      {
        path: '/category/:sub',
        element: <SubCategory></SubCategory>
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
      path: "/dashboard/editproducts/:id",
      element: <EditProduct></EditProduct>
    },
    {
      path: "/dashboard/allproduct",
      element: <AllProduct></AllProduct>
    },
    {
      path: "/dashboard/user",
      element: <User></User>
    },
    {
      path: "/dashboard/order",
      element: <Order></Order>
    },
  ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
     <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
