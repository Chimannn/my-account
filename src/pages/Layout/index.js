import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore"
import "./index.scss"
import { TabBar } from 'antd-mobile'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from 'antd-mobile-icons'

const tabs = [
    {
      key: '/month',
      title: '月度账单',
      icon: <BillOutline  />,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />,
    },
]
const Layout = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(location.pathname)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const setRouteActive = (value: string) => {
        setActiveKey(value)
        navigate(value)
    }
    useEffect(() => {
        dispatch(getBillList())
        setRouteActive('/month')
    }, [dispatch])
    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar activeKey={activeKey} onChange={value => setRouteActive(value)}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout