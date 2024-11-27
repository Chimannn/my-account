// 账单列表 store

// 1、使用 createSlice 创建 state
// 1.1、设置 initialState 
// 1.2、设置同步修改方法 reducers

// 2、解构出 actionCreater 操作函数 并 按需导出；
// 3、编写异步操作函数 并 按需导出；
// 3、默认导出 reducer；

import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";

const billStore = createSlice({
    name: "bill",
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        }
    }
})

const { setBillList } = billStore.actions;

const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:8888/ka")
        dispatch(setBillList(res.data))
    }
}

const reducer = billStore.reducer

export { getBillList };
export default reducer;