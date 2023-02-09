import {NavLink} from "react-router-dom";
import "../styles/navStyle.css";
import React from 'react';


const Nav = () => {
    const token = localStorage.getItem("token");

    return (
        <div>
            <div className={"navigation"}>
                <NavLink to={"/"} style={{display: token?"none":"block"}}> Login</NavLink>
                <NavLink to={"/task-list"} style={{display: token?"block":"none"}}> Tasks</NavLink>
                <NavLink to={"/add-task"} style={{display: token?"block":"none"}}> Add Task</NavLink>
                <NavLink to={"/registration"} style={{display: token?"none":"block"}}> Registration</NavLink>
            </div>
        </div>
    );
};

export default Nav;