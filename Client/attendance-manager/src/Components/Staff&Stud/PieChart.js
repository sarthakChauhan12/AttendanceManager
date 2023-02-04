import React from 'react';
import './PieChart.css';
import { PieChart } from "react-minimal-pie-chart";

const PieChartt = (props) => {
  const data = [{ title: "Present", value: props.present, color: "#50C878" },
  { title: "Absent", value: props.absent, color: "#F67280" }];
  
  return (
    <div style={{backgroundColor:"#DAE5D0"}} className="Apppp">
      <PieChart
        data={data}
        lineWidth={15}
        rounded
        startAngle={270}
        labelStyle={{
          fontSize: "6px",
          fontColor: "FFFFFA",
          fontWeight: "500",
          fontFamily: "monospace"
        }}
        label={(data) => data.dataEntry.title}
        labelPosition={70}
      />
    </div>
  );
};

export default PieChartt;
