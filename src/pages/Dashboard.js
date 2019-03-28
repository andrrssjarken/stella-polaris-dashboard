import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import {Row, Breadcrumb, Col } from 'react-bootstrap';
import Footer from '../components/Footer';

import Loader from '../components/Common/Loader';

import ChartTempFryselager from '../components/ChartTempFryselager';
import ChartTempKokeprosess from '../components/ChartTempKokeprosess';

class Dashboard extends React.Component {
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

                    {/* Breadcrumb */}
                    <div className="main-content-header">
                        <Breadcrumb>
                            <h1>Dashboard</h1>
                            <Breadcrumb.Item to="/dashboard">Oversikt</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {/* End Breadcrumb */}


                    <Row>
                        <Col lg={12}>
                            {/* File path: src/components/Dashboard/ThisYearSales.js */}
                            <ChartTempFryselager />
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            {/* File path: src/components/Dashboard/ThisYearSales.js */}
                            <ChartTempKokeprosess />
                        </Col>
                    </Row>                

                    {/* Footer */}
                    <div className="flex-grow-1"></div>
                    <Footer /> 
                    {/* End Footer */}
                </div>
            </div>
        );
    }
}

export default Dashboard;