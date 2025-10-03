import "./MainContent.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainContent({ weather, onDateChange, selectedDay, selectedMonth }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (day && month) {
      onDateChange(day, month);
      setShowPrompt(false);
      setDay("");
      setMonth("");
    }
  };

  return (
    <div className="main-content">
      <div className="main-content__activities-section"></div>

      <div className="main-content__weather">
        <span className="main-content__temp">{weather.results.Temperature_AVG.KDE}°</span>
        <span className="main-content__weather-description">
          {weather.weather.weather}
        </span>
        {(selectedDay && selectedMonth) && (
          <span className="main-content__date-caption">
            {String(selectedDay).padStart(2, '0')}/{String(selectedMonth).padStart(2, '0')}
          </span>
        )}

        <div className="main-content__buttons">
          <button
            className="main-content__button"
            onClick={() => navigate("/location")}
          >
            Location
          </button>
          <button
            className="main-content__button"
            onClick={() => navigate("/")}
          >
            Sector
          </button>
          <button
            className="main-content__button"
            onClick={() => setShowPrompt(true)}
          >
            Date
          </button>
        </div>
      </div>

      {showPrompt && (
        <div className="date-prompt-overlay">
          <div className="date-prompt">
            <h3>Select Date</h3>
            <input
              type="number"
              placeholder="Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="number"
              placeholder="Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <div className="date-prompt__actions">
              <button onClick={handleConfirm}>OK</button>
              <button onClick={() => setShowPrompt(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
