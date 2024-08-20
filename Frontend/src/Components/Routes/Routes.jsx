import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../../Pages/Customer/Home";
import HomeAdmin from "../../Pages/Admin/Home";
import Products from "../Products/Products";
import AdminProducts from "../../Pages/Admin/Products/Products";

import Cart from "../Cart/Cart";
import SingleProduct from "../SingleProduct.jsx/SingleProduct";
import Profile from "../Profile/Profile";
import Login from "../Login";
import Register from "../Register";
import Developer from "../Developer/Developer";
import { Orders } from "../../Pages/Admin/Orders/Orders";
import { Dashboard } from "../../Pages/Customer/Dashboard/Dashboard";
import Information from "../../Pages/Information/Information";
import Verify from "../../Pages/Verify/Verify";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,

    },
    {
        path: "/profile",
        element: <Profile/>,

    },
  
    {
        path: "/check-product/:id",
        element: <SingleProduct/>,

    },
    {
        path: "/products",
        element: <Products/>,

    },
    {
        path: "/carts",
        element: <Cart/>,

    },
    {
        path: "/about",
        element: <Developer/>,

    },
    {
        path: "/dashboard",
        element: <Dashboard/>,

    },

    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }
    ,
    {
        path: 'verify/information',
        element: <Information/>
    }

    ,
    {
        path: '/verify',
        element: <Verify/>
    }
    ,
    {
        path: '*',
        element: <div>404 Not Found</div>
    },
    {
        path: "/admin",
        element: <HomeAdmin/>,
        children: [
            {
                path:'',
                element:<AdminProducts/>
            },
            {
                path:'profile',
                element:<Profile/>
            },
            {
                path:'orders',
                element:<Orders/>
            },
            {
                path: 'products',
                element: <Navigate to="/admin" />, // Redirect to the product list page
            },

        ]
    },
])

export default router;