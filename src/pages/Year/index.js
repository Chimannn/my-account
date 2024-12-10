import "./index.scss";
import { DatePicker } from 'antd-mobile';
import { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useMemo, useEffect } from 'react';
import _ from 'lodash';
import MonthBillItem from './components/MonthBillItem';


const Year = () => {
    
    const billList = useSelector(state => state.bill.billList);

    const [dateVisible, setDateVisible] = useState(false);
    const [currentYearList, setCurrentYearList] = useState([]);
    const [currentYear, setCurrentYear ] = useState(() => {
        return dayjs(new Date()).format("YYYY")
    });

    const yearGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY"))
    }, [billList])

    const yearResult = useMemo(() => {
        const pay = currentYearList.reduce((a,c) => c.type === 'pay' ? a+parseFloat(c.money) : a, 0)
        const income = currentYearList.reduce((a,c) => c.type === 'income' ? a+parseFloat(c.money) : a, 0)
        return {
            pay,
            income,
            total: income + pay
        }
    }, [currentYearList])
    
    useEffect(() => {
        const formatDate = dayjs(new Date()).format("YYYY")
        setCurrentYearList(yearGroup[formatDate] || [])
    }, [yearGroup])
    
    const onConfirm = (date) => {
        const formatDate = dayjs(date).format("YYYY")
        setCurrentYearList(yearGroup[formatDate] || [])
        setCurrentYear(formatDate);
        setDateVisible(false)
    }

    // 按照月分组数据
    const monthGroup = useMemo(() => {
        return _.groupBy(currentYearList, (item) => dayjs(item.date).format("YYYY-MM"))
    }, [currentYearList])
    
    return (
        <div className="yearBill">
            <div className="content">
                <div className="header">
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {currentYear}年
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    <div className="twoLineOverview">
                        <div className="item">
                            <span className="money">{yearResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="年份"
                        precision="year"
                        visible={dateVisible}
                        max={new Date()}
                        onClose={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                    />
                </div>
                {
                    Object.keys(monthGroup).map(key => {
                        return <MonthBillItem key={key} date={key} billList={monthGroup[key]}/>
                    })
                }
            </div>
        </div>
    )
}

export default Year