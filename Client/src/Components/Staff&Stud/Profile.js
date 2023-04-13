import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import './Profile.css'

const Profile = (props) => {

  const navigate = useNavigate();

  const [result1, setResult1] = useState({});

  const id = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const getUser = async () => {
      let result = await fetch("http://localhost:5000/profile/" + id, {
        headers: {
          authorization: `beared ${JSON.parse(localStorage.getItem("token"))}`
        },
      });
      result = await result.json();
      //console.log(result);
      setResult1(result);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProfile = () => {
    let password = prompt("Please enter your password:", "");
    if(result1.password === password)
      {navigate('/update/' + id)} 
      else{
        alert("Access denied!");
      }
  }

  return (
      <div className="student-profile">
        <img src='https://qph.cf2.quoracdn.net/main-qimg-fd0c417cf111f47fe621f648e14d48d8-pjlq' alt={props.name} />
        <h5>{(result1.name)}</h5>
        <h5>{(result1.email)}</h5>
        <button onClick={handleUpdateProfile}>Update profile</button>
      </div>
  );
};

export default Profile;