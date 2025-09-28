import "./Weather.css";
import MainContent from "../../Components/MainContent/MainContent.js";
import SideBar from "../../Components/SideBar/SideBar.js";
import { useEffect, useState } from "react";
import { fetchWeather } from "../../Services/api.js";
import SimpleLineChart from "../../Components/Graphs/LineGraph.js";

function Weather({ position, sector }) {
  const [weather, setWeather] = useState(null);
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  async function getWeather(lat, lng, sec, d, m) {
    console.log(d, m);
    console.log("ssssssssssssssssssssssssssssssssssss")
    const data = await fetchWeather(lat, lng, sec, d, m);
    setWeather(data);
  }

  useEffect(() => {
    if (position?.lat && position?.lng) {
      getWeather(position.lat, position.lng, sector, day, month);
    }
  }, [position, sector, day, month]);

  if (!position) {
    return <div>no cords</div>;
  }

  if (!weather) {
    const loadingPageStyle = {
      height: "100vh",
      width: "100vw",
      backgroundColor: "rgba(19, 19, 22, 1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "1.2rem",
    };

    const spinnerStyle = {
      border: "6px solid rgba(255, 255, 255, 0.2)",
      borderTop: "6px solid #ffffff",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      animation: "spin 1s linear infinite",
      marginBottom: "20px",
    };

    return (
      <div style={loadingPageStyle}>
        <div style={spinnerStyle}></div>
        <p>Analyzing data...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className={`weather`}>
      <div
        className={`main-page ${
          weather.results.Temperature_AVG.KDE < 10 ? "snow" : "sunny"
        }`}
      >
        <MainContent
          weather={weather.results}
          onDateChange={(d, m) => {
            setDay(d);
            setMonth(m);
          }}
        />
        <SideBar conditions={weather.results} sector={sector} />
      </div>
      <div className="charts">
        {weather.graph &&
          Object.entries(weather.graph).map(([key, gr], index) => (
            <SimpleLineChart key={index} x={gr[0]} y={gr[1]} title={key} />
          ))}
      </div>
    </div>
  );
}

export default Weather;
