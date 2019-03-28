import React from 'react';
import {Row, Col, Breadcrumb, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer';

class Alarmer extends React.Component {
    state = {
        sideMenu: true
    };

    _onSideMenu = (active) => {
        this.setState({sideMenu: active});
    }

    render() {
        return (
            <div className="page-wrapper">
                {/* Navigation */}
                <Navigation onClick={this._onSideMenu} />
                {/* End Navigation */}

                <div className={`main-content d-flex flex-column ${this.state.sideMenu ? '' : 'hide-sidemenu'}`}>
                    {/* Breadcrumb */}
                    <div className="main-content-header">
                        <Breadcrumb>
                            <h1>Alarmer</h1>
                            <Link to="/dashboard" className="breadcrumb-item">
                                Tilbake til dashboard
                            </Link>
                            <Breadcrumb.Item active>Alarmer</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {/* End Breadcrumb */}

                    {/* Default Alerts */}
                    <Row>
                        <Col lg={12}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="card-header">
                                        <h5 className="card-title">Default Alerts</h5>
                                    </div>
                                    {
                                        [
                                            'primary',
                                            'secondary',
                                            'success',
                                            'danger',
                                            'warning',
                                            'info',
                                            'light',
                                            'dark',
                                        ].map((variant, idx) => (
                                            <Alert key={idx} variant={variant}>
                                                This is a {variant} alert—check it out!
                                            </Alert>
                                        ))
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* End Default Alerts */}
                    

                    {/* Footer  */}    
                    <div className="flex-grow-1"></div>
                    <Footer />
                    {/* End Footer  */}   
                </div>
            </div>
        );
    }
}

export default Alarmer;