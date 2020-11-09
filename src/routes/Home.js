import React, { useEffect, useState } from "react";
import BarChartByDate from "../components/BarChartByDate";
import BarChartByDay from "../components/BarChartByDay";
import StackedBarChartByDate from "../components/StackedBarChartByDate";
import StackedBarChartByDay from "../components/StackedBarChartByDay";

const allKeys = [
  "breakfast",
  "lunch",
  "afternoon",
  "dinner",
  "evening",
  "late_night",
];

const colors = {
  breakfast: "navy",
  lunch: "green",
  afternoon: "blue",
  dinner: "orange",
  evening: "black",
  late_night: "red",
};

const allStackedKeys = [
  "breakfast",
  "lunch",
  "afternoon",
  "dinner",
  "evening",
  "late_night",
];

function Home() {
    const [barChartdataByDate, setBarChartdataByDate] = useState([]);
    const [barChartdataByDay, setBarChartdataByDay] = useState([]);
    const [stackedBarChartdataByDate, setStackedBarChartdataByDate] = useState(
        []
    );
    const [stackedBarChartdataByDay, setStackedBarChartdataByDay] = useState([]);
    const [keys, setKeys] = useState(allKeys);
    const [stackedKeys, setStackedKeys] = useState(allStackedKeys);
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);

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
        <div
            className="bar-chart-date child-container"
            style={{ display: toggle ? "none" : "block" }}
        >
            <h1>
            Customer Data Overview<span className="head-date"> (8/3 ~ 8/{barChartdataByDate.length - 1 + 3})</span>
            </h1>
            <BarChartByDate data={barChartdataByDate} />
            <div className="fields d-flex justify-content-between px-2">
            <button className="btn btn-info" onClick={() => setToggle(!toggle)}>
                Show Data By Day Part
            </button>
            <label>Click bar to view additional details</label>
            </div>
            <div className="desc">Each bar shows how many customer visit per date<br/>
            It's seperated by 75(red), 100(orange), max(green)</div>
        </div>
        <div
            className="stacked-bar-chart-date child-container"
            style={{ display: toggle ? "block" : "none" }}
        >
            <h1>
            Daily Overview Detail<span className="head-date"> (8/{stackedBarChartdataByDate.length &&
                stackedBarChartdataByDate[0].date} ~ 8/{stackedBarChartdataByDate.length &&
                stackedBarChartdataByDate[stackedBarChartdataByDate.length-1].date})</span></h1>
            <StackedBarChartByDate
            data={stackedBarChartdataByDate}
            keys={keys}
            colors={colors}
            />
            <div className="fields d-flex justify-content-between">
            <button className="btn btn-info" onClick={() => setToggle(!toggle)}>
                go back
            </button>
            {allKeys.map((key) => (
                <div key={key} className="field">
                <input
                    id={key}
                    type="checkbox"
                    checked={keys.includes(key)}
                    onChange={(e) => {
                    if (e.target.checked) {
                        setKeys(Array.from(new Set([...keys, key])));
                    } else {
                        setKeys(keys.filter((_key) => _key !== key));
                    }
                    }}
                />
                <label style={{ color: colors[key] }}>{key}</label>
                </div>
            ))}
            </div>
            <div className="desc">Each bar shows how many customer visit per Day Part for each date.<br />
            You could check how much portion of this Day Part per date using the checkboxes above
            </div>
        </div>
        <div
            className="bar-chart-day child-container"
            style={{ display: toggle2 ? "none" : "block" }}
        >
            <h1 style={{ color: "green" }}>
            Customer Data Overview<span className="head-date"> (8/{stackedBarChartdataByDate.length &&
                stackedBarChartdataByDate[0].date} ~ 8/{stackedBarChartdataByDate.length &&
                stackedBarChartdataByDate[stackedBarChartdataByDate.length-1].date})</span></h1>
            <BarChartByDay data={barChartdataByDay} />
            <div className="fields d-flex justify-content-between px-2">
            <button className="btn btn-info" onClick={() => setToggle2(!toggle2)}>
                Show Data By Day Part
            </button>
            <label>Click bar to view additional details</label>
            </div>
            <div className="desc">Each bar shows how many customer visit per day of week<br />
            It's seperated by 300(red), 400(orange), max(green)</div>
        </div>
        <div
            className="stacked-bar-chart-day child-container"
            style={{ display: toggle2 ? "block" : "none" }}
        >
            <h1 style={{ color: "green" }}>
            Monthly Overview Detail<span className="head-date"> (8/{stackedBarChartdataByDate.length &&
                stackedBarChartdataByDate[0].date} ~ 8/{stackedBarChartdataByDate.length &&
                stackedBarChartdataByDate[stackedBarChartdataByDate.length-1].date})</span></h1>
            <StackedBarChartByDay
            data={stackedBarChartdataByDay}
            keys={stackedKeys}
            colors={colors}
            />
            <div className="fields d-flex justify-content-between">
            <button className="btn btn-info" onClick={() => setToggle2(!toggle2)}>
                go back
            </button>
            {allStackedKeys.map((key2) => (
                <div key={key2} className="field">
                <input
                    id={key2}
                    type="checkbox"
                    checked={stackedKeys.includes(key2)}
                    onChange={(e) => {
                    if (e.target.checked) {
                        setStackedKeys(Array.from(new Set([...stackedKeys, key2])));
                    } else {
                        setStackedKeys(stackedKeys.filter((_key) => _key !== key2));
                    }
                    }}
                />
                <label style={{ color: colors[key2] }}>{key2}</label>
                </div>
            ))}
            </div>
            <div className="desc">Each bar shows how many customer visit per Day Part for each day of week.<br />
            You could check how much portion of this Day Part per day of week using the checkboxes above
            </div>
            </div>
        </div>
    );
}

export default Home;
