import "./index.scss";
import { NavBar, DatePicker } from 'antd-mobile';
import { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

const Month = () => {
    const [dateVisible, setDateVisible] = useState(false);
    const [currentDate, setCurrentDate ] = useState(() => {
        return dayjs(new Date()).format("YYYY-MM")
    });
    const onConfirm = (date) => {
        const formatDate = dayjs(date).format("YYYY-MM")
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
                            <span className="money">{100}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
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