import {useDispatch, useSelector} from "react-redux";
import {memo, useDeferredValue, useMemo, useState, useTransition} from "react";
import {changeName,increase} from './../userSlice.js'
import {plusCount} from "../store";
import {json} from "react-router-dom";

let Child = memo(function(){
    return <div>memoTest</div>
})
function useMemofunction(){
    return "test";
}
function Cart(){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let result = useMemo(()=>{return useMemofunction()},[])
    //Redux State를 가져오는 함수
    let a= useSelector(state => {return state})
    let b= useSelector(state => {return state.user})
    let orderData = useSelector(state => {return state.cart})

    let [order] = useState(orderData);
    let [name,setName] = useState('');
    let state = useDeferredValue(name);
    let [isPending, startTransition] = useTransition();
    console.log(orderData[1]);
    return(

        <div>
            <Child />

            <input onChange={(e)=>{
                startTransition(()=>{
                    setName(e.target.value)
                })
            }}/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">상품명</th>
                    <th scope="col">수량</th>
                    <th scope="col">변경</th>
                </tr>
                </thead>
                <tbody>
                {
                    order.map(function(e,i){
                        return(
                            <>{
                                <OrderTable orderDate = {orderData[i]} user = {a}/>
                            }
                            </>

                        )

                    })
                }

                </tbody>
            </table>
        </div>
    )
}

function OrderTable(props){
    let dispatch = useDispatch();
    console.log(props.orderDate+"orderData");
    return(
        <>
            <p>{props.user.user.name} {props.user.user.age}</p>
            <button onClick={() => {dispatch(increase())}}>ageChange</button>
            <tr>
                <th scope="row">{props.orderDate.id}</th>
                <td>{props.orderDate.name}</td>
                <td>{props.orderDate.count}</td>
                <td><button onClick={()=>{
                    dispatch(plusCount((props.orderDate.id)))
                }}>+</button></td>

            </tr>
        </>
    )
}
export default Cart