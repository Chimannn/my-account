import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <h1>我是 Layout.</h1>
            <Outlet />
        </div>
    )
}

export default Layout