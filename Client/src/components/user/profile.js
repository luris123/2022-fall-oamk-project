import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import viewService from '../../services/viewService';
import loginService from '../../services/loginService';
import View from '../view';
import { Card } from 'react-bootstrap';
import "../../css/profile.css";
import { BiTrash } from "react-icons/bi";

function Profile() {

    const [user, setUser] = useState(null);

    const [v1v2Toggle, setV1V2Toggle] = useState(false);
    const [v1v2Description, setV1V2Description] = useState("");

    const [v3v4v10Toggle, setV3V4V10Toggle] = useState(false);
    const [v3v4v10Description, setV3V4V10Description] = useState("");

    const [v5Toggle, setV5Toggle] = useState(false);
    const [v5Description, setV5Description] = useState("");

    const [v6Toggle, setV6Toggle] = useState(false);
    const [v6Description, setV6Description] = useState("");

    const [v6v7Toggle, setV6V7Toggle] = useState(false);
    const [v6v7Description, setV6V7Description] = useState("");

    const [v8Toggle, setV8Toggle] = useState(false);
    const [v8Description, setV8Description] = useState("");

    const [v9Toggle, setV9Toggle] = useState(false);
    const [v9Description, setV9Description] = useState("");

    const [displayOption, setDisplayOption] = useState(false);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupOpen2, setPopupOpen2] = useState(false);

    const [deletePassword, setDeletePassword] = useState("");

    const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'));

    const refreshPage = () => {
        window.location.reload(false);
    }

    useEffect(() => {
        console.log(userJSON);
        setUser(userJSON);

    }, []);

    const handleCreateView = async (event) => {
        event.preventDefault();

        //if every toggle is false then alert user to select at least one visualization
        if (!v1v2Toggle && !v3v4v10Toggle && !v5Toggle && !v6Toggle && !v6v7Toggle && !v8Toggle && !v9Toggle) {
            alert("Valitse ainakin yksi visualisaatio luodaksesi näkymän");
            return;
        }

        const settings = {
            "v1v2": v1v2Toggle,
            "v1v2text": v1v2Description,
            "v3v4v10": v3v4v10Toggle,
            "v3v4v10text": v3v4v10Description,
            "v5": v5Toggle,
            "v5text": v5Description,
            "v6": v6Toggle,
            "v6text": v6Description,
            "v7v10": v6v7Toggle,
            "v7v10text": v6v7Description,
            "v8": v8Toggle,
            "v8text": v8Description,
            "v9": v9Toggle,
            "v9text": v9Description,
            "display": displayOption
        };

        try {
            const response = await viewService.createView({
                settings
            });

            console.log(response);

            //update local storage user
            userJSON.views = response.views;
            window.localStorage.setItem('loggedUser', JSON.stringify(userJSON));
            setUser(userJSON);

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteView = async (url) => {
        //event.preventDefault();
        console.log(url)
        try {
            const response = await viewService.deleteView({
                url
            });

            console.log(response);

            //update local storage user
            userJSON.views = response.views;
            window.localStorage.setItem('loggedUser', JSON.stringify(userJSON));
            setUser(userJSON);
            clear();

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = async () => {
        console.log(userJSON.username)
        try {
            const response = await loginService.deleteAccount({
                password: deletePassword,
                token: JSON.stringify(userJSON.token)
            });

            console.log(response);

            //update local storage user
            window.localStorage.removeItem('loggedUser');
            setUser(null);
            refreshPage();
        } catch (error) {
            window.alert(error.response.data.error);
        }
    }

    const clear = () => {
        setV1V2Toggle(false);
        setV3V4V10Toggle(false);
        setV5Toggle(false);
        setV6Toggle(false);
        setV6V7Toggle(false);
        setV8Toggle(false);
        setV9Toggle(false);
        setDisplayOption(false);
        setPopupOpen(false)

        setV1V2Description("");
        setV3V4V10Description("");
        setV5Description("");
        setV6Description("");
        setV6V7Description("");
        setV8Description("");
        setV9Description("");
    }

    if (user === null) {
        return (
            <div>
                <h2>Et ole kirjautunut sisään</h2>
            </div>
        )
    }

    return (
        <>
            <Card className='text-center profile-card'>
                <Card.Body >
                    <Card.Title>Käyttäjäprofiili</Card.Title>
                    <Card.Subtitle>Käyttäjätunnus: {user.username}</Card.Subtitle>
                    <Card.Subtitle>Näkymien määrä: {user.views.length}</Card.Subtitle>
                    <ul>
                        {user.views.map((view, i) => {
                            let url = "/view/" + view.url;
                            return <li key={i}>Näkymä: <Link to={url} onClick={() => View()}>{view.url}</Link> <span className='deletebutton' onClick={() => handleDeleteView(view.url)} ><BiTrash size={20}/></span></li>
                        })}
                    </ul>
                    <Popup open={popupOpen} modal nested closeOnDocumentClick={false}>
                        <div className='newView'>
                            <div className='newViewContent'>
                                <h1>Luo uusi näkymä</h1>
                                <Form onSubmit={handleCreateView}>
                                    <h4>Lämpötilatiedot ja co2 pitoisuudet</h4>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onClick={() => setV1V2Toggle(!v1v2Toggle)} label="Global historical surface temperature anomalies from January 1850 onwards combined with Northern Hemisphere 2,000-year temperature reconstruction " />
                                        {v1v2Toggle
                                            ? <Form.Control type="text" onChange={(e) => setV1V2Description(e.target.value)} placeholder="Enter description" />
                                            : null
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onClick={() => setV3V4V10Toggle(!v3v4v10Toggle)} label="Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958 combined with Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements and Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements" />
                                        {v3v4v10Toggle
                                            ? <Form.Control type="text" onChange={(e) => setV3V4V10Description(e.target.value)} placeholder="Enter description" />
                                            : null
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onClick={() => setV5Toggle(!v5Toggle)} label="Vostok Ice Core CO2 measurements, 417160 - 2342 years BP" />
                                        {v5Toggle
                                            ? <Form.Control type="text" onChange={(e) => setV5Description(e.target.value)} placeholder="Enter description" />
                                            : null
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onClick={() => setV6Toggle(!v6Toggle)} label="Ice core 800k year composite study CO2 measurements" />
                                        {v6Toggle
                                            ? <Form.Control type="text" onChange={(e) => setV6Description(e.target.value)} placeholder="Enter description" />
                                            : null
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onClick={() => setV6V7Toggle(!v6v7Toggle)} label="Evolution of global temperature over the past two million years combined with Ice core 800k year composite study CO2 measurements" />
                                        {v6v7Toggle
                                            ? <Form.Control type="text" onChange={(e) => setV6V7Description(e.target.value)} placeholder="Enter description" />
                                            : null
                                        }
                                    </Form.Group>
                                    <h4>Päästölähteet</h4>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onClick={() => setV8Toggle(!v8Toggle)} label="CO2 emissions by country" />
                                        {v8Toggle
                                            ? <Form.Control type="text" onChange={(e) => setV8Description(e.target.value)} placeholder="Enter description" />
                                            : null
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onClick={() => setV9Toggle(!v9Toggle)} label="CO2 emissions by sectors" />
                                        {v9Toggle
                                            ? <Form.Control type="text" onChange={(e) => setV9Description(e.target.value)} placeholder="Enter description" />
                                            : null
                                        }
                                    </Form.Group>
                                    <h4>Valitse näkymän asettelu</h4>
                                    <p>Asettelu on automaattisesti asetettu sarakeasetteluun, jossa jokainen visualisointi on allekkain.</p>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onClick={() => setDisplayOption(!displayOption)} label="Vaihda 2-sarakkeen rinnakkaisasetteluun" />
                                    </Form.Group>
                                    <Button type='submit' onClick={() => setPopupOpen(false)}>
                                        Luo näkymä
                                    </Button>
                                    <Button onClick={() => { clear(); setPopupOpen(false) }}>
                                        Sulje
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Popup>
                    <Popup open={popupOpen2} modal nested closeOnDocumentClick={false}>
                        <div className='newView'>
                            <div className='newViewContent'>
                                <h1>Poista käyttäjä</h1>
                                <Form onSubmit={handleDeleteUser}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Kirjoita salasanasi vahvistaaksesi tilin poisto</Form.Label>
                                        <Form.Control type="text" onChange={(e) => setDeletePassword(e.target.value)} placeholder="Salasana" />
                                    </Form.Group>
                                    <Button type='submit' onClick={() => setPopupOpen2(false)}>
                                        Poista käyttäjä
                                    </Button>
                                    &nbsp;
                                    <Button onClick={() => { setPopupOpen2(false) }}>
                                        Sulje
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Popup>
                    <div className="d-grid gap-2">
                        <Button type='primary' onClick={() => setPopupOpen(true)}>Luo uusi näkymä</Button>
                        <Button type='primary' onClick={() => setPopupOpen2(true)}>Poista käyttäjä</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}


export default Profile;