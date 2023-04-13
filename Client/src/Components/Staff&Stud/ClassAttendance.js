import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import './ClassAttendance.css'

const ClassAttedance = () => {
    
  const [status, setStatus] = useState("absent");
  const params = useParams();
  const classs = params.id;
    useEffect(() => {
      const getClassList = async() => {
          let result = await fetch("http://localhost:5000/classlist/" + classs, {
              headers: {
                  authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
          });
          result = await result.json();
          if(result){
              setListOfStudents(result);
          }else{
              setListOfStudents({message:"No student found in the class!"});
          }
      }
        getClassList();
      }, [classs]);
    const [listOfStudents, setListOfStudents] = useState({});
    

    const [absentees, setAbsentees] = useState();

    const handleAttendanceSubmit = async(e) => {
        console.log(status);
        // e.preventDefault();
        let array = JSON.parse(absentees);
        //console.log((array));
        await fetch(`http://localhost:5000/list/${params.id}`,{
            method:"put",
            body:JSON.stringify({absentees:array, status}),
            headers: {
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
              }
        })
        // result = await result.json();
        // navigate("/staff");
    }

    const deleteAttendance = async (classname) => {
        await fetch(`http://localhost:5000/delete/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        });
        // result = await result.json();
      };
      

    return <div>
      <h3 className="no-student-message margin-adder">Students of class {classs} are: </h3>
    {listOfStudents.length > 0 ? listOfStudents.map((item) => {
      const count = item.attendance.filter(function(element) {
        return element === true;
      }).length;
      return (
        <ul key={item._id} className="student-list">
          <li className="student-item">{item.rollno} - {item.name} - Present: {count} & Absent: {item.attendance.length - count}</li>
        </ul>
      );
    }) : 
    <h1 className="no-student-message">No Student Found</h1>}
    <form>
      <textarea rows="5" cols="25" className="absentees-input" placeholder='Enter the roll number of students as an array...' onChange={(e) => setAbsentees(e.target.value)} value={absentees} />
      <div className="attendance-form margin-adder">
        <input type="radio" name="att" value="present" className="present-radio" onChange={() => setStatus("present")} /> Mark presents <br />
        <input type="radio" name="att" value="absent" className="absent-radio" onChange={() => setStatus("absent")} defaultChecked /> Mark absents <br /><br />
        <button type="submit" className="mark-attendance-button" onClick={handleAttendanceSubmit}>Mark Attendance</button>
        <button type="submit" className="delete-attendance-button" onClick={deleteAttendance}>Delete Last Attendance</button>
      </div>
    </form>
  </div>
}

export default ClassAttedance;