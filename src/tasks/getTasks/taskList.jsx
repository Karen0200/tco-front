import React, {useEffect, useState} from 'react';
import axios from "../../connection/axios";
import {Link} from "react-router-dom";
import "../../styles/taskListStyle.css";

const TaskList = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_exists = user && user.id;
    const [tasks, setTasks] = useState([]);
    const Pending = [];
    const Done = [];
    const [filter, setFilter] = useState("");


    tasks.map((element) => {
        if (element.status === "Pending") {
            Pending.push(element)
        } else {
            Done.push(element)
        }
    })

    console.log(filter)
    const getAllTasks = async () => {
        try {
            await axios.get(`/tasks?filter=${filter}`).then(response => {
                if (response.status === 200 && response.data.tasks.length) {
                    setTasks(response.data.tasks);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, [])

    const Delete = async (id) => {
        try {
            const isConfirm = window.confirm("Delete Task");
            if (isConfirm) {
                await axios.delete(`/tasks/${id}`).then(response => {
                    if (response.status === 200) {
                        getAllTasks();
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            <div className={"filter"}>
                <input
                    onChange={(e) => {
                        setFilter(e.target.value?e.target.value + " 00:00:00":"")
                    }}
                    type={"date"}

                />
                <button
                    onClick={getAllTasks}
                > Filter</button>
            </div>
            <div className={"taskList"}>

                <div className={"Pending"}>
                    {Pending.map((pending) => {
                        return (
                            <div className={"pending"}>
                                <div className={"pTitle"}>
                                    {pending.title}
                                </div>
                                <div className={"pContent"}>
                                    {pending.description}
                                </div>
                                <div className={"pDate"}>
                                    {pending.front_date}
                                </div>
                                <div className={"buttons"}>
                                    <div>
                                        <button className={"showBtn"}
                                                style={{display: user_exists === pending.user_id ? "block" : "none"}}>
                                            <Link to={`/task/${pending.id}`}>Ess more</Link>
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className={"updateBtn"}
                                            style={{display: user_exists === pending.user_id ? "block" : "none"}}
                                        >
                                            <Link to={`/updateTask/${pending.id}`}>Update</Link>
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className={"deleteBtn"}
                                            style={{display: user_exists === pending.user_id ? "block" : "none"}}
                                            onClick={() => Delete(pending.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={"Done"}>
                    {Done.map((done) => {
                        return (
                            <div className={"done"}>
                                <div className={"dTitle"}>
                                    {done.title}
                                </div>
                                <div className={"dContent"}>
                                    {done.description}
                                </div>
                                <div className={"dDate"}>
                                    {done.front_date}
                                </div>
                                <div className={"buttons"}>
                                    <div>
                                        <button className={"showBtn"}>
                                            <Link to={`/task/${done.id}`}>Ess more</Link>
                                        </button>
                                    </div>
                                    <div>
                                        <button className={"updateBtn"}
                                                style={{display: user_exists === done.user_id ? "block" : "none"}}
                                        >

                                            <Link to={`/updateTask/${done.id}`}>Update</Link>
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className={"deleteBtn"}
                                            style={{display: user_exists === done.user_id ? "block" : "none"}}
                                            onClick={() => Delete(done.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default TaskList;