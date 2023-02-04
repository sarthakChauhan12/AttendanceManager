import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const MakeAtt = () => {

  const navigate = useNavigate();

  const handleClick = (element) => {
    navigate(`/staff/${element}`);
  }

  const id = JSON.parse(localStorage.getItem("user"))._id;

  const getUser = async () => {
    let result = await fetch("http://localhost:5000/profile/" + id, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    });
    result = await result.json();
    //console.log(result);
    let arr = result.classes[0].slice(1, -1).split(',');
    setMyArray(arr);
    //console.log(arr[0]);
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [myArray, setMyArray] = useState(['abc']);

  return (
    <div>
      <h2>Here's a list of classes you teach in: </h2>
      {myArray.map((element, index) => (
        <div key={index}>
          <span>{element}</span>
          <button onClick={() => handleClick(element)}>Take Att</button>
        </div>
      ))}
    </div>
  );
}

export default MakeAtt;
