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

    const sendEmail = async (to, subject, text) => {
        const response = await fetch("http://localhost:5000/mail", {
          method: "post",
          body: JSON.stringify({ to, subject, text }),
          headers: {
            "Content-Type": "application/json",
        },
        });
        const result = await response.json();
        console.log(result);
      };
    
    const changePassword = async() => {
        let result = await fetch(`http://localhost:5000/updatepassword/${email}`,{
            method:"put",
            headers:{
                'Content-Type':'application/json',
            }
        })
        if(result) {
            result = await result.json();
            navigate("/login");
          } else {
            console.error("The result from the API is either null or undefined");
          }
    }
      
    const handleSendEmail = () => {
    if (window.confirm("Enter your email and then press OK.")) {
        sendEmail(email, "New password for attendance management system", "Your new password is: ImGenius. Make sure to remember this password in future!");
        changePassword();
        alert("Password updated! Check your email to get your new password and login using that!")
    }
    };

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
        <p className="forget" style={{color: "blue", cursor: "pointer"}} onClick={handleSendEmail}>Forgot password?</p>
        <button type="submit" onClick={handleLogin} className="btn submitType btn-primary">Submit</button>
        </form> 
    </div>
}

export default Login;