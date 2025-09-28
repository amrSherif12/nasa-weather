import "./WeatherCondition.css"

export default function WeatherCondition({ value , title, description }) {

    let img = "";

    function titleToImg(title) {      
        switch (title) {
          // General Public
          case "Temperature_AVG":
            img = "temp";
            break;
          case "Temperature_Range":
            img = "temp";
            break;
          case "Relative_Humidity":
            img = "humidity";
            break;
          case "Wind_Speed_2m":
            img = "wind";
            break;
          case "Cloud_Cover_Fraction":
            img = "cloudy";
            break;
      
          // Farmers & Agriculture
          case "Precipitation":
            img = "rain";
            break;
          case "Top_Soil_Moisture":
            img = "soil";
            break;
          case "Root_Zone_Soil_Moisture":
            img = "soil";
            break;
          case "Surface_Solar_Radiation":
            img = "sun";
            break;
          case "Snow_Depth":
            img = "snow";
            break;
      
          // Energy Sector
          case "TOA_Solar_Radiation":
            img = "sun";
            break;
          case "Surface_LW_Downward_Radiation":
            img = "sun";
            break;
          case "Wind_Speed_10m":
            img = "wind";
            break;
          case "Wind_Direction_10m":
            img = "wind";
            break;
          case "Wind_Direction_50m":
            img = "wind";
            break;
          case "Surface_Runoff":
            img = "runoff";
            break;
      
          // Public Health & Urban Planning
          case "Max_Temperature":
            img = "temp";
            break;
          case "Min_Temperature":
            img = "temp";
            break;
          case "Aerosol_Optical_Depth_550nm":
            img = "pollution";
            break;
          case "Surface_Pressure":
            img = "pressure";
            break;
      
          // Transportation & Logistics
          case "Dew_Point_Temperature":
            img = "dew";
            break;
          case "Total_Precipitation":
            img = "rain";
            break;
      
          // Water
          case "Evapotranspiration":
            img = "humidity";
            break;
      
          default:
            img = "rain";
            break;
        }
      
        return img;
      }
      

    return <div className="weather-condition">
        <div className="weather-condition__head">
            <img className="weather-condition__icon" src={`/assets/condition_icons/${titleToImg(title)}.png`} alt="icon" />
        <div className="weather-condition__data">
            <span className="weather-condition__title">{title.replace(/_/g, " ")
  .replace(/\b\w/g, char => char.toUpperCase())}</span>
            <span className="weather-condition__value">{value}</span>
        </div>
        </div>
        <p className="weather-condition__description">
               <ul>
    {description.map((des, index) => (
      <li key={index}>{des}</li>
    ))}
  </ul>
        </p>
    </div>
}