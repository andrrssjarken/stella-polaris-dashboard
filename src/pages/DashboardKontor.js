import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import {Breadcrumb, Col, Button, Alert} from 'react-bootstrap';
import Footer from '../components/Footer';
import Loader from '../components/Common/Loader';
import Datovelger from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'
import * as Icon from 'react-feather';
import moment from "moment"

import { Link } from "react-router-dom";
import ChartTempKontor from '../components/ChartTempKontor'

// Test API URL
const TEST_KONTOR_API_URL = 'http://labs.anbmedia.no/json/API/Kontor.json'

class DashboardKontor extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            // Static
            loading: true, sideMenu: true, error: null,

            // Initiering av datovelger
            startDate: moment().subtract(1, 'days'), endDate: moment(),

            // API States
            temperature: [], humidity: [], timeStamp: [],

            // isFetched states
            KontorIsFetched: false, 
        }
    }

    // Funksjon for å hente inn temperaturdata og fuktighet Funksjonen tar hensyn til response limit.
    FetchAPI(requestURL) {
        fetch(requestURL/*, this.HeaderCredentials*/)
        .then(response => {
            let Responseheader = response.headers.get('Link')
            console.log('Linkheader :', Responseheader)
            response.json()
            .then(data => this.setState({
                temperature: this.state.temperature.concat(data.map((temp) => temp.Temperature)),
                humidity: this.state.humidity.concat(data.map((hum) => hum.Humidity)),
                timeStamp: this.state.timeStamp.concat(data.map((time) => time._time))
            }))
            if (Responseheader){
                let nextPageUrl = Responseheader.match(/\bhttps?:\/\/\S+Z/gi)
                console.log('Next Page URL: ', nextPageUrl)
                setTimeout(() => {
                    this.FetchAPI(nextPageUrl)
                }, 10000);
        } else {
                console.log('Done fetching FryseTemp API')
                setTimeout(() => {
                this.setState({ 
                    KontorIsFetched: true
                })
                }, 1000)
                return
        }  
        })
        .catch(error => console.log('Fetching failed', error))
    }


    // Loading icon false after DOM loaded
    componentDidMount() {
        // Forenkler header kredentials i API spørringene
        let HeaderCredentials = {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-xsrf-token": this.myXRSFToken,
                "origin": `${window.location.protocol}//${window.location.host}`
            }
        }
        
        // Get XRSF token for å ta inn API
        setTimeout(() => {    
            var myXRSFToken;
            var nameEQ = 'XSRF-TOKEN' + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) myXRSFToken = c.substring(nameEQ.length, c.length);
            }      
            console.log("myXRSFToken: " + myXRSFToken);
                    
        }, 1000);

        // Få initialdata
        setTimeout(() => {
            this.FetchAPI(TEST_KONTOR_API_URL)
        }, 2000);
        

        this.myInterval = setInterval(() => { 
            this.setState({ loading: false });
        }, 3500);

    }

    componentWillUnmount(){
        clearInterval(this.myInterval);
    }

    // Toggle side bar menu
    _onSideMenu = (active) => {
        this.setState({sideMenu: active});
    }

    // Funksjon for å handle datovelger
    handleApply(event, picker){
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        })
        
        // Parser dataen for å få rett format til MindSphere
        let APISTARTDATO = moment(this.state.startDate._d).toISOString().slice(0,-5) + "Z"
        let APISLUTTDATO = moment(this.state.endDate._d).toISOString().slice(0,-5) + "Z"

        console.log('Startdato: ', APISTARTDATO)
        console.log('Sluttdato: ', APISLUTTDATO)

        // Sett loader på
        this.setState({
            loading: true
        })
    
        // Starter ny fething her
        setTimeout(() => {
            // URL + APISTARTDATO + '&to=' + APISLUTTDATO
        }, 500);

    }
    
    render() {
        // Deklarerer states for å slippe å bruke 'this.state' hele tiden.       
        const { temperature, humidity, timeStamp, KontorIsFetched, loading} = this.state 

        // Loadingspinner
        let loader = null;
        if (this.state.loading) {
            loader = <Loader message="Loading..." />
        }

        // Label på datovelger
        let start = this.state.startDate.format('DD.MM.YYYY');
        let end = this.state.endDate.format('DD.MM.YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }

        // Lokale endringer i datovelger
        let locale = {
            applyLabel: 'Velg dato',
            cancelLabel: 'Lukk',
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

                    {/* Start Breadcrumb and datepicker*/}
                    <div className="row">
                        <Col lg={9}>
                        <div className="main-content-header">               
                            <Breadcrumb>
                                <h1>Dashboard</h1>
                                <Link to="/dashboard" className="breadcrumb-item">
                                    Tilbake til dashboard
                                </Link>
                                <Breadcrumb.Item active>Kontor</Breadcrumb.Item>
                            </Breadcrumb>                          
                        </div>
                        </Col>
                        <Col lg={3} className="d-flex justify-content-end">
                            <Datovelger
                                timePicker={true}
                                timePicker24Hour={true}
                                locale={locale}
                                minDate="04/10/2019"
                                opens="left"
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onApply={this.handleApply}
                                >
                                <div className="input-group">
                                    <input type="text" className="form-control" value={label}/>
                                    <span className="input-group-btn">
                                        <Button className="date-toggle-iconbutton">
                                            <Icon.Calendar className="date-toggle-icon"/>
                                        </Button>
                                    </span>
                                </div>                                
                            </Datovelger>
                        </Col>
                    </div>                               
                    {/* Slutt Breadcrumb */}

                    {/* Kontorchart */}
                    { KontorIsFetched && !loading ? 
                    <div className="row">
                        <Col lg={12}>
                            <ChartTempKontor
                                    temperatureIn={temperature}
                                    humidityIn={humidity}
                                    timeStampIn={timeStamp}
                            />
                        </Col>
                    </div> : <Alert variant="info">
                     Laster inn data fra MindSphere. Vennligst vent.
                    </Alert>}

                    {/* Footer */}
                    <div className="flex-grow-1"></div>
                    <Footer /> 
                    {/* End Footer */}
                </div>
            </div>
        );
    }
}

export default DashboardKontor;