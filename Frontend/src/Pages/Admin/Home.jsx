import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";


export default function HomeAdmin() {
  return (
    <div>
        <Navbar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}
