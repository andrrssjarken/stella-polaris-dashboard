import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import {Breadcrumb, Button, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import Loader from '../components/Common/Loader';

import { Link } from "react-router-dom";
import KompressorTabell from '../components/KompressorTabell';
import ChartEnergiforbruk from '../components/ChartEnergiforbruk';
import ChartTempFryselager from '../components/ChartTempFryselager';

//API URL
const k1_api_url = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Kompressor1'
const k2_api_url = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Kompressor2'
const k3_api_url = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Kompressor3'
const k4_api_url = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Kompressor4'
const hjemme_api_url = '/api/iottimeseries/v3/timeseries/d014986bc5cb497fa4bced744e1afaa3/EnviromentData'
// const test_url = '/api/iottimeseries/v3/timeseries/d014986bc5cb497fa4bced744e1afaa3/EnviromentData?from=2019-03-22T00:00:00Z&to=2019-03-24T00:15:00Z'


class DashboardFryselager extends React.Component {
    
    state = {
        sideMenu: true,
        loading: false
    }

    constructor(props) {
        super(props)
        this.state = {
            k1Driftstid: '',
            k1Forbruk: '',
            k1Status: '',
            k2Driftstid: '',
            k2Forbruk: '',
            k2Status: '',
            k3Driftstid: '',
            k3Forbruk: '',
            k3Status: '',
            k4Driftstid: '',
            k4Forbruk: '',
            k4Status: '',
            hjemme_data: [],
            error: null,
        }
    }


    fetchKompressor1() {
        fetch(k1_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }})
        .then(res => res.json())
        .then(data1 => {
            this.setState({
                k1Driftstid: data1[0].driftstid,
                k1Forbruk: data1[0].forbruk,
                k1Status: data1[0].status,
                loading: false
            })
        })
        .catch(error => console.log('Fetching failed', error))                      
    }

    fetchKompressor2() {
        fetch(k2_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }})
        .then(res => res.json())
        .then(data2 => {
            this.setState({
                k2Driftstid: data2[0].driftstid,
                k2Forbruk: data2[0].forbruk,
                k2Status: data2[0].status,
                loading: false
            })
        })
        .catch(error => console.log('Fetching failed', error))    
    }

    fetchKompressor3() {
        fetch(k3_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }})
        .then(res => res.json())
        .then(data3 => {
            this.setState({
                k3Driftstid: data3[0].driftstid,
                k3Forbruk: data3[0].forbruk,
                k3Status: data3[0].status,
                loading: false
            })
        })
        .catch(error => console.log('Fetching failed', error))    
    }

    fetchKompressor4() {
        fetch(k4_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }})
        .then(res => res.json())
        .then(data4 => {
            this.setState({
                k4Driftstid: data4[0].driftstid,
                k4Forbruk: data4[0].forbruk,
                k4Status: data4[0].status,
                loading: false
            })
        })
        .catch(error => console.log('Fetching failed', error))    
    }

    fetchHjemmeApi() {  
        fetch(hjemme_api_url, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-xsrf-token": this.myXRSFToken,
          "origin": `${window.location.protocol}//${window.location.host}`
        }})
        .then(res => res.json())
        .then(data => {
            this.setState({
                hjemme_data: data,
                loading: false
            })
        })
        .catch(error => console.log('Fetching failed', error))   
    }

    

    // Loading icon false after DOM loaded
    componentDidMount() {
        this.setState ({ loading: true})

        setTimeout(() => {
            
            var myXRSFToken;
            var nameEQ = 'XSRF-TOKEN' + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) === ' ') c = c.substring(1, c.length);
              if (c.indexOf(nameEQ) === 0) myXRSFToken = c.substring(nameEQ.length, c.length);
            }      
            console.log("myXRSFToken = " + myXRSFToken);
                  
            this.fetchKompressor1()
            this.fetchKompressor2()
            this.fetchKompressor3()
            this.fetchKompressor4()
            // this.fetchTest()  
            // this.fetchHjemmeApi()       
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

        const {k1Driftstid, k1Forbruk, k1Status} = this.state;
        const {k2Driftstid, k2Forbruk, k2Status} = this.state;
        const {k3Driftstid, k3Forbruk, k3Status} = this.state;
        const {k4Driftstid, k4Forbruk, k4Status} = this.state;

        console.log(k1Driftstid)
        console.log(k1Forbruk)
        console.log(k1Status)

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
                            <ChartTempFryselager/>
                        </Col>
                    </div>

                    {/* CompressorTable and EnergyConsumption */}
                    <div className="row">
                        <Col lg={6}>
                            <KompressorTabell 
                                k1_driftstid={k1Driftstid}
                                k1_forbruk={k1Forbruk}
                                k1_status={k1Status}

                                k2_driftstid={k2Driftstid}
                                k2_forbruk={k2Forbruk}
                                k2_status={k2Status}

                                k3_driftstid={k3Driftstid}
                                k3_forbruk={k3Forbruk}
                                k3_status={k3Status}

                                k4_driftstid={k4Driftstid}
                                k4_forbruk={k4Forbruk}
                                k4_status={k4Status}
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