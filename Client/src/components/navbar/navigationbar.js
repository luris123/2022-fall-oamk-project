import React, { useState, useEffect } from 'react';
import loginService from '../../services/loginService';
import  { Link } from "react-router-dom";
import { Navbar, Nav, NavLink} from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function Navigationbar() {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          loginService.setToken(user.token)
        }
      }, [])

      const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username, password,
          })
          setUser(user)
          loginService.setToken(user.token)
          window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
          ) 
          setUsername('')
          setPassword('')
        } catch (exception) {
            console.log(exception)
        }
      }

      const handleRegister = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.register({
                username, password,
            })
            loginService.setToken(user.token)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
            window.alert('Rekisteröityminen onnistui!')
        } catch (exception) {
            console.log(exception)
        }
        }


    if (user === null) {
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
                        <Form onSubmit={handleLogin}>
                            <Form.Group>
                                <Form.Label>Käyttäjätunnus</Form.Label>
                                <Form.Control onChange={({ target }) => setUsername(target.value)} type="username" placeholder="Syötä käyttäjätunnus"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control onChange={({ target }) => setPassword(target.value)} type="password" placeholder="Syötä salasana" />
                            </Form.Group>
                            <Button type='submit'>
                                Kirjaudu Sisään
                            </Button>
                        </Form>

                    </NavDropdown>
                    <NavDropdown
                        id="nav-dropdown"
                        title="Rekisteröidy"
                        menuVariant="light"
                    >
                        <Form onSubmit={handleRegister}>
                            <Form.Group>
                                <Form.Label>Käyttäjätunnus</Form.Label>
                                <Form.Control onChange={({ target }) => setUsername(target.value)} type="username" placeholder="Syötä käyttäjätunnus"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control onChange={({ target }) => setPassword(target.value)} type="password" placeholder="Syötä salasana" />
                            </Form.Group>
                            <Button type='submit'>
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
            <Navbar collapseOnSelect expand ="sm" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="navBarScroll" data-bs-target="#navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink eventKey="1" as={Link} to="/">Etusivu</NavLink>
                    <NavLink eventKey="2" as={Link} to="/emissionSources">Päästölähteet</NavLink>
                    <NavLink eventKey="3" as={Link} to="/temperature">Lämpötilatiedot ja co2 pitoisuudet</NavLink>
                    <NavLink eventKey="4" as={Link} to="/profile">Profiili</NavLink>
                    <Button onClick={() => {window.localStorage.removeItem('loggedUser'); setUser(null)}}>logout</Button>
            
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    
}
}
export default Navigationbar;