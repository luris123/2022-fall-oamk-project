import  { Link } from "react-router-dom";
import { Navbar, Nav, NavLink} from 'react-bootstrap'

function Navigationbar() {
    return (
        <Navbar collapseOnSelect expand ="sm" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="navBarScroll" data-bs-target="#navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink eventKey="1" as={Link} to="/">Etusivu</NavLink>
                    <NavLink eventKey="2" as={Link} to="/emissionSources">Päästölähteet</NavLink>
                    <NavLink eventKey="3" as={Link} to="/temperature">Lämpötilatiedot ja co2 pitoisuudet</NavLink>
                    <NavLink eventKey="4" as={Link} to="/profile">Profiili</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Navigationbar;