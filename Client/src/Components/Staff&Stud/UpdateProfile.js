import React from "react";

import UpdateStudent from "./UpdateStudent";
import UpdateStaff from "./UpdateStaff";

const UpdateProfile = () => {

    const curr_role = JSON.parse(localStorage.getItem("user")).role;

    return <div>
        {curr_role === "Student" ?
        <UpdateStudent /> : <UpdateStaff />}
    </div>
}

export default UpdateProfile;