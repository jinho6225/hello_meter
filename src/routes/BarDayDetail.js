import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../components/BarChart";
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import "./BarDateDetail.css";

const colors = {
  "breakfast": 'pink',
  "lunch": 'orange',
  "afternoon": 'green',
  "dinner": 'blue',
  "evening": 'purple',
  "late_night": 'red',
};

function BarDayDetail(props) {
  const [dataByDay, setDataByDay] = useState([]);
  const [dataForTTS, setDataForTTS] = useState([]);
  const [dataForFast, setDataForFast] = useState([]);
  const [dataForSlow, setDataForSlow] = useState([]);

  let { id } = useParams();

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
      //for LineChart
      for (const obj of data) {
        if (obj.convertedDay == id) {
          let result = [], result2 = []
          let map = {}, map2 = {}
          map['slow_breakfast'] = obj.slow_breakfast
          map['slow_lunch'] = obj.slow_lunch
          map['slow_afternoon'] = obj.slow_afternoon
          map['slow_dinner'] = obj.slow_dinner
          map['slow_evening'] = obj.slow_evening
          map['slow_late_night'] = obj.slow_late_night
          map2['fast_breakfast'] = obj.fast_breakfast
          map2['fast_lunch'] = obj.fast_lunch
          map2['fast_afternoon'] = obj.fast_afternoon
          map2['fast_dinner'] = obj.fast_dinner
          map2['fast_evening'] = obj.fast_evening
          map2['fast_late_night'] = obj.fast_late_night
          result.push(map)
          result2.push(map2)
          setDataForSlow(result)
          setDataForFast(result2)
        }
      }     
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}, []);

  // console.log(dataByDay, 'dataByDay')
  // console.log(dataForTTS, 'dataForTTS')
  // console.log(dataForFast, 'dataForFast')
  // console.log(dataForSlow, 'dataForSlow')

  return (
      <div className="bar-day-detail-container">
          <div className="pie-chart bar-day-detail-container-child-container">
          <h1>Customer Visit on {id}<span className="head-date">(per day of week)</span></h1>
            <PieChart 
            data={dataByDay.filter(data => Object.keys(colors).includes(data.name))}
            colors={colors}
            />
            <div className="fields" >
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
            <div className="desc">The chart above shows how many customers visit per Day Part for day of week</div>
          </div>
          <div className="bar-chart-tts bar-day-detail-container-child-container" >
          <h1>Average TTS on {id}<span className="head-date">(per day of week)</span></h1>
            {dataForTTS.length ? <BarChart data={dataForTTS} /> : null}
            <div className="desc"> The chart above shows average TTS(total time to service) per Day Part for day of week</div>
          </div>
          <div className="line-chart-tts bar-day-detail-container-child-container">
            <h1>Fastest & Avg & Slowest on {id}<span className="head-date">(per day of week)</span></h1>
            {dataForFast.length ? <LineChart data={dataForFast} data2={dataForSlow} data3={dataForTTS} /> : null}
            <div className="fields" style={{ padding: '1% 0 0 6%' }}>
                    <div className="field">
                      <label style={{ color: "orange" }}>
                          Fastest TTS
                      </label>
                    </div>
                    <div className="field">
                      <label style={{ color: "red" }}>
                          Average TTS
                      </label>
                    </div>
                    <div className="field">
                      <label style={{ color: "blue" }}>
                          Slowest TTS
                      </label>
                    </div>
            </div>
            <div className="desc">The chart above shows fastest, average, slowest TTS per Day Part for day of week</div>
          </div>          
      </div>
  );
}

export default BarDayDetail;