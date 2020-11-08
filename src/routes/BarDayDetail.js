import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../components/BarChart";
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
  const [dataByDay, setDataByDay] = useState([]);
  const [dataForTTS, setDataForTTS] = useState([]);

  let { id } = useParams();
  console.log(props, 'props')

useEffect(() => {
    fetch(`/api/databyday`)
    .then((res) => res.json())
    .then((data) => {
      //for PieChart
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
          setDataByDay(result)
        }
      }
      //for TTS BarChart
      for (const obj of data) {
        if (obj.convertedDay == id) {
          let result = []
          let map = {}
          map['avg_breakfast'] = obj.tts_breakfast ? obj.tts_breakfast / obj.breakfast : 0
          map['avg_lunch'] = obj.tts_lunch ? obj.tts_lunch / obj.lunch : 0
          map['avg_afternoon'] = obj.tts_afternoon ? obj.tts_afternoon / obj.afternoon : 0
          map['avg_dinner'] = obj.tts_dinner ? obj.tts_dinner / obj.dinner : 0
          map['avg_evening'] = obj.tts_evening ? obj.tts_evening / obj.evening : 0
          map['avg_late_night'] = obj.tts_late_night ? obj.tts_late_night / obj.late_night : 0
          result.push(map)
          setDataForTTS(result)
        }
      }      
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}, []);

  console.log(dataByDay, 'dataByDay')
  console.log(dataForTTS, 'dataForTTS')

  return (
      <div className="bar-day-detail-container">
          <div className="pie-chart bar-day-detail-container-child-container">
            <h1>PieChartByDay / {id}</h1>
            <PieChart 
            data={dataByDay.filter(data => Object.keys(colors).includes(data.name))}
            colors={colors}
            />
            <div className="fields">
                {dataByDay.filter(data => Object.keys(colors).includes(data.name)).map(key => (
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
          <div className="bar-chart-tts bar-day-detail-container-child-container">
            <h1>BarChartForTTS / {id}</h1>
            {dataForTTS.length ? <BarChart data={dataForTTS} /> : null}
          </div>
      </div>
  );
}

export default BarDayDetail;