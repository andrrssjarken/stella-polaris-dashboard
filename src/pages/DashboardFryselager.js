import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import {Row, Breadcrumb, Button, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import Loader from '../components/Common/Loader';

import { Link } from "react-router-dom";
import KompressorTabell from '../components/KompressorTabell';
import ChartEnergiforbruk from '../components/ChartEnergiforbruk';
import ChartTempFryselager from '../components/ChartTempFryselager';


class DashboardFryselager extends React.Component {
    state = {
        sideMenu: true,
        loading: true
    };

    // Loading icon false after DOM loaded
    componentDidMount() {
        this.myInterval = setInterval(() => { 
            this.setState({ loading: false });
        }, 1000); 
    }

    componentWillUnmount(){
        clearInterval(this.myInterval);
    }

    // Toggle side bar menu
    _onSideMenu = (active) => {
        this.setState({sideMenu: active});
    }
    
    render() {
        let loader = null;
        if (this.state.loading) {
            loader = <Loader message="Loading..." />
        }
        
        return (
            <div className="page-wrapper">
                {/* Navigation */}
                <Navigation onClick={this._onSideMenu} />
                {/* End Navigation */}
                
                <div className={`main-content d-flex flex-column ${this.state.sideMenu ? '' : 'hide-sidemenu'}`}>
                    {/* Loader */}
                    {loader}
                    {/* End Loader */}

                    {/* Breadcrumb and generate report*/}

                    <div className="row">
                        <Col lg={10}>
                        <div className="main-content-header">               
                            <Breadcrumb>
                                <h1>Dashboard</h1>
                                <Link to="/dashboard" className="breadcrumb-item">
                                    Tilbake til dashboard
                                </Link>
                                <Breadcrumb.Item active>Fryselager</Breadcrumb.Item>
                            </Breadcrumb>                          
                        </div>
                        </Col>
                        <Col lg={2}>
                        <div className="generate-report-placer">
                            <Button variant="outline-primary" className="generate-report-btn">{}Generer rapport</Button>
                        </div>
                        </Col>
                    </div>
                                 
                    {/* End Breadcrumb */}

                    {/* ColdStorageChart */}
                    <div className="row">
                        <Col lg={12}>
                            <ChartTempFryselager />
                        </Col>
                    </div>

                    {/* CompressorTable and EnergyConsumption */}
                    <div className="row">
                        <Col lg={6}>
                            <KompressorTabell />
                        </Col>

                        <Col lg={6}>
                            <ChartEnergiforbruk />
                        </Col>
                    </div>

                    {/* Footer */}
                    <div className="flex-grow-1"></div>
                    <Footer /> 
                    {/* End Footer */}
                </div>
            </div>
        );
    }
}

export default DashboardFryselager;