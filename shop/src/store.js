import {configureStore, createSlice} from "@reduxjs/toolkit";
import user from './userSlice'
import {json} from "react-router-dom";

let user1 = createSlice({
    name : 'stock',
    initialState : [10,12,13]
})
let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        plusCount(state, a){
            const itemId = a.payload
            const finditem = state.find(item=> item.id == itemId)

            finditem.count++
        },
        addList(state , action){
            state.push(action.payload);
        }
    }
})

export let {plusCount,addList} = cart.actions
export default configureStore({
    reducer:{
        user : user.reducer,
        stock : user1.reducer,
        cart : cart.reducer
    }
})
