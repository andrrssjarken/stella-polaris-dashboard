import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import {Row, Breadcrumb, Col, Table} from 'react-bootstrap';
import Footer from '../components/Footer';
import Loader from '../components/Common/Loader';

import { Link } from "react-router-dom";
import ChartTempKokeprosess from '../components/ChartTempKokeprosess'

class DashboardKokeprosess extends React.Component {
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
                            <Link to="/dashboard" className="breadcrumb-item">
                                Tilbake til dashboard
                            </Link>
                            <Breadcrumb.Item active>Kokeprosess</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {/* End Breadcrumb */}

                    {/* ColdStorageChart */}
                    <div className="row">
                        <Col lg={12}>
                            <ChartTempKokeprosess />
                        </Col>
                    </div>

                   {/* Basic Table */}
                   <Row>
                        <Col xl={12}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="card-header">
                                        <h5 className="card-title">Basic Table</h5>
                                    </div>
                                    
                                    <Table responsive hover className="m-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date</th>
                                                <th className="text-center">Pages / Visit</th>
                                                <th className="text-center">New user</th>
                                                <th className="text-center">Last week</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>02.01.2019</td>
                                                <td className="text-center">5000</td>
                                                <td className="text-center">1000</td>
                                                <td className="text-center">4500</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>02.02.2019</td>
                                                <td className="text-center">5400</td>
                                                <td className="text-center">1400</td>
                                                <td className="text-center">4700</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>02.03.2019</td>
                                                <td className="text-center">5500</td>
                                                <td className="text-center">1400</td>
                                                <td className="text-center">7600</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>02.04.2019</td>
                                                <td className="text-center">7400</td>
                                                <td className="text-center">4500</td>
                                                <td className="text-center">8700</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>02.05.2019</td>
                                                <td className="text-center">7600</td>
                                                <td className="text-center">2300</td>
                                                <td className="text-center">5400</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* End Basic Table */}


                    {/* Footer */}
                    <div className="flex-grow-1"></div>
                    <Footer /> 
                    {/* End Footer */}
                </div>
            </div>
        );
    }
}

export default DashboardKokeprosess;