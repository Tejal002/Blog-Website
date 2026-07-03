import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../../components/admin/Sidebar"
import axios from "axios"
import { useContext } from "react";
import { AppContext } from "../../../context/AppContextProvider";

const Layout = () => {
    const navigate = useNavigate();
    const {setToken}=useContext(AppContext)

    const logout=()=>{
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization']=null;
        setToken(null);
        navigate('/')
    }

  return (
    <>
        <div className="flex items-center justify-between py-2 h-17.5 px-4 sm:px-12 border-b border-gray-200">
            <h1 className="w-32 sm:w-40 cursor-pointer" onClick={()=>navigate('/')}>Logo</h1>
            <button className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer" onClick={logout}>Logout</button>
        </div>
        <div className="flex h-[calc(100vh-70px)]">
            <Sidebar/>
            <Outlet/>
        </div>
    </>
  )
}

export default Layout
