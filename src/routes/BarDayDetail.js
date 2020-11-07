import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PieChart from '../components/PieChart';
import "./BarDateDetail.css";

const colors = {
  "breakfast": 'navy',
  "lunch": 'green',
  "afternoon": 'blue',
  "dinner": 'orange',
  "evening": 'black',
  "late_night": 'red',
};

function BarDayDetail(props) {
  const [pieChartData, setPieChartData] = useState([]);

  let { id } = useParams();
  console.log(props, 'props')

useEffect(() => {
    fetch(`/api/piechartbyday`)
    .then((res) => res.json())
    .then((data) => {
      for (const obj of data) {
        if (obj.convertedDay == id) {
          let result = []
          for (let key in obj) {
            if (key != 'convertedDay') {
              let map = {}
              map['name'] = key
              map['value'] = obj[key]
              result.push(map)
            }
          }
          setPieChartData(result)
        }
      }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}, []);

  console.log(pieChartData, 'pieChartData')

  return (
<div className="bar-day-detail-container">
          <div className="pie-chart bar-day-detail-container-child-container">
            <h1>PieChartByDay</h1>
            <PieChart 
            data={pieChartData}
            colors={colors}
            />
            <div className="fields">
                {pieChartData.map(key => (
                  <>
                    <div key={key.name} className="field">
                      <label htmlFor={key.name} style={{ color: colors[key.name] }}>
                          {key.name}
                      </label>
                    </div>
                    <div key={key.value} className="field">
                      <label htmlFor={key.value} style={{ color: colors[key.name] }}>
                          {key.value}
                      </label>
                    </div>
                  </>                 
                ))}
            </div>
          </div>
      </div>
  );
}

export default BarDayDetail;