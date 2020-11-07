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


function BarDateDetail(props) {
    const [pieChartData, setPieChartData] = useState([]);

    const { id } = useParams();
    console.log(props, 'props')

    useEffect(() => {
      fetch(`/api/piechartbydate`)
      .then((res) => res.json())
      .then((data) => {
        for (const obj of data) {
          if (obj.date == id) {
            let result = []
            for (let key in obj) {
              if (key != 'date') {
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
      <div className="bar-date-detail-container">
          <div className="pie-chart bar-date-detail-container-child-container">
            <h1>PieChartByDate</h1>
            <PieChart 
            data={pieChartData}
            colors={colors}
            />
            <div className="fields">
                {pieChartData.map(key => (
                    <div key={key.name} className="field">
                      <label htmlFor={key.name} style={{ color: colors[key.name], fontWeight:700 }}>
                          {key.name}
                      </label>
                    </div>
                ))}
            </div>
          </div>
      </div>
    );
}

export default BarDateDetail;