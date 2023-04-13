import React, {useState} from "react";

import Sidebar from "../Sidebar";
// import "./StudentLogin.css"
import Profile from './Profile';
import CheckAtt from './CheckAtt';
import CheckTT from './CheckTT';
import CheckMarks from './CheckMarks';
import FeeDetails from './FeeDetails';

const StudentLogin = () => {

    const [component, setComponent] = useState(0);

  return (
    <div>
      <Sidebar login="Student" func={setComponent}/>
      <div className="outside-sidebar">
        {component===0 && alert('Verified Student.')}
        {component===1 && <Profile name="Shin Ryujin"/>}
        {component===2 && <CheckAtt />}
        {component===3 && <CheckTT />}
        {component===4 && <CheckMarks />}
        {component===5 && <FeeDetails />}
      </div>
    </div>
  );
};

export default StudentLogin;
