import "./index.scss";
import { NavBar, DatePicker } from 'antd-mobile';
import { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useMemo, useEffect } from 'react';
import _ from 'lodash';

const Month = () => {
    
    const billList = useSelector(state => state.bill.billList);

    const [dateVisible, setDateVisible] = useState(false);
    const [currentMonthList, setCurrentMonthList] = useState([]);
    const [currentDate, setCurrentDate ] = useState(() => {
        return dayjs(new Date()).format("YYYY-MM")
    });

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"))
    }, [billList])

    const monthResult = useMemo(() => {
        const pay = currentMonthList.reduce((a,c) => c.type === 'pay' ? a+c.money : a, 0)
        const income = currentMonthList.reduce((a,c) => c.type === 'income' ? a+c.money : a, 0)
        return {
            pay,
            income,
            total: income + pay
        }
    }, [currentMonthList])
    
    useEffect(() => {
        const formatDate = dayjs(new Date()).format("YYYY-MM")
        setCurrentMonthList(monthGroup[formatDate] || [])
    }, [monthGroup])
    
    const onConfirm = (date) => {
        const formatDate = dayjs(date).format("YYYY-MM")
        setCurrentMonthList(monthGroup[formatDate] || [])
        setCurrentDate(formatDate);
        setDateVisible(false)
    }
    return (
        <div className="monthlyBill">
            <NavBar back={null}>月度收支</NavBar>
            <div className="content">
                <div className="header">
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {currentDate}月账单
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    <div className="twoLineOverview">
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                        onClose={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                    />
                </div>
            </div>
        </div>
    )
}

export default Month