/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import './Login.css'

const Login = () => {

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ role, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
        });
        result = await result.json();
        if(result.auth){
            //console.log(result);
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            role === "Student"? navigate('/student'): navigate('/staff');
            return; 
        } else {
            alert("Please enter correct details");
        }
        //console.log("No user found!");
    }

    return <div className="login-form">
        <form>
        <div className="form-group">
            <label>Login as: </label>
            <input type="text" className="form-control inputbox"  onChange={(e)=>setRole(e.target.value)} value={role} placeholder="Admin or Student?"/>
        </div>
        <div className="form-group">
            <label>Email address: </label>
            <input type="email" className="form-control inputbox"  onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" value={email} placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label>Password: </label>
            <input type="password" className="form-control inputbox" onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1" value={password} placeholder="Password"/>
        </div>
        <button type="submit" onClick={handleLogin} className="btn btn-primary">Submit</button>
        </form> 
    </div>
}

export default Login;