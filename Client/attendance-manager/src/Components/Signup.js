/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

// import './Signup.css'

const Signup = () => {

    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        // e.preventDefault();
        //console.log(role,email,name,password)
        let result = await fetch("http://localhost:5000/signup", {
        method: "post",
        body: JSON.stringify({ role, name, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
        });
        result = await result.json();
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        //console.log(result);
        navigate('/staff');
    }

    return <div className="login-form">
        <form>
        <div className="form-group">
            <label>Signup as: </label>
            <input type="text" className="form-control"  onChange={(e)=>setRole(e.target.value)} id="exampleInputEmail3" aria-describedby="emailHelp" value={role} placeholder="Admin or Student?"/>
        </div>
        <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control"  onChange={(e)=>setName(e.target.value)} alue={name} placeholder="Enter name"/>
        </div>
        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control"  onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail2" aria-describedby="emailHelp" value={email} placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1" value={password} placeholder="Password"/>
        </div>
        <button type="submit" onClick={handleSignup} className="btn btn-primary">Submit</button>
        </form> 
    </div>
}

export default Signup;