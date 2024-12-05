import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contant/billList'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [billType, setBillType] = useState('pay');
  const [money, setMoney] = useState(0);
  const [useFor, setUseFor] = useState(0);
  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const moneyChange = (val) => {
    if(!/^[0-9.]*$/.test(val)){
      setMoney(pre => pre)
      return
    }
    setMoney(Number(val))

  }
  const saveBill = () => {
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : money,
      date: date,
      useFor: useFor
    }
    dispatch(addBillList(data))
  }

  const handleBlur = () => {
    if(money === '') {
      setMoney(0)
    }else {
      setMoney(String(money).replace(/^0+/, ''))
    }
  }

  const dateConfirm = (date) => {
    setDate(date)
    setDateVisible(false)
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' && 'selected')}
            onClick={()=> setBillType('pay')}
          >
            支出
          </Button>
          <Button
            shape="rounded"
            className={classNames(billType === 'income' && 'selected')}
            onClick={()=> setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={()=>setDateVisible(true)}>{dayjs(date).format("YYYY-MM-DD")}</span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
                onCancel={()=>setDateVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
                onFocus={()=> money === 0 && setMoney('')}
                onBlur={handleBlur}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    // selected
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type && 'selected'
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New