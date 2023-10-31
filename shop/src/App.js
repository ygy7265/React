import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moon from './moon.jpg';
import {Button,Navbar,Container,Nav,Row,Col} from 'react-bootstrap';
import {createContext, lazy, Suspense, useContext, useEffect, useState} from "react";
// import a from './data.js';
import {a,data} from './data.js';
import {Routes, Route, Link, useNavigate, Outlet, useParams, json} from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'

import {addList} from './store'
import {useDispatch} from "react-redux";
import {useQuery} from "@tanstack/react-query";
const Cart = lazy(()=> import('./routes/Cart.js'));
let YellowBtn = styled.button`
    background: ${props => props.bg};
    color: ${props => props.bg == 'red' ? "white" : "black"};
    padding: 10px;
`
let Box =  styled.div`
    background: grey;
    padding: 20px;
`

let Context1 = createContext()
function App() {
    useEffect(()=>{

        localStorage.setItem('watched',JSON.stringify([]))
       let watched = localStorage.getItem('watched');

       if(watched.length === 0 || watched == null){

            watched = localStorage.getItem('watched');
       }



    },[])
    let [alert,setAlert] = useState(true);
    let [count,setCount] = useState(0);
    let [stock,setStock] = useState([10,11,12])
    useEffect(() => {
        setTimeout(()=>{setAlert(false)},2000)
    },[count]);
    let [shoes] = useState(data);
    let [item,setitem] = useState([]);
    console.log(shoes);
    let navigate = useNavigate();
    // let result = useQuery('작명', ()=>
    //     axios.get('https://codingapple1.github.io/userdata.json')
    //         .then((a)=>{ return a.data })
    // )

  return (
    <div className="App">

        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Shop</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                    <Nav.Link href="/detail">detail</Nav.Link>
                    <Nav.Link href="/test">Pricing</Nav.Link>
                </Nav>
                {/*<Nav className="me-auto"> {result.isLoading ? 'loding' : result.data.name}</Nav>*/}
            </Container>
        </Navbar>

        {
            alert == true ? <div> 2 second </div> : null
        }
        <Suspense fallback={<div>로딩중</div>}>
        <Routes>
            <Route path="/" element={
                <div className="container text-center">
                    <div className="main-bg" style={{backgroundImage : 'url('+moon+')'}}></div>
                    <div className="row">
                        {
                            shoes.map(function(e){
                                return(
                                        <Card e={e}></Card>
                                )
                            })

                        }
                        {
                            item.map(function(e){
                                return(
                                    <Card e={e}></Card>
                                )
                            })

                        }
                        <button onClick={()=>{

                            axios.get('https://codingapple1.github.io/shop/data2.json')
                                .then((data) => {setitem(data.data)})
                                .catch(()=>{console.log("faild")})

                            fetch('www.navep.com')
                                .then(data => data.json())
                                .then(data => {})
                            }


                        }>button</button>
                    </div>
                </div>
            }/>
            <Route path="/event" element={<EventPage/>}>
                <Route path="one" element={<p> 첫주문시 양배추즙 서비스</p>}/>
                <Route path="two" element={<p> 생일기념 쿠폰받기</p>}/>
            </Route>
            <Route path="/detail/:id" element={
                <Context1.Provider value={{stock,shoes}}>
                <Detail shoes = {shoes}/>
                </Context1.Provider>
            }/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<div>없는 페이지...............................</div>}/>

        </Routes>
        </Suspense>
    </div>
  )
};

function Card(props){
      return(
          <>
              <div className="col">
                  <Link to={`/detail/${props.e.id}`}> <img src={process.env.PUBLIC_URL  +'/img/flower.jpg'}/></Link>
                  <h4>{props.e.id}</h4>
                  <p>{props.e.content}</p>
              </div>
          </>
      )
  }

function Detail(props){
    let [inputRole,setInputRole] = useState("입력");
    let [tab,settap] = useState(0);
    let {id} = useParams();
    let {stock} = useContext(Context1);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const selectedItem = props.shoes[id]; // props.shoes[id]로부터 객체를 추출
    useEffect(()=>{
        let watched = localStorage.getItem("watched")
        watched = JSON.parse(watched)
        watched.push(selectedItem.id)
        let setData = new Set(watched)
        watched = Array.from(setData)
        localStorage.setItem("watched",JSON.stringify(watched))
    },[])

    let obj = {name : 'kim'}
    localStorage.setItem('data',JSON.stringify(obj));
    localStorage.getItem('data')

// 객체를 JSON 문자열로 변환

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                   <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>

                <div className="col-md-6">
                    <Box>
                        <YellowBtn bg='red' onClick={()=>{props.count(1)}}>button</YellowBtn>
                        <div>{props.count}</div>
                    </Box>
                    <h4 className="pt-5"></h4>
                    <input type="text" value={stock}/>
                    <p>{props.shoes[id].title}</p>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                        console.log(props.shoes[id] + "shoes")

                            navigate('/cart')
                    }}>주문하기</button>
                </div>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#" onClick={
                            ()=>{settap(1)}
                        }>Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#" onClick={
                            ()=>{settap(2)}}>Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                </ul>

                <TypeCheck type={tab}></TypeCheck>
            </div>
        </div>
    )
}
function TypeCheck({type}){
    console.log(type)
    if(type == 1){
        return <div className="start end">Content{type}</div>
    }else{
        return <div className="start end">Content{type}</div>
    }

}


function EventPage(){
    return (
        <div>
        <h4> 오늘의 이벤트</h4>
        <Outlet></Outlet>
        </div>
    )
}
export default App;
