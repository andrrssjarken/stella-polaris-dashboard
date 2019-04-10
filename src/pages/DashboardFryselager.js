import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import {Breadcrumb, Button, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import Loader from '../components/Common/Loader';

import { Link } from "react-router-dom";
import KompressorTabell from '../components/KompressorTabell';
import ChartEnergiforbruk from '../components/ChartEnergiforbruk';
import ChartTempFryselager from '../components/ChartTempFryselager';

const k1_api_url = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Kompressor1'
const k2_api_url = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Kompressor2'
const k3_api_url = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Kompressor3'
const k4_api_url = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Kompressor4'
const hjemme_api_url = '/api/iottimeseries/v3/timeseries/d014986bc5cb497fa4bced744e1afaa3/EnviromentData?from=2019-03-22T00:00:00Z&to=2019-04-08T00:15:00Z'

const dummy_api_url = 'https://api.github.com/users/andrrssjarken'

class DashboardFryselager extends React.Component {
    //API URL
    state = {
        sideMenu: true,
        loading: false
    }

    constructor(props) {
        super(props)
        this.state = {
            k1_data: {},
            k2_data: {},
            k3_data: {},
            k4_data: {},
            hjemme_data: {},
            dummyData: {},
            error: null,
        }
    }

    getHeaderToken() {
        var myXRSFToken;
        var nameEQ = 'XSRF-TOKEN' + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) myXRSFToken = c.substring(nameEQ.length, c.length);
        }      
        console.log("myXRSFToken = " + myXRSFToken);
    }

    fetchDummyAPI() {
        fetch(dummy_api_url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error med fetching av dummy api...')
                }
            })                          
            .then(ddata => this.setState({dummyData: ddata, loading: false}))
            .catch(error => this.setState({ error, loading: false}))        
    }

    fetchKompressor1() {       
        fetch(k1_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('K1 Error med fetching av dummy api...')
            }
        })                          
        .then(data => this.setState({k1_data: data, loading: false}))
        .catch(error => this.setState({ error, loading: false}))    
        console.log('Her er data K1: ' + this.state.k1_data)
    }

    fetchKompressor2() {       
        fetch(k2_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('K2 Error med fetching av dummy api...')
            }
        })                          
        .then(data => this.setState({k2_data: data, loading: false}))
        .catch(error => this.setState({ error, loading: false}))    
        console.log('Her er data K2: ' + this.state.k2_data)
    }

    fetchKompressor3() {       
        fetch(k3_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('K3 Error med fetching av dummy api...')
            }
        })                          
        .then(data => this.setState({k3_data: data, loading: false}))
        .catch(error => this.setState({ error, loading: false}))    
        console.log('Her er data K3: ' + this.state.k3_data)
    }

    fetchKompressor4() {       
        fetch(k4_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('K4 Error med fetching api...')
            }
        })                          
        .then(data => this.setState({k4_data: data, loading: false}))
        .catch(error => this.setState({ error, loading: false}))    
        console.log('Her er data K4: ' + this.state.k4_data)
    }

    fetchHjemmeApi() {       
        fetch(hjemme_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('HjemmeData Error med fetching api...')
            }
        })                          
        .then(data => this.setState({hjemme_data: data, loading: false}))
        .catch(error => this.setState({ error, loading: false}))    
        console.log('Her er data fra Pi: ' + this.state.hjemme_data)
    }

    // Loading icon false after DOM loaded
    componentDidMount() {
        this.setState ({ loading: true})
        setTimeout(() => {
            this.getHeaderToken()
            this.fetchKompressor1()
            this.fetchKompressor2()
            this.fetchKompressor3()
            this.fetchKompressor4()
            this.fetchHjemmeApi()
            this.fetchDummyAPI()          
        }, 3000);
        
        /*
        this.myInterval = setInterval(() => { 
            this.setState({ loading: false });
        }, 1000);
        */
        
    }

    componentWillUnmount(){
        clearInterval(this.myInterval);
    }

    // Toggle side bar menu
    _onSideMenu = (active) => {
        this.setState({sideMenu: active});
    }
    
    render() {
        let loader = null
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
                            <h1>{this.state.dummyData.created_at}</h1>
                            <h1>{this.state.dummyData.name}</h1>
                            <h1>{this.state.k1_data.driftstid}</h1>
                            <ChartTempFryselager created_at={this.state.dummyData.created_at}/>
                        </Col>
                    </div>

                    {/* CompressorTable and EnergyConsumption */}
                    <div className="row">
                        <Col lg={6}>
                            <KompressorTabell 
                                k1_driftstid={this.state.k1_data.driftstid}
                                k1_forbruk={this.state.k1_data.forbruk}
                                k1_status={this.state.k1_data.status}

                                k2_driftstid={this.state.k2_data.driftstid}
                                k2_forbruk={this.state.k2_data.forbruk}
                                k2_status={this.state.k2_data.status}

                                k3_driftstid={this.state.k3_data.driftstid}
                                k3_forbruk={this.state.k3_data.forbruk}
                                k3_status={this.state.k3_data.status}

                                k4_driftstid={this.state.k4_data.driftstid}
                                k4_forbruk={this.state.k4_data.forbruk}
                                k4_status={this.state.k4_data.status}
                            />
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