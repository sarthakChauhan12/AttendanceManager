import React from 'react';

import './Sidebar.css'

const Sidebar = (props) => {

    return (
        <div>
            <div className="sidebar">
                <h2>Welcome {props.name}</h2>
                <nav>
                    <ul>
                        <li className='pointer' onClick={()=>props.func(1)}>Profile</li>
                        {props.login==="Staff" && <li className='pointer' onClick={()=>props.func(2)}>Make Attendance</li>}
                        {props.login==="Student" && <><li className='pointer' onClick={()=>props.func(2)}>Check Attendance</li>
                        <li className='pointer' onClick={()=>props.func(4)}>Check Marks</li>
                        <li className='pointer' onClick={()=>props.func(5)}>Fee Details</li></>}
                        <li className='pointer' onClick={()=>props.func(3)}>Check Timetable</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;