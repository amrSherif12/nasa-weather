import "./SideBar.css"
import WeatherCondition from "../WeatherCondition/WeatherCondition.js"


export default function SideBar({ conditions }) {
        return <div className="sidebar">
        <div className="sidebar__conditions">
            {Object.entries(conditions).map(([key, condition]) => {
                return <WeatherCondition description={[condition.Interpretation, condition.GaussianFit, condition.GMM]} value={condition.KDE} title={key} />
            })}
        </div>
    </div>;
}