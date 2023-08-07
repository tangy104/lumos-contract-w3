import './App.css';
import React, {useState, useEffect} from 'react';
import abi from './abi.json';
import {ethers} from 'ethers';

function App() {
  const [contract, setContract]=useState();
  const[todoCount, setTodoCount]=useState(0);
  const[inputItem, setInputItem]=useState()
  const[inputListItem, setInputListItem]=useState()
  const[inputListItemRes, setInputListItemRes]=useState()

  const contractExecution=async()=>{
    const provider= new ethers.BrowserProvider(window.ethereum);
    const signer=await provider.getSigner();
    const Contract= new ethers.Contract("0xba58FdCF96FC21E1B4Ee8536DdB486f3B31284d2", abi,signer)
    console.log(signer)
    setContract(Contract)
  }
    
  const getTodoCount=async()=>{
    if(contract){
      const res=await contract.count();
      setTodoCount(Number(res));
  }
}

  useEffect(()=>{
    contractExecution();
    getTodoCount();
   
  },[])

  const handleChange=(e)=>{
    setInputItem(e.target.value)
  }

  const handleSubmit=async()=>{
    const res=await contract.getTodo(inputItem);
  }
  const handleGetTodoList=async()=>{
    const res=await contract.todoList(inputListItem-1);
    setInputListItemRes(res)
  }

  const handleTodoList=(e)=>{
    setInputListItem(e.target.value);
  }

  return (
    <div>
      <button onClick={getTodoCount}>Get the Count</button>
      <h1>Count of todo:-{todoCount}</h1>
      <div>
        Enter the Input value
        <input onChange={handleChange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
      <input onChange={handleTodoList}></input>
        <button onClick={handleGetTodoList}>Get todo list</button>
        <h3>{inputListItemRes}</h3>
      </div>
    </div>
    
  );
}

export default App;
