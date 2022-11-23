import React, { useState, useEffect } from 'react';


function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('loggedUser'))
        setUser(user)
    }, [])



    if (user === null) {
        return (
            <div>
                <h2>Et ole kirjautunut sisään</h2>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Käyttäjäprofiili</h2>
                <p>Käyttäjätunnus: {user.username}</p>
                <p>Visualisointien määrä: {user.visualizations.length}</p>
                <ul>
                    {user.visualizations.map((visualization, i) => {
                        return <li key={i}><a href={visualization.url}>{visualization.url}</a></li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Profile;