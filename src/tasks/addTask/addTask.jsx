import React, {useState} from 'react';
import axios from "../../connection/axios";
import "../../styles/addStyle.css";


const AddTask = () => {

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "",
        front_date: "",
    });

    const [error, setError] = useState({
        titleErr: "",
        descriptionErr: "",
        statusErr: "",
        front_dateErr: "",
    });

    const Change = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })
    }

    const validation = (e) => {
        let valid = true;
        const errMessage = {
            titleErr: "",
            descriptionErr: "",
            statusErr: "",
            front_dateErr: "",
        };

        if (!newTask.title) {
            errMessage.titleErr = "Title is required";
            valid = false;
        }
        if (!newTask.description) {
            errMessage.descriptionErr = "description is required";
            valid = false;
        }
        if (!newTask.front_date) {
            errMessage.front_dateErr = "Date is required";
            valid = false;
        }
        if (!newTask.status) {
            errMessage.statusErr = "status is required";
            valid = false;
        }

        setError(errMessage);
        return valid;
    }

    const Create = async () => {
        await axios.post("tasks", newTask).then(response => {
            if (response.status === 200) {
                alert("Task Created Successfully");
                window.location.href = "/task-list";
            }
        });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        if (validation(e)) {
            Create();
        }
    }
    return (
        <div>
            <div className={"formParent"}>
                <form className={"addForm"} onSubmit={handleAdd}>
                    <span>Title</span>
                    <input
                        name={"title"}
                        type={"text"}
                        onChange={Change}
                        className={"inp"}
                    />
                    {error.titleErr?<span>{error.titleErr}</span>:""}
                    <span>Description</span>
                    <input
                        name={"description"}
                        type={"text"}
                        onChange={Change}
                        className={"inp"}
                    />
                    {error.descriptionErr?<span>{error.descriptionErr}</span>:""}
                    <span>Date</span>
                    <input
                        name={"front_date"}
                        type={"date"}
                        onChange={Change}
                        className={"inp"}
                    />
                    {error.front_dateErr?<span>{error.front_dateErr}</span>:""}
                    <div className={"radio"}>
                        <div className={'status-option'}>

                            <input
                                type="radio"
                                name={"status"}
                                value={"pending"}
                                id={"pending"}
                                onChange={Change}
                            />
                            {error.statusErr?<span>{error.statusErr}</span>:""}
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
                                onChange={Change}
                            />
                            {error.statusErr?<span>{error.statusErr}</span>:""}
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

export default AddTask;