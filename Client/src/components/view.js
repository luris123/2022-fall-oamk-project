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

    useEffect(() => {
        let url = window.location.pathname.slice(6);

        const getView = async () => {
            try {
                const response = await viewService.getView(url);

                console.log(response);

            } catch (error) {
                console.log(error);
            }
        };
        getView();
    }, []);

    return (
        <>
            <V1V2 />
            <V3 />
            <V5 />
            <V6 />
            <V7 />
            <V8 />
            <V9 />
        </>

    )
}

export default View;