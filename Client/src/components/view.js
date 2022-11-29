import V1V2 from './charts/v1v2';
import V3 from './charts/v3';
import V5 from './charts/v5';
import V7 from './charts/v7';
import V6 from './charts/v6';
import V9 from './charts/v9';
import V8 from './charts/v8';
import { useEffect, useState } from 'react';

import viewService from '../services/viewService';

function View() {

    const [settings, setSettings] = useState({});

    useEffect(() => {

        let url = window.location.pathname.slice(6);
        console.log(url.length);

        const getView = async () => {
            try {
                const response = await viewService.getView(url);

                console.log(response.settings);
                setSettings(response.settings);

            } catch (error) {
                console.log(error);
            }
        };

        if(url.length === 4){
            getView();
        }

    }, []);

    return (
        <div>
            <V1V2 description={settings.v1v2text} show={settings.v1v2} />
            <V3 description={settings.v3v4v10text} show={settings.v3v4v10} />
            <V5 description={settings.v5text} show={settings.v5} />
            <V6 description={settings.v6text} show={settings.v6} />
            <V7 description={settings.v7v10text} show={settings.v7v10} />
            <V8 description={settings.v8text} show={settings.v8} />
            <V9 description={settings.v9text} show={settings.v9} />
        </div>
    )
}

export default View;