import React, {useState} from "react";

import Sidebar from "../Sidebar";
import "./StaffLogin.css"
import Profile from './Profile';
import MakeAtt from './MakeAtt';
import CheckTT from './CheckTT';

const StaffLogin = () => {

  
  const [component, setComponent] = useState(1);
  
  return (
    <div>
      <Sidebar login="Staff" func={setComponent}/>
      <div className="outside-sidebar">
        {component===1 && <Profile name="Shin Ryujin"/>}
        {component===2 && <MakeAtt />}
        {component===3 && <CheckTT />}
      </div>
    </div>
  );
};

export default StaffLogin;
