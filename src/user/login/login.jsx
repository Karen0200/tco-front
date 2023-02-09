import React, {useState} from 'react';
import "../../styles/LoginStyle.css";
import axios from "../../connection/axios";

const Login = () => {
    const prefix = '/auth';

    const [singin, setSingin] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        emailErr: "",
        passErr: ""
    });

    const Change = (e) => {
        setSingin({
            ...singin,
            [e.target.name]: e.target.value
        });
    }


    const validation = (e) => {
        let valid = true;

        const errMas = {
            emailErr: "",
            passErr: ''
        }

        if (!singin.email) {
            errMas.emailErr = "Email is required";
            valid = false;
        }

        if (!singin.password) {
            errMas.passErr = "Password is required";
            valid = false;
        }

        setError(errMas);
        return valid;
    }

    const logIn = async (data) => {
        try {
            await axios.post(`${prefix}/login`, singin).then(response => {
                if (response.status === 200 && response.data) {
                    localStorage.setItem("token", response.data.access_token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    window.location.href = '/task-list'
                }
                return false
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (validation(e)) {
            logIn()
        }
    }

    return (
        <div>
            <div className="formDiv">
                <form className="loginForm" onSubmit={handleLogin}>
                    <input
                        type="email"
                        name={"email"}
                        placeholder={"Email"}
                        onChange={Change}
                        className={"emailInp"}
                    />
                    {error.emailErr ? <span>{error.emailErr}</span> : ""}

                    <input
                        type="password"
                        name={"password"}
                        placeholder={"Password"}
                        onChange={Change}
                        className={"passInp"}
                    />
                    {error.passErr ? <span>{error.passErr}</span> : ""}
                    <button type="submit" id={"login"}> Login</button>
                </form>
            </div>

        </div>
    );
};

export default Login;