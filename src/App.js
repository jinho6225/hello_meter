import React, { useEffect, useState } from "react";
import "./App.css";
import BarChartByDate from "./BarChartByDate";
import BarChartByDay from "./BarChartByDay";
import StackedBarChartByDate from "./StackedBarChartByDate";
import StackedBarChartByDay from "./StackedBarChartByDay";

const allKeys = [
  "breakfast",
  "lunch",
  "afternoon",
  "dinner",
  "evening",
  "late_night",
];

const colors = {
  "breakfast": 'navy',
  "lunch": 'green',
  "afternoon": 'blue',
  "dinner": 'orange',
  "evening": 'black',
  "late_night": 'red',
};

const allStackedKeys = [
  "breakfast",
  "lunch",
  "afternoon",
  "dinner",
  "evening",
  "late_night",
];

function App() {
  const [barChartdataByDate, setBarChartdataByDate] = useState([]);
  const [barChartdataByDay, setBarChartdataByDay] = useState([]);
  const [stackedBarChartdataByDate, setStackedBarChartdataByDate] = useState([]);
  const [stackedBarChartdataByDay, setStackedBarChartdataByDay] = useState([]);
  const [keys, setKeys] = useState(allKeys);
  const [stackedKeys, setStackedKeys] = useState(allStackedKeys);


  useEffect(() => {
    fetch(`/api/barchartbydate`)
      .then((res) => res.json())
      .then((data) => {
        setBarChartdataByDate(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/stackedbarchartbydate`)
      .then((res) => res.json())
      .then((data) => {
        setStackedBarChartdataByDate(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/barchartbyday`)
      .then((res) => res.json())
      .then((data) => {
        setBarChartdataByDay(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/stackedbarchartbyday`)
      .then((res) => res.json())
      .then((data) => {
        setStackedBarChartdataByDay(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="bar-chart-date child-container">
        <h1>BarChartByDate</h1>
        <BarChartByDate data={barChartdataByDate} />
      </div>
      <div className="stacked-bar-chart-date child-container">
        <h1>StackedBarChartByDate</h1>
        <StackedBarChartByDate
          data={stackedBarChartdataByDate}
          keys={keys}
          colors={colors}
        />
        <div className="fields">
          {allKeys.map(key => (
            <div key={key} className="field">
              <input
                id={key}
                type="checkbox"
                checked={keys.includes(key)}
                onChange={e => {
                  if (e.target.checked) {
                    setKeys(Array.from(new Set([...keys, key])));
                  } else {
                    setKeys(keys.filter(_key => _key !== key));
                  }
                }}
              />
              <label htmlFor={key} style={{ color: colors[key] }}>
                {key}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="bar-chart-day child-container">
        <h1 style={{ color: "green" }}>BarChartByDay</h1>
        <BarChartByDay data={barChartdataByDay} />
      </div>
      <div className="stacked-bar-chart-day child-container">
        <h1 style={{ color: "green" }}>StackedBarChartByDay</h1>
        <StackedBarChartByDay
          data={stackedBarChartdataByDay}
          keys={stackedKeys}
          colors={colors}
        />
        <div className="fields">
          {allStackedKeys.map(key => (
            <div key={key} className="field">
              <input
                id={key}
                type="checkbox"
                checked={stackedKeys.includes(key)}
                onChange={e => {
                  if (e.target.checked) {
                    setStackedKeys(Array.from(new Set([...stackedKeys, key])));
                  } else {
                    setStackedKeys(stackedKeys.filter(_key => _key !== key));
                  }
                }}
              />
              <label htmlFor={key} style={{ color: colors[key] }}>
                {key}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
