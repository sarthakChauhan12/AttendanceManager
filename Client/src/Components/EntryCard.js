/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {useNavigate} from 'react-router-dom';

import './EntryCard.css'

const EntryCard = () =>{

  const navigate = useNavigate();  


    return (<div className="card card-width">
      <div className="card-body">
        <h5 className="card-title">Authenticate first!</h5>
        <p className="card-text">To make use of the attendance management system, login or signup first.</p>
        <a href="#" className="btn btn-primary" onClick = {() => navigate('/login')}>Login</a>
        <a href="#" className="btn btn-primary" onClick = {() => navigate('/signup')}>Sign Up</a>
      </div>
      
  </div>)
}

export default EntryCard;