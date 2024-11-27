import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore"

const Layout = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    return (
        <div>
            <h1>我是 Layout.</h1>
            <Outlet />
        </div>
    )
}

export default Layout