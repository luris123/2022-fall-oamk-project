import React, { useState, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import viewService from '../../services/viewService';
import loginService from '../../services/loginService';
import View from '../view';
import { Card } from 'react-bootstrap';
import "../../css/profile.css";
import { BiTrash } from "react-icons/bi";
import  UserContext from '../../context/userProvider';

function Profile() {

    const { user, setUser } = useContext(UserContext);

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

    const [error, setError] = useState("");

    const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'));

    const handleCreateView = async (event) => {
        event.preventDefault();

        //if every toggle is false then alert user to select at least one visualization
        if (!v1v2Toggle && !v3v4v10Toggle && !v5Toggle && !v6Toggle && !v6v7Toggle && !v8Toggle && !v9Toggle) {
            setError('Valitse vähintään yksi visualisointi');
            setTimeout(() => {
                setError(null);
            }, 2000);

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

            //update local storage user
            userJSON.views = response.views;
            window.localStorage.setItem('loggedUser', JSON.stringify(userJSON));
            setUser(userJSON);
            setPopupOpen(false);
            clear();

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

            //update local storage user
            userJSON.views = response.views;
            window.localStorage.setItem('loggedUser', JSON.stringify(userJSON));
            setUser(userJSON);
            clear();

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = async (event) => {
        event.preventDefault();

        if (deletePassword === "") {
            setError('Anna salasana');
            setTimeout(() => {
                setError(null);
            }, 2000);
            return;
        }

        try {
            const response = await loginService.deleteAccount({
                password: deletePassword,
                token: JSON.stringify(userJSON.token)
            });

            //update local storage user
            window.localStorage.removeItem('loggedUser');
            setUser(null);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError(null);
            }, 2000);
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

    if (user === null || user === undefined) {
        return (
            <div>
                <h2>Et ole kirjautunut sisään</h2>
            </div>
        )
    }
    else {
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
                                return <li key={i}>Näkymä: <Link to={url} onClick={() => View()}>{view.url}</Link> <span className='deletebutton' onClick={() => handleDeleteView(view.url)} ><BiTrash size={20} /></span></li>
                            })}
                        </ul>
                        <Popup className='scrollable' open={popupOpen} modal nested closeOnDocumentClick={false}>
                            <div className='newView'>
                                <div className='newViewContent'>
                                    <h1>Luo uusi näkymä</h1>
                                    {error
                                        ? <div className="error">{error}</div>
                                        : null
                                    }
                                    <Form onSubmit={handleCreateView}>
                                        <h4>Lämpötilatiedot ja co2 pitoisuudet</h4>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" onClick={() => setV1V2Toggle(!v1v2Toggle)} label="Maailmanlaajuinen pintalämpötilojen poikkeavuus tammikuusta 1850 lähtien & Pohjoisen pallonpuoliskon 2000 vuoden lämpötilakonstruktio " />
                                            {v1v2Toggle
                                                ? <FloatingLabel label="Kuvaus (vapaaehtoinen)"><Form.Control as="textarea" onChange={(e) => setV1V2Description(e.target.value)} style={{ height: '100px' }} /></FloatingLabel>
                                                : null
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" onClick={() => setV3V4V10Toggle(!v3v4v10Toggle)} label="Ilmakehän CO2-pitoisuudet Mauna Loa -mittauksista alkaen vuodesta 1958 & Etelämantereen Jää ytimen merkinnät ilmakehän CO2-suhteista yhdistettynä Mauna Loa -mittauksiin" />
                                            {v3v4v10Toggle
                                                ? <FloatingLabel label="Kuvaus (vapaaehtoinen)"><Form.Control type="textarea" onChange={(e) => setV3V4V10Description(e.target.value)} style={{ height: '100px' }} /></FloatingLabel>
                                                : null
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" onClick={() => setV5Toggle(!v5Toggle)} label="Vostokin jään C02 pitoisuuden mittaukset, vuodesta 415157 BC vuoteen 339 BC" />
                                            {v5Toggle
                                                ? <FloatingLabel label="Kuvaus (vapaaehtoinen)"><Form.Control type="text" onChange={(e) => setV5Description(e.target.value)} style={{ height: '100px' }} /></FloatingLabel>
                                                : null
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" onClick={() => setV6Toggle(!v6Toggle)} label="Jään C02 pitoisuuden mittaus 800t vuoden ajalta" />
                                            {v6Toggle
                                                ? <FloatingLabel label="Kuvaus (vapaaehtoinen)"><Form.Control type="text" onChange={(e) => setV6Description(e.target.value)} style={{ height: '100px' }} /></FloatingLabel>
                                                : null
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" onClick={() => setV6V7Toggle(!v6v7Toggle)} label="Maailman lämpötilan muutos 2 miljoonan vuoden ajalta & Jään C02 pitoisuuden mittaus 800t vuoden ajalta" />
                                            {v6v7Toggle
                                                ? <FloatingLabel label="Kuvaus (vapaaehtoinen)"><Form.Control type="text" onChange={(e) => setV6V7Description(e.target.value)} style={{ height: '100px' }} /></FloatingLabel>
                                                : null
                                            }
                                        </Form.Group>
                                        <h4>Päästölähteet</h4>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" onClick={() => setV8Toggle(!v8Toggle)} label="CO2-päästöt maiden mukaan" />
                                            {v8Toggle
                                                ? <FloatingLabel label="Kuvaus (vapaaehtoinen)"><Form.Control type="text" onChange={(e) => setV8Description(e.target.value)} style={{ height: '100px' }} /></FloatingLabel>
                                                : null
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" onClick={() => setV9Toggle(!v9Toggle)} label="CO2-päästöt sektoreittain" />
                                            {v9Toggle
                                                ? <FloatingLabel label="Kuvaus (vapaaehtoinen)"><Form.Control type="text" onChange={(e) => setV9Description(e.target.value)} style={{ height: '100px' }} /></FloatingLabel>
                                                : null
                                            }
                                        </Form.Group>
                                        <h4>Valitse näkymän asettelu</h4>
                                        <p>Asettelu on automaattisesti asetettu sarakeasetteluun, jossa jokainen visualisointi on allekkain.</p>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" onClick={() => setDisplayOption(!displayOption)} label="Vaihda 2-sarakkeen rinnakkaisasetteluun" />
                                        </Form.Group>
                                        <div className="d-grid gap-2">
                                            <Button type='submit'>
                                                Luo näkymä
                                            </Button>
                                            <Button onClick={() => { clear(); setPopupOpen(false) }}>
                                                Sulje
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Popup>
                        <Popup open={popupOpen2} modal nested closeOnDocumentClick={false}>
                            <div className='newView'>
                                <div className='newViewContent'>
                                    <h1>Poista käyttäjä</h1>
                                    {error
                                        ? <div className="error">{error}</div>
                                        : null
                                    }
                                    <Form onSubmit={handleDeleteUser}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Kirjoita salasanasi vahvistaaksesi tilin poisto</Form.Label>
                                            <Form.Control id='deleteUser' type="text" onChange={(e) => setDeletePassword(e.target.value)} placeholder="Salasana" />
                                        </Form.Group>
                                        <Button type='submit' id='deleteUser-button'>
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
}

export default Profile;