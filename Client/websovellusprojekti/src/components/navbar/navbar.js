import  { NavLink } from "react-router-dom";
import '../../index.css'


function Navbar() {
    return (
        <div className="navbar">
            <h1>Navbar</h1>
            <ul>
                <li><NavLink to="/">Etusivu</NavLink></li>
                <li><NavLink to="/emissionSources">Lämpötilatiedot ja co2 pitoisuudet</NavLink></li>
                <li><NavLink to="/temperature">Päästölähteet</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar;