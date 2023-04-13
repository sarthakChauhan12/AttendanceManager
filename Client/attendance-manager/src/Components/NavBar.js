/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear();
    navigate('/');
}
let role = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).role : "";
  if(role === "Admin") role = "staff";

  let name = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).name : "";

    return <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Attendance Management</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href={`/`+ role}>Home</a>
      </li>
      {localStorage.getItem("user") && <li className="nav-item ml-auto">
        <a className="nav-link" style={{cursor:"pointer",textAlign:"right"}} onClick={logout}>Logout, {name}</a>
      </li>}
    </ul>
  </div>
</nav>
        </div>
}

export default NavBar;