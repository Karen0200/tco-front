import React, {useEffect, useState} from 'react';
import axios from "../../connection/axios";
import {useParams} from "react-router";

const UpdateTask = () => {
    const {id} = useParams();
    const [task,setTask] = useState([]);
    const [upTask,setUpTask] =useState({
        title: "",
        description: "",
        status: "",
        front_date: "",
    });

    const Task = async () =>{
        await axios.get(`/tasks/${id}`).then(response =>{
            if (response.status === 200){
                setTask(response.data);
            }
        });
    }


    useEffect(()=>{
        Task();
    },[]);
    console.log(task)

    const taskChange = (e) =>{
        setUpTask({
            ...task,
            [e.target.name]:e.target.value
        });
    }
    const updateTask = async () =>{


        await axios.put(`tasks/${id}`, upTask).then(response =>{
            if (response.status === 200){
                alert("successfully");
            }
        })
        window.location.href = "/task-list";
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateTask();
    }
    return (
        <div>
            <div className={"formParent"}>
                <form className={"addForm"} onSubmit={handleUpdate}>
                    <span>Title</span>
                    <input
                        name={"title"}
                        type={"text"}
                        onChange={taskChange}
                        className={"inp"}
                        defaultValue={task.title}
                    />
                    <span>Description</span>
                    <input
                        name={"description"}
                        type={"text"}
                        onChange={taskChange}
                        className={"inp"}
                        defaultValue={task.description}
                    />
                    <span>Date</span>
                    <input
                        name={"front_date"}
                        type={"date"}
                        onChange={taskChange}
                        className={"inp"}
                    />
                    <div className={"radio"}>
                        <div className={'status-option'}>

                            <input
                                type="radio"
                                name={"status"}
                                value={"pending"}
                                id={"pending"}
                                onChange={taskChange}
                                defaultValue={task.status}
                            />
                            <label htmlFor={"pending"}>
                                Pending
                            </label>
                        </div>
                        <div className={'status-option'}>

                            <input
                                type="radio"
                                name={"status"}
                                value={"done"}
                                id={"done"}
                                onChange={taskChange}
                            />
                            <label htmlFor={"done"}>
                                Done
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={"addBtn"}
                    >
                        Add Task
                    </button>
                </form>

            </div>
        </div>
    );
};

export default UpdateTask;