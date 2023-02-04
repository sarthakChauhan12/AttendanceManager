/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/NavBar';
import EntryCard from './Components/EntryCard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import StaffLogin from './Components/Staff&Stud/StaffLogin';
import StudentLogin from './Components/Staff&Stud/StudentLogin'
import ClassAttedance from './Components/Staff&Stud/ClassAttendance';
import UpdateProfile from './Components/Staff&Stud/UpdateProfile';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<EntryCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/staff/:id" element={<ClassAttedance/>} />
        <Route path="/update/:id" element={<UpdateProfile/>} />
        
      
      </Routes>

    </div>
  );
}

export default App;
