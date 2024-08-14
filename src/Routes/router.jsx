/** @format */
import Update from "../Pages/Dashboard/Update/Update";
import PrivateRout from "./PrivateRout";

import Cart from "../Pages/Cart/Cart";
import AllCategoryProducts from "../Pages/Home/Category/CategoryCard/AllCategoryProducts";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";

import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import { createBrowserRouter } from "react-router-dom";

import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Deshboard from "../Layout/Deshboard";
import Checkout from "../Pages/Dashboard/Checkout/Checkout";
import Invoice from "../Pages/Dashboard/Checkout/Invoice";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Shop from "../Pages/Shop/Shop";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category/:category",
        element: <AllCategoryProducts></AllCategoryProducts>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.category}`),
      },
     
      {
        path: "/shop",
        element: <Shop></Shop>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRout>
        <Deshboard></Deshboard>
      </PrivateRout>
    ),
    children: [
     
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'checkout',
        element: <Checkout></Checkout>
      },
      {
        path: 'invoice',
        element: <Invoice></Invoice>
      },
      {
        path: 'addItem',
        element:<AddItem></AddItem>
      },
      {
        path: 'manageCategory',
        element:<ManageItems></ManageItems>
      },
      {
        path: 'manageCategory/update/:id',
        element:<Update></Update>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)

      },
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      }
    ],
  },
]);

export default router;
