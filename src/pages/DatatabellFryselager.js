import React from 'react';
import {Row, Col, Breadcrumb, Table, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer';
import * as Icon from 'react-feather';

class DatatabellFryselager extends React.Component {
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
                            <h1>Datatabell</h1>
                            <Link to="/dashboard-fryselager" className="breadcrumb-item">
                                Tilbake til fryselager
                            </Link>
                            <Breadcrumb.Item active>Fryselager</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {/* End Breadcrumb */}

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
                                                <th className="text-center">Status</th>
                                                <th>Enhet</th>
                                                <th className="text-center">Driftstid</th>
                                                <th className="text-center">Forbruk</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {/* Kompressor 1 */}
                                            <tr>                            
                                                <td className="text-center">
                                                    {this.props.k1_status === true && <span className="badge badge-success">Aktiv</span>}
                                                    {this.props.k1_status === false && <span className="badge badge-warning">Inaktiv</span>}                        
                                                </td>
                                                <td>Kompressor 1</td>
                                                <td className="text-center">{this.props.k1_driftstid} timer</td>
                                                <td className="text-center">{this.props.k1_forbruk} kWh</td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* End Bordered Table */}

                    {/* Footer  */}    
                    <div className="flex-grow-1"></div>
                    <Footer />
                    {/* End Footer  */}   
                </div>
            </div>
        );
    }
}

export default DatatabellFryselager;