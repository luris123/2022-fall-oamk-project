import "../css/view.css";
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import V1V2 from './charts/v1v2';
import V3 from './charts/v3';
import V5 from './charts/v5';
import V7 from './charts/v7';
import V6 from './charts/v6';
import V9 from './charts/v9';
import V8 from './charts/v8';

import viewService from '../services/viewService';
import { Container } from "react-bootstrap";

function View() {

    const [settings, setSettings] = useState({});
    const [viewDisplay, setViewDisplay] = useState(false);

    useEffect(() => {

        let url = window.location.pathname.slice(6);
        console.log(url.length);

        const getView = async () => {
            try {
                const response = await viewService.getView(url);

                console.log(response.settings);
                setSettings(response.settings);
                setViewDisplay(response.settings.display);

            } catch (error) {
                console.log(error);
            }
        };

        if (url.length === 4) {
            getView();
        }

    }, []);

    if (viewDisplay === true) {
        return (
            <Container>
                <Row>
                    {settings.v1v2
                        ?
                        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 '>
                            <V1V2 description={settings.v1v2text} show={settings.v1v2} />
                        </Col>
                        : null
                    }
                    {settings.v3v4v10
                        ?
                        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 '>
                            <V3 description={settings.v3v4v10text} show={settings.v3v4v10} />
                        </Col>
                        : null
                    }
                    {settings.v5
                        ?
                        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 '>
                            <V5 description={settings.v5text} show={settings.v5} />
                        </Col>
                        : null
                    }
                    {settings.v6
                        ?
                        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 '>
                            <V6 description={settings.v6text} show={settings.v6} />
                        </Col>
                        : null
                    }
                    {settings.v7v10
                        ?
                        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 '>
                            <V7 description={settings.v7v10text} show={settings.v7v10} />
                        </Col>
                        : null
                    }
                    {settings.v8
                        ?
                        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 '>
                            <V8 description={settings.v8text} show={settings.v8} />
                        </Col>
                        : null
                    }
                    {settings.v9
                        ?
                        <Col className='col-12 col-sm-12 col-md-12 col-lg-6 '>
                            <V9 description={settings.v9text} show={settings.v9} />
                        </Col>
                        : null
                    }
                </Row>
            </Container>
        )
    } else {
        return (
            <Container fluid>
                {settings.v1v2
                    ?
                    <V1V2 description={settings.v1v2text} show={settings.v1v2} />
                    : null
                }
                {settings.v3v4v10
                    ?
                    <V3 description={settings.v3v4v10text} show={settings.v3v4v10} />
                    : null
                }
                {settings.v5
                    ?
                    <V5 description={settings.v5text} show={settings.v5} />
                    : null
                }
                {settings.v6
                    ?
                    <V6 description={settings.v6text} show={settings.v6} />
                    : null
                }
                {settings.v7v10
                    ?
                    <V7 description={settings.v7v10text} show={settings.v7v10} />
                    : null
                }
                {settings.v8
                    ?
                    <V8 description={settings.v8text} show={settings.v8} />
                    : null
                }
                {settings.v9
                    ?
                    <V9 description={settings.v9text} show={settings.v9} />
                    : null
                }
            </Container>
        )
    }
}

export default View;