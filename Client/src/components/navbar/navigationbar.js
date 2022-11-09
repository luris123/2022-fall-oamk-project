import React from "react";
import  { Link } from "react-router-dom";
import { Navbar, Nav, NavLink} from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';


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
                    <NavDropdown
                        id="nav-dropdown"
                        title="Kirjaudu"
                        menuVariant="light"
                    >
                        <Form>
                            <Form.Group>
                                <Form.Label>Käyttäjätunnus</Form.Label>
                                <Form.Control type="user" placeholder="Syötä käyttäjätunnus" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control type="password" placeholder="Syötä salasana" />
                            </Form.Group>
                            <Button>
                                Kirjaudu Sisään
                            </Button>
                            <Button className="me-2">
                                Luo uusi tili
                            </Button>
                        </Form>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Navigationbar;