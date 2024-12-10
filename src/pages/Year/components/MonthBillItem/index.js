import classNames from 'classnames';
import './index.scss';
import { useMemo, useState } from 'react';
import { billTypeToName } from '@/contant/billList';
import Icon from '@/components/Icon';

const MonthBillItem = ({date, billList}) => {
    const [showDetail, setShowDetail] = useState(false)
    //计算子组件数据
    const monthResult = useMemo(() => {
        const pay = billList.reduce((acc, item) => item.type === 'pay' ? acc + parseFloat(item.money) : acc, 0)
        const income = billList.reduce((acc, item) => item.type === 'income' ? acc + parseFloat(item.money) : acc, 0)
        
        return {
            pay,
            income,
            total: pay+income
        }
    },[billList])
        
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames("arrow", showDetail && "expand")} onClick={() => setShowDetail(!showDetail)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{monthResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{monthResult.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{monthResult.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>

            {/* 单月列表 */}
            {   showDetail && 
                <div className="billList">
                    {billList.map(item => {
                        return (
                            <div className="bill" key={item.id}>
                                <Icon type={item.useFor} />
                                <div className="detail">
                                    <div className="billType">{billTypeToName[item.useFor]}</div>
                                </div>
                                <div className={classNames('money', item.type)}>
                                    {parseFloat(item.money).toFixed(2)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default MonthBillItem;