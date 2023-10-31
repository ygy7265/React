import {createSlice} from "@reduxjs/toolkit"

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
        changeName(state){
            state.name = 'john'
        },
        increase(state){
            state.age = (state.age)+1
        }
    }
})
export default user
export let {changeName,increase } = user.actions
