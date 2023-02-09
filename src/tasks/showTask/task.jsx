import React, {useEffect, useState} from 'react';
import axios from "../../connection/axios";
import {useParams} from "react-router";

const Task = () => {

    const {id} = useParams();
    const [task,setTask] = useState([]);

    const getTask = async () =>{
        await axios.get(`/tasks/${id}`).then(response =>{
            if (response.status === 200){
                setTask(response.data);
            }
        });
    }

    useEffect(()=>{
        getTask()
    },[]);


    return (
        <div className={"taskContainer"}>
            <div className={"show"}>
                {task.title}
            </div>
            <div className={"show"}>
                {task.description}
            </div>
            <div className={"show"}>
                {task.front_date}
            </div>
            <div className={"show"}>
                {task.status}
            </div>
        </div>
    );
};

export default Task;