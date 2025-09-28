import { useState } from "react";
import Sector from "../../Components/Sector/Sector.js"
import "./Sectors.css"

export default function Sectors({ sector, setSector }) {
    const [openSector, setOpenSector] = useState(sector?.value || 0);
    return <div className="sectors">
        <div class="sectors">
      <div class="sectors__heading">
        <h1 class="sectors__title section-title">Sectors</h1>
        <h2 class="sectors__description section-description">
          Choose a sector that interests you
        </h2>
      </div>
      <div className="sectors__wrapper">
        <Sector img="general" setOpenSector={setOpenSector} openSector={openSector} value={0} name="General Public" setSector={setSector} />
        <Sector img="energy" setOpenSector={setOpenSector} openSector={openSector} value={1} name="Energy Sector" setSector={setSector} />
        <Sector img="health" setOpenSector={setOpenSector} openSector={openSector} value={2} name="Public Health" setSector={setSector} />
        <Sector img="water" setOpenSector={setOpenSector} openSector={openSector} value={3} name="Water Management" setSector={setSector} />
        <Sector img="transportation" setOpenSector={setOpenSector} openSector={openSector} value={4} name="Transportation" setSector={setSector} />
        <Sector img="farmers" setOpenSector={setOpenSector} openSector={openSector} value={5} name="Farmers" setSector={setSector} />
      </div>
      </div>
    </div>
}