import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
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
    const [dataByDate, setDataByDate] = useState([]);
    const [dataForTTS, setDataForTTS] = useState([]);

    const { id } = useParams();
    console.log(props, 'props')

    useEffect(() => {
      fetch(`/api/databydate`)
      .then((res) => res.json())
      .then((data) => {
        //for PieChart
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
            setDataByDate(result)
          }
        }
        //for TTS BarChart
        for (const obj of data) {
          if (obj.date == id) {
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

    console.log(dataByDate, 'dataByDate')
    console.log(dataForTTS, 'dataForTTS')

    return (
      <div className="bar-date-detail-container">
          <div className="pie-chart bar-date-detail-container-child-container">
            <h1>PieChartByDate / Aug {id}th</h1>
            <PieChart 
            data={dataByDate.filter(data => Object.keys(colors).includes(data.name))}
            colors={colors}
            />
            <div className="fields" style={{ marginBottom: "2rem" }}>
                {dataByDate.filter(data => Object.keys(colors).includes(data.name)).map(key => (
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
          <div className="bar-chart-tts bar-date-detail-container-child-container">
            <h1>BarChartForTTS / Aug {id}th</h1>
            {dataForTTS.length ? <BarChart data={dataForTTS} /> : null}
          </div>
      </div>
    );
}

export default BarDateDetail;