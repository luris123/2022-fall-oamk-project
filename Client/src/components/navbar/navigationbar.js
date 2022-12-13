import React, { useState, useEffect, useContext } from 'react';
import loginService from '../../services/loginService';
import { Link } from "react-router-dom";
import { Navbar, Nav, NavLink } from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import '../../css/navigationbar.css';
import UserContext  from '../../context/userProvider.js';

function Navigationbar() {

    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user);
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')

        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.register({
                username, password,
            })
            
            setNotification("Rekisteröityminen onnistui")
            setUsername('')
            setPassword('')

            setTimeout(() => {
                setNotification(null)
            }, 3000)

        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }


    if (user === null || user === undefined) {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="navBarScroll" data-bs-target="#navbarScroll" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink eventKey="1" as={Link} to="/">Etusivu</NavLink>
                        <NavLink eventKey="2" as={Link} to="/emissionSources">Päästölähteet</NavLink>
                        <NavLink eventKey="3" as={Link} to="/temperature">Lämpötilatiedot ja co2 pitoisuudet</NavLink>
                        <NavDropdown
                            title="Kirjaudu"
                            menuVariant="light"
                            id="basic-nav-dropdown"
                        >
                            <Form onSubmit={handleLogin}>
                                <h5>Kirjaudu</h5>
                                {error
                                    ? <div className="error">{error}</div>
                                    : null
                                }
                                <Form.Group>
                                    <Form.Label>Käyttäjätunnus</Form.Label>
                                    <Form.Control onChange={({ target }) => setUsername(target.value)} type="username" placeholder='käyttäjätunnus' />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Salasana</Form.Label>
                                    <Form.Control onChange={({ target }) => setPassword(target.value)} type="password" placeholder='salasana' />
                                </Form.Group>
                                <Button type='submit'>
                                    Kirjaudu sisään
                                </Button>
                            </Form>
                        </NavDropdown>
                        <NavDropdown
                            title="Rekisteröidy"
                            menuVariant="light"
                            id="basic-nav-dropdown"
                        >

                            <Form onSubmit={handleRegister}>
                                <h5>Rekisteröidy</h5>
                                {error
                                    ? <div className="error">{error}</div>
                                    : null
                                }
                                {notification
                                    ? <div className="notification">{notification}</div>
                                    : null
                                }
                                <Form.Group>
                                    <Form.Label>Käyttäjätunnus</Form.Label>
                                    <Form.Control onChange={({ target }) => setUsername(target.value)} value={username} type="username" placeholder='käyttäjätunnus' />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label >Salasana</Form.Label>
                                    <Form.Control onChange={({ target }) => setPassword(target.value)} value={password} type="password" placeholder='salasana' />
                                </Form.Group>
                                <Button type='submit' data-testid="registerbutton">
                                    Luo uusi tili
                                </Button>
                            </Form>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    } else {
        return (
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="navBarScroll" data-bs-target="#navbarScroll" />
                <Navbar.Collapse>
                    <Nav>
                        <NavLink eventKey="1" as={Link} to="/">Etusivu</NavLink>
                        <NavLink eventKey="2" as={Link} to="/emissionSources">Päästölähteet</NavLink>
                        <NavLink eventKey="3" as={Link} to="/temperature">Lämpötilatiedot ja co2 pitoisuudet</NavLink>
                        <NavLink eventKey="4" as={Link} to="/profile">Profiili</NavLink>
                        <Button onClick={() => { window.localStorage.removeItem('loggedUser'); setUser(null); }}>Kirjaudu ulos</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )

    }
}
export default Navigationbar;