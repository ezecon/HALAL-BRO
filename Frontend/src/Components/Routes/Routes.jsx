import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Customer/Home";
import HomeAdmin from "../../Pages/Admin/Home";
import Products from "../Products/Products";
import AdminProducts from "../../Pages/Admin/Products/Products";

//import Cart from "../Cart/Cart";
import SingleProduct from "../SingleProduct.jsx/SingleProduct";
import Profile from "../Profile/Profile";
import Login from "../Login";
import Register from "../Register";


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
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
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

        ]
    },
])

export default router;