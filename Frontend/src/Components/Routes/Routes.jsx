import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Customer/Home";
import HomeAdmin from "../../Pages/Admin/Home";
import Products from "../Products/Products";
import AdminProducts from "../../Pages/Admin/Products/Products";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,

    },
    {
        path: "/products",
        element: <Products/>,

    },
    {
        path: "/admin",
        element: <HomeAdmin/>,
        children: [
            {
                path:'',
                element:<AdminProducts/>
            }
        ]
    },
])

export default router;