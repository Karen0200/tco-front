import UpdateTask from "./tasks/updateTask/updateTask";
import Registration from "./user/registration/registration";
import TaskList from "./tasks/getTasks/taskList";
import AddTask from "./tasks/addTask/addTask";
import Task from "./tasks/showTask/task";
import Nav from "./navigation/nav";
import {Routes, Route} from "react-router";
import Login from "./user/login/login";
import React from "react";
import './App.css';

function App() {
    return (
        <div className="App">
            <Nav/>

            <Routes>
                <Route path={"/registration"} element={<Registration/>}/>
                <Route path={"/updateTask/:id"} element={<UpdateTask/>}/>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/task-list"} element={<TaskList/>}/>
                <Route path={"/add-task"} element={<AddTask/>}/>
                <Route path={"/task/:id"} element={<Task/>}/>
            </Routes>
        </div>
    );
}

export default App;
