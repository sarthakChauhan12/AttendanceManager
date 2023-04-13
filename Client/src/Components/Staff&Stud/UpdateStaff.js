import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateStaff = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [classes,setClasses] = useState("");

    useEffect(()=>{
        const getUserDetails = async () => {
            let result = await fetch(`http://localhost:5000/profile/${params.id}`,{
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                  }
            })
            result = await result.json();
            setName(result.name);
            setEmail(result.email);
            setPassword(result.password);
            console.log(typeof(result.classes));
            setClasses(JSON.stringify(result.classes));
        }
        getUserDetails();
    },[params.id])

    

    const handleUpdateClick = async () => {
        const temp = JSON.parse(classes);
        await fetch(`http://localhost:5000/updateprofile/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,email,password,classes:temp}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }
        })
        alert("Profile updated successfully!");
        navigate("/staff");
    }

    return <div>
        <h1>Update Staff Profile</h1>
             <input placeholder="Enter Name" type="text" className="inputBox"
            value={name} onChange={(e)=>{setName(e.target.value)}} />

            <input placeholder="Enter Email" type="email" className="inputBox"
            value={email} onChange={(e)=>{setEmail(e.target.value)}} />

            <input placeholder="Enter New Password" type="password" className="inputBox"
            value={password} onChange={(e)=>{setPassword(e.target.value)}} />

            <input placeholder="Enter classes you teach in" type="text" className="inputBox"
            value={classes} onChange={(e)=>{setClasses(e.target.value)}} />

            <button type="button" onClick={handleUpdateClick}>Update Profile</button>
    </div>
}

export default UpdateStaff;