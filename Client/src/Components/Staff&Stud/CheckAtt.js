import React,{useState,useEffect} from "react";

import PieChartt from "./PieChart";

const CheckAtt = () => {

  const [result1, setResult1] = useState({});

  const id = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const getUser = async () => {
      let result = await fetch("http://localhost:5000/profile/" + id, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setResult1(result);
    };
    getUser();
  }, [id]);

  const presentCount = result1.attendance ?  result1.attendance.filter(element => element === true).length : 0;
  const absentCount =result1.attendance ? result1.attendance.length - presentCount: 0;

  
  return (
    <div>
    
    <h5>{(result1.name)}</h5>
    {result1.attendance ? 
      <ul key={result1._id}>
        <li>
          {result1.rollno} - {result1.name} - Present: {presentCount} & Absent:{absentCount}
        </li>
      </ul>
      :
      <h1>No Student Found</h1>
    }
    <h6>Present percentage = {(presentCount*100/(presentCount+absentCount)).toFixed(2)} %</h6>
    
    {/* {result1.attendance && 
      <Pie  data={{
        labels: ['Num1', 'Num2'],
        datasets: [{
            data: [result1.attendance.filter(element => element === true).length, result1.attendance.length - result1.attendance.filter(element => element === true).length],
            backgroundColor: ['#ff6384', '#36a2eb'],
        }]
      }} />
    } */}
    {/* present={result1.attendance.filter(element => element === true).length} absent = {result1.attendance.filter(element => element === false).length} */}
      <PieChartt present={presentCount} absent = {absentCount}/>
  </div>
)};


export default CheckAtt;