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


    //Start

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        let isValid = true;
  
        if (!role) {
          isValid = false;
          errors["role"] = "Please select a role";
        }
  
        if (!name) {
          isValid = false;
          errors["name"] = "Please enter your name";
        }
  
        if (!email) {
          isValid = false;
          errors["email"] = "Please enter your email";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          isValid = false;
          errors["email"] = "Please enter a valid email";
        }
  
        if (!password) {
          isValid = false;
          errors["password"] = "Please enter your password";
        }
  
        setErrors(errors);
        return isValid;
      }
  
      const handleSignup = async (e) => {
          e.preventDefault();
  
          if (validateForm()) {
            handleImageUpload();
            let result = await fetch("http://localhost:5000/signup", {
              method: "post",
              body: JSON.stringify({ role, name, email, password, selectedImage }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            result = await result.json();
            localStorage.setItem("user",JSON.stringify(result.result))
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate('/staff');
          }
      }
    //End

    // const handleSignup = async (e) => {
    //     handleImageUpload();
    //     // e.preventDefault();
    //     //console.log(role,email,name,password)
    //     let result = await fetch("http://localhost:5000/signup", {
    //     method: "post",
    //     body: JSON.stringify({ role, name, email, password }),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     });
    //     result = await result.json();
    //     localStorage.setItem("user",JSON.stringify(result.result))
    //     localStorage.setItem("token",JSON.stringify(result.auth))
    //     //console.log(result);
    //     navigate('/staff');
    // }

    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImageChange = (event) => {
      const image = event.target.files[0];
      setSelectedImage(image);
    };

    const handleImageUpload = () => {
        // const formData = new FormData();
        // formData.append('img_upl', selectedImage);
    
        // fetch('http://localhost:5000/upload', {
        //   method: 'POST',
        //   body: formData
        // })
        // .then(response => {
        //   console.log(response);
        //   alert('File uploaded successfully!');
        // })
        // .catch(error => {
        //   console.error(error);
        //   alert('There was an error uploading the file. Please try again.');
        // });
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
        <div className="form-group">
            <label>Image:</label>
            <div className="image-upload-container">
                <input type="file" className="image-upload-input" onChange={handleImageChange} />
            </div>
        </div>
        <button type="submit" onClick={handleSignup} className="btn btn-primary">Submit</button>
        </form> 
    </div>
}

export default Signup;