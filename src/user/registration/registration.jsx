import axios from "../../connection/axios";
import "../../styles/registrationStyle.css";
import React, {useState} from 'react';

const Registration = () => {
    const prefix = '/auth';

    const [newUser,setNewUser] = useState({
        name:"",
        email:'',
        password:""
    })

    const [errors,setErrors] = useState({
        nameErr:"",
        emailErr:"",
        passErr:""
    })

    const Change = (e)=>{
        setNewUser({
            ...newUser,
            [e.target.name]:e.target.value
        });
    }

    const validation = (e)=>{
        let valid = true;
        const message = {
            nameErr:"",
            emailErr:"",
            passErr:""
        }

        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const nameRegex = /^[A-Za-z]+$/;


        if (!newUser.name){
            message.nameErr = "name is required";
            valid = false;
        }else if (nameRegex.test(newUser.name) === false){
            message.nameErr = "name in not valid, try again";
            valid = false;
        }

        if (!newUser.email){
            message.emailErr = "email is required";
            valid = false;
        }else if (emailRegex.test(newUser.email) === false){
            message.emailErr = "email is not valid, try again";
            valid = false;
        }

        if (!newUser.password){
            message.passErr = "password is required";
            valid = false;
        }else if (passRegex.test(newUser.password) === false){
            message.passErr = "password is not valid try again";
            valid = false
        }
        console.log(message)
        setErrors(message);
        return valid;
    }

    const NewUser = async ()=>{
        try{
            await axios.post(`${prefix}/registration`, newUser).then(response=>{
                if (response.status === 200){
                    alert("successfully");
                    window.location.href = "/login";
                }
            })
        }catch (err){
            console.log(err)
        }
    }

    const Register = (e)=>{
        e.preventDefault();
        if (validation(e)){
            NewUser();
        }

    }

    return (
        <div>
            <div className="formDiv">
                <form className="registerForm" onSubmit={Register}>
                    <input
                        type="text"
                        name={"name"}
                        placeholder={"Name"}
                        className={"nameInp"}
                        onChange={Change}
                    />
                    {errors.nameErr ? <span>{errors.nameErr}</span> : ""}

                    <input
                        type="email"
                        name={"email"}
                        placeholder={"Email"}
                        onChange={Change}
                        className={"emailInp"}
                    />
                    {errors.emailErr ? <span>{errors.emailErr}</span> : ""}

                    <input
                        type="password"
                        name={"password"}
                        placeholder={"Password"}
                        onChange={Change}
                        className={"passInp"}
                    />
                    {errors.passErr ? <span>{errors.passErr}</span> : ""}
                    <button type="submit" id={"submit"}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;