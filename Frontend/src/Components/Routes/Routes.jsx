import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Customer/Home";
import HomeAdmin from "../../Pages/Admin/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/admin",
        element: <HomeAdmin/>
    },
])

export default router;