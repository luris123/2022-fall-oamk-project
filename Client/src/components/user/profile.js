import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";


function Profile() {

    const [user, setUser] = useState(null);
    const [v1v2Description, setV1V2Description] = useState(false);
    const [v3v4v10Description, setV3V4V10Description] = useState(false);

    const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'));


    useEffect(() => {
        console.log(userJSON)
        setUser(userJSON)
        console.log(user)
    }, []);

    if (user === null) {
        return (
            <div>
                <h2>Et ole kirjautunut sisään</h2>
            </div>
        )
    }

    return (
        console.log(user),
        <div>
            <h2>Käyttäjäprofiili</h2>
            <p>Käyttäjätunnus: {user.username}</p>
            <p>Visualisointien määrä: {user.visualizations.length}</p>
            <ul>
                {user.visualizations.map((visualization, i) => {
                    return <li key={i}>Visualisointi: <a href={visualization.url}>{visualization.url}</a></li>
                })}
            </ul>
            <Popup trigger={<Button type='primary'>Luo uusi näkymä</Button>} modal nested onClose={() => {
                setV1V2Description(false);
                setV3V4V10Description(false);
            }}>
                <div className='newVisualization'>
                    <div className='newVisualizationContent'>
                        <h1>Luo uusi näkymä</h1>
                        <Form onSubmit={() => console.log("Submit painettu")}>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onClick={() => setV1V2Description(!v1v2Description)} label="Global historical surface temperature anomalies from January 1850 onwards combined with Northern Hemisphere 2,000-year temperature reconstruction " />
                                {v1v2Description
                                ? <Form.Control type="text" placeholder="Enter description" />
                                : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onClick={() => setV3V4V10Description(!v3v4v10Description)} label="Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958 combined with Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements and Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements" />
                                {v3v4v10Description
                                ? <Form.Control type="text" placeholder="Enter description" />
                                : null
                                }
                            </Form.Group>
                            <Button type='submit'>
                                Kirjaudu Sisään
                            </Button>
                        </Form>
                    </div>
                </div>
            </Popup>
        </div>
    )
}


export default Profile;