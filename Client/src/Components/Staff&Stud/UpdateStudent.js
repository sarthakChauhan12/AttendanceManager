import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateStudent = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [classs,setClasss] = useState("");
    const [rollno,setRollno] = useState();

    useEffect(()=>{
        const getUserDetails = async () => {
            let result = await fetch(`http://localhost:5000/profile/${params.id}`,{
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                  }
            })
            // result = await result.json();
            setName(result.name);
            setEmail(result.email);
            setPassword(result.password);
            setClasss(result.class);
            setRollno(result.rollno)
        }
        getUserDetails();
    },[params.id])

    

    const handleUpdateClick = async () => {
        await fetch(`http://localhost:5000/updateprofile/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,email,password,class:classs,rollno}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }
        })
        // result = await result.json();
        alert("Profile updated successfully!");
        navigate("/student");
    }

    return <div>
        <h1>Update Profile</h1>
             <input placeholder="Enter Name" type="text" className="inputBox"
            value={name} onChange={(e)=>{setName(e.target.value)}} />

            <input placeholder="Enter Email" type="email" className="inputBox"
            value={email} onChange={(e)=>{setEmail(e.target.value)}} />

            <input placeholder="Enter New Password" type="password" className="inputBox"
            value={password} onChange={(e)=>{setPassword(e.target.value)}} />

            <input placeholder="Enter class" type="text" className="inputBox"
            value={classs} onChange={(e)=>{setClasss(e.target.value)}} />

            <input placeholder="Enter Roll No." type="text" className="inputBox"
            value={rollno} onChange={(e)=>{setRollno(e.target.value)}} />

            <button type="button" onClick={handleUpdateClick}>Update Profile</button>
    </div>
}

export default UpdateStudent;