import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

const ClassAttedance = () => {
    
    const [status, setStatus] = useState("absent");
    const params = useParams();
    useEffect(() => {
        getClassList();
      }, []);
    const [listOfStudents, setListOfStudents] = useState({});
    const classs = params.id;
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

    const [absentees, setAbsentees] = useState();

    const handleAttendanceSubmit = async(e) => {
        console.log(status);
        // e.preventDefault();
        let array = JSON.parse(absentees);
        //console.log((array));
        let result = await fetch(`http://localhost:5000/list/${params.id}`,{
            method:"put",
            body:JSON.stringify({absentees:array, status}),
            headers: {
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
              }
        })
        result = await result.json();
        // navigate("/staff");
    }

    return <div>
        {listOfStudents.length > 0 ? listOfStudents.map((item) => {
            const count = item.attendance.filter(function(element) {
                return element === true;
            }).length;
        return (
          <ul key={item._id}>
            <li>{item.rollno} - {item.name} - Present: {count} & Absent: {item.attendance.length - count}</li>
          </ul>
        );
      }):
      <h1>No Student Found</h1>}
      <form>
        <textarea rows="5" cols="25" className='block' placeholder='Enter the roll number of students as an array...' onChange={(e)=>setAbsentees(e.target.value)} value={absentees}/>
        <input type="radio" name="att" value="present" onChange={()=>setStatus("present")}/> Mark presents<br/>
        <input type="radio" name="att" value="absent" onChange={()=>setStatus("absent")} defaultChecked/> Mark absents<br/>
        <button type="submit" onClick={handleAttendanceSubmit} >Mark Attendance</button>
    </form>

    </div>
}

export default ClassAttedance;