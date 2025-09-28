import Weather from "./Pages/Weather/Weather"
import Sectors from "./Pages/Sectors/Sectors"
import Location from "./Pages/Location/Location"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem('weatherPosition');
    return savedPosition ? JSON.parse(savedPosition) : null;
  });

  const [sector, setSector] = useState(() => {
    const savedSector = localStorage.getItem('sector');
    return savedSector ? JSON.parse(savedSector) : null;
  });

  useEffect(() => { 
    if (position) {
      localStorage.setItem('weatherPosition', JSON.stringify(position));
    } else {
      localStorage.removeItem('weatherPosition');
    }
  }, [position])

  useEffect(() => { 
    if (sector) {
      localStorage.setItem('sector', JSON.stringify(sector));
    } else {
      localStorage.removeItem('sector');
    }
  }, [sector])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sectors sector={sector} setSector={setSector} />} />
        <Route path="/location" element={<Location position={position} setPosition={setPosition} />} />
        <Route path="/weather" element={<Weather position={position} sector={sector} />} />
      </Routes>
    </Router>
  );
}

export default App;
