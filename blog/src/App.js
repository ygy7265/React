import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {

    let post = 'title1';
    let [title, setTitle] = useState(["A","C","B"])
    let [Like, setLike] = useState(0);
    let [modal,setModal] = useState(false);
    let [inputval, setInputVal] = useState(0);


    function like(){
        return setLike(Like+1);
    }

    function sort(){
        let copy = [...title];
        copy[0] = "DChange";
        copy.sort(function (a,b){return a.localeCompare(b)});
        setTitle(copy);
    }

    [1,2,3].map(function(a){
        return '1233211'
    });
    function ModalComponent(type){

        if(modal == true){
            setModal(false);
        }else{
            setModal(true);
        }


        console.log(type);
    }
  return <div className="App">
    <div className="black-nav">
        <h4>React</h4>
    </div>


      <button onClick={sort}>Sort</button>
      {
          title.map(function(a,i){
              return(
              <div className="list" key={i}>
                  <h4 onClick={() => ModalComponent(i)}>{title[i]} <span onClick={(e)=>{e.stopPropagation();like()}}>😜</span> {Like} </h4>
                  <p>2/17</p>
                  <button onClick={() => {
                      let title3 = [...title];
                      title3.splice(i,1);
                      setTitle(title3);
                  }}> Delete</button>
              </div>

              )
          })
      }


      {
          modal == true ? <Modal title ={title} /> : null

      }
      <Modal2 component = "3"/>

  </div>;
}
function Modal(props){
    let [change , setChange] = useState(0);
    return (
        <>
        <div className="modal">
            <h4>{props.title[change]}</h4>
            <p>Date</p>
            <p>Content</p>
        </div>

        </>
    )
}

class Modal2 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name : 'kim',
            age : 25
        }
    }
    render(){
        return(
            <div>{this.props.component} ,{this.state.name}
                <button onClick={() =>  {
                    this.setState({name : 'hong'})
                }}> State Hong</button>
            </div>
        )
    }
}

export default App;
