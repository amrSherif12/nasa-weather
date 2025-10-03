import "./Weather.css";
import MainContent from "../../Components/MainContent/MainContent.js";
import SideBar from "../../Components/SideBar/SideBar.js";
import { useEffect, useState } from "react";
import { fetchWeather } from "../../Services/api.js";
import SimpleLineChart from "../../Components/Graphs/LineGraph.js";

function Weather({ position, sector }) {
  function conditionToImg(condition) {
    let img;
    let index = 0;
  switch (condition) {
    case "Snow":
      img = "snow";
      break;
    case "Extreme Cold":
      img = "snow";
      break;
    case "Storm":
      img = "thunder";
      break;
    case "Gale":
      img = "clouds";
      break;
    case "Very Windy":
      img = "clouds";
      break;
    case "Windy":
      img = "clouds";
      break;
    case "Breezy":
      img = "sunny";
      break;
    case "Torrential Rain":
      img = "rain";
      break;
    case "Heavy Rain":
      img = "rain";
      break;
    case "Moderate Rain":
      img = "rain";
      break;
    case "Light Rain":
      img = "rain";
      break;
    case "Drizzle (Breezy)":
      img = "rain";
      break;
    case "Heatwave":
      img = "sunny";
      break;
    case "Humid Heat":
      img = "sunny";
      break;
    case "Extreme Heat":
      img = "sunny";
      break;
    case "Sunny":
      img = "sunny";
      break;
    case "Mostly Sunny":
      img = "sunny";
      break;
    case "Partly Cloudy":
      img = "clouds";  
      break;
    case "Mostly Cloudy":
      img = "clouds";
      break;
    case "Overcast":
      img = "clouds";
      break;
    case "Clear":
      img = "sunny";
      break;
    case "Unknown Climatology":
      img = "sunny";
      break;
    default:
      img = "sunny";
      break;
  }
  if (img === "rain") index = Math.floor(Math.random() * 2) + 1;
  if (img === "thunder" || img === "snow") index = Math.floor(Math.random() * 3) + 1;
  if (img === "clouds" || img === "sunny") index = Math.floor(Math.random() * 4) + 1;

  return {img: `/assets/${img}/${index}.jpg`, audio: `/assets/${img}/sound.mp3`};
}

  const [weather, setWeather] = useState(null);
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(false);

  function preloadMedia(imageUrl, audioUrl) {
    const imagePromise = new Promise((resolve) => {
      const imgEl = new Image();
      imgEl.onload = () => resolve();
      imgEl.onerror = () => resolve();
      imgEl.src = imageUrl;
    });

    const audioPromise = new Promise((resolve) => {
      const audio = new Audio();
      const done = () => {
        audio.removeEventListener("canplaythrough", done);
        audio.removeEventListener("loadeddata", done);
        resolve();
      };
      audio.addEventListener("canplaythrough", done, { once: true });
      audio.addEventListener("loadeddata", done, { once: true });
      audio.src = audioUrl;
      audio.load();
      setTimeout(done, 3000);
    });

    return Promise.all([imagePromise, audioPromise]);
  }

  async function getWeather(lat, lng, sec, d, m) {
    try {
      setIsLoading(true);
      const data = await fetchWeather(lat, lng, sec, d, m);
      const nextMedia = conditionToImg(data.data.weather.weather);
      await preloadMedia(nextMedia.img, nextMedia.audio);
      setWeather(data);
    } finally {
      setIsLoading(false);
    }
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

  console.log(conditionToImg(weather.data.weather.weather).audio);

  const media = conditionToImg(weather.data.weather.weather);

  return (
    <div className={`weather`}>
      <audio autoPlay loop hidden key={media.audio} preload="auto">
        <source src={media.audio} type="audio/mp3" />
      </audio>
      {isLoading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          color: "white"
        }}>
          <div style={{
            border: "6px solid rgba(255, 255, 255, 0.2)",
            borderTop: "6px solid #ffffff",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            animation: "spin 1s linear infinite",
            marginRight: "16px"
          }}></div>
          Loading new data...
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <div
      style={{backgroundImage:`linear-gradient(90deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0),  rgba(0, 0, 0, 0)), url("${media.img}")`}}
     className={`main-page`}
       
     >
        <MainContent
          weather={weather.data}
          selectedDay={day}
          selectedMonth={month}
          onDateChange={(d, m) => {
            setDay(d);
            setMonth(m);
          }}
        />
        <SideBar conditions={weather.data.results} sector={sector} />
      </div>
      <div className="charts">
        {weather.data.graph &&
          Object.entries(weather.data.graph).map(([key, gr], index) => (
            <SimpleLineChart key={index} x={gr[0]} y={gr[1]} title={key} />
          ))}
      </div>
    </div>
  );
}

export default Weather;
