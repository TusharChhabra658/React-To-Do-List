import React, { useEffect, useState } from "react";
import "./Todo.css"

function Todo(){
    const getStoredItems=()=>{
        let stored=localStorage.getItem("tasklist");

        if(stored){
            return JSON.parse(localStorage.getItem("tasklist"))
        }
        else{
            return []
        }
    }

    const [tasks,setTasks]=useState(getStoredItems);
    const [newTask,setNewTask]=useState("");

    useEffect(()=>{
        localStorage.setItem('tasklist',JSON.stringify(tasks))
    },[tasks])

    useEffect(()=>{
        document.title="To Do List"
    },[])
    
    function moveTaskUp(index){     
        if(index>0){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index-1]]=[updatedTasks[index-1],updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }

    function moveTaskDown(index){
        if(index<tasks.length-1){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index+1]]=[updatedTasks[index+1],updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function addTask(){
        if(newTask.length>0){
            setTasks(t=>[...t,newTask])
            setNewTask("")
        }
        else{
            alert("Please Enter a task!")
        }
    }

    function removeTask(index){
        setTasks(t=>t.filter((_,i) => i!==index));
    }

    return(
        <>
        <div className="container">
            <h1>To Do List</h1>
            <div className="inp">
                {<input type="text" placeholder="What you want to do ?" value={newTask} onChange={handleInputChange} /> }
                <button className="addButton" onClick={addTask}>Add</button>
            </div>
            {tasks.length===0 && <div className="notasks">Nothing to do 🙄</div>}
            <ol type="1">
                {tasks.map((task,index)=>
                <li key={index}>
                    <span>{task}</span>
                    <button className="removeButton" onClick={()=>removeTask(index)}>Delete</button>
                    <button className="upButton" onClick={()=>moveTaskUp(index)}>👆</button>
                    <button className="downButton" onClick={()=>moveTaskDown(index)}>👇</button>
                </li>
                )}
            </ol>
        </div>
        <footer>Made by Tushar Chhabra</footer>
        </>
    );
}

export default Todo;