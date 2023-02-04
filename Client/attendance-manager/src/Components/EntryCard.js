/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {useNavigate} from 'react-router-dom';

import './EntryCard.css'

const EntryCard = () =>{

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("auth"));


    return (<div className="card card-width">
    <img className="card-img-top" src="#" alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="btn btn-primary" onClick = {() => navigate('/login')}>Login</a>
      <a href="#" className="btn btn-primary" onClick = {() => navigate('/signup')}>Sign Up</a>
      
    </div>
  </div>)
}

export default EntryCard;