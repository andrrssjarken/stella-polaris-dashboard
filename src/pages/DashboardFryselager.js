import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import {Breadcrumb, Button, Col, Alert } from 'react-bootstrap'
import Footer from '../components/Footer'
import Loader from '../components/Common/Loader'
import { Link } from "react-router-dom"
import Datovelger from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'
import * as Icon from 'react-feather';
import moment from "moment"

// Komponenter
import KompressorTabell from '../components/KompressorTabell'
import ChartEnergiforbruk from '../components/ChartEnergiforbruk'
import ChartTempFryselager from '../components/ChartTempFryselager'

//API URL
const KOMP_KWH_API_URL = '/api/iottimeseries/v3/timeseries/38529181d87e4358b4b8ebe8d3479d00/KompressorerDynamiskForbruk' // ?from={FROMDATO}&to={TODATO}
const KOMP_STATUS_DRIFT_API_URL = '/api/iottimeseries/v3/timeseries/c3bb1834c010489598967ca63e6a09fc/KompressorerStatusDriftstid'
const TEMP_FRYSELAGER_API_URL = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Temperatur_Fryser' // ?from={FROMDATO}&to={TODATO}

// Test API URL
const TEST_KOMP_KWH_API_URL = 'http://labs.anbmedia.no/json/API/KompressorerkWh.json'
const TEST_KOMP_STATUS_DRIFT_API_URL = 'http://labs.anbmedia.no/json/API/KompressorerStatusDrift.json'
const TEST_KOMP_STATUS_DRIFT_API_URL_SINGEL = 'http://labs.anbmedia.no/json/API/KompressorerStatusDrift_Singel.json'
const TEST_TEMP_FRYSELAGER_API_URL = 'http://labs.anbmedia.no/json/API/TempFryser.json'


class DashboardFryselager extends React.Component {
    
    constructor(props){
        super(props)
    
        this.state = {
          // Initiering av datovelger
          startDate: moment().subtract(1, 'days'), endDate: moment(),
  
          // Static
          loading: true, sideMenu: true, error: null,
  
          // API States
          fryserTemp: [], fryserTimeStamp: [], fryserVarsel: [],
          k1Status: [], k1Forbruk: [], kForbrukTimeStamp: [], k1Driftstid: [],
          k2Status: [], k2Forbruk: [], k2Driftstid: [], 
          k3Status: [], k3Forbruk: [], k3Driftstid: [],  
          k4Status: [], k4Forbruk: [], k4Driftstid: [],

          // isFetched states
          fryseTempIsFetched: false, kWhIsFetched: false, staticIsFetched: false
        }

        this.handleApply = this.handleApply.bind(this);
    }

    // Funksjon for å hente inn temperaturdata. Funksjonen tar hensyn til response limit.
    FetchFryseTemp(requestURL) {
        fetch(requestURL/*, this.HeaderCredentials*/)
        .then(response => {
            let Responseheader = response.headers.get('Link')
            console.log('Linkheader :', Responseheader)
            response.json()
            .then(data => this.setState({
                fryserTemp: this.state.fryserTemp.concat(data.map((temp) => temp.Temperatur)),
                fryserTimeStamp: this.state.fryserTimeStamp.concat(data.map((time) => time._time))
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
                    fryseTempIsFetched: true
                })
                }, 1000)
                return
        }  
        })
        .catch(error => console.log('Fetching failed', error))
    }

    // Funksjon for å hente inn kWh fra kompressorer. Funksjonen tar hensyn til response limit.
    FetchKompkWh(requestURL) {
        fetch(requestURL/*, this.HeaderCredentials*/)
        .then(response => {
            let Responseheader = response.headers.get('Link')
            console.log('Linkheader :', Responseheader)
            response.json()
            .then(data => this.setState({
                k1Forbruk: this.state.k1Forbruk.concat(data.map((kWh) => kWh.K1_D_kWh)),
                k2Forbruk: this.state.k2Forbruk.concat(data.map((kWh) => kWh.K2_D_kWh)),
                k3Forbruk: this.state.k3Forbruk.concat(data.map((kWh) => kWh.K3_D_kWh)),
                k4Forbruk: this.state.k4Forbruk.concat(data.map((kWh) => kWh.K4_D_kWh)),
                kForbrukTimeStamp: this.state.kForbrukTimeStamp.concat(data.map((tid) => tid._time))
            }))
            if (Responseheader){
                let nextPageUrl = Responseheader.match(/\bhttps?:\/\/\S+Z/gi)
                console.log('Next Page URL: ', nextPageUrl)
                setTimeout(() => {
                    this.FetchAPI(nextPageUrl)
                }, 2000);
        } else {
                console.log('Done fetching Kompressor kWh API')
                setTimeout(() => {
                this.setState({ 
                    kWhIsFetched: true
                })}, 1000)
                return
        }  
        })
        .catch(error => console.log('Fetching failed', error))
    }

    // Henter inn siste statiske data for kompressorer. Status og drifttid.
    FetchStaticKompData(requestURL) {
        fetch(requestURL/*, this.HeaderCredentials*/)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    k1Status: data[0].K1_Status,
                    k1Driftstid: data[0].K1_Driftstid,
                    k2Status: data[0].K2_Status,
                    k2Driftstid: data[0].K2_Driftstid,
                    k3Status: data[0].K3_Status,
                    k3Driftstid: data[0].K3_Driftstid,
                    k4Status: data[0].K4_Status,
                    k4Driftstid: data[0].K4_Driftstid,
                    staticIsFetched: true

            })
            console.log('Done fetching static komp API')
        })
        .catch(error => console.log('Fetching static komp data failed', error))    
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
            this.FetchKompkWh(TEST_KOMP_KWH_API_URL + APISTARTDATO + '&to=' + APISLUTTDATO)
        }, 500);

        setTimeout(() => {
            this.FetchFryseTemp(TEST_TEMP_FRYSELAGER_API_URL + APISTARTDATO + '&to=' + APISLUTTDATO)
        }, 500);

    }

    // Første gang, og vil bare rendre en gang. Som å bli født.
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

        // Fetch Sanntidsdata
        setTimeout(() => {
            this.FetchStaticKompData(TEST_KOMP_STATUS_DRIFT_API_URL_SINGEL)
        }, 2000);


        setTimeout(() => {
            this.FetchKompkWh(TEST_KOMP_KWH_API_URL)
        }, 2000);

        setTimeout(() => {
            this.FetchFryseTemp(TEST_TEMP_FRYSELAGER_API_URL)
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
    
    render() {
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

        // Deklarerer states for å slippe å bruke 'this.state' hele tiden.       
        const { startDate, endDate, kForbrukTimeStamp, loading,
            k1Status, k1Forbruk, k1Driftstid, 
            k2Status, k2Forbruk, k2Driftstid, 
            k3Status, k3Forbruk, k3Driftstid, 
            k4Status, k4Forbruk, k4Driftstid,
            fryseTempIsFetched, kWhIsFetched, staticIsFetched, 
            fryserTemp, fryserTimeStamp, fryserVarsel } = this.state 
        
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
                    {/* Loading */}
                    {loader}
                    {/* Slutt Loader */}

                    {/* Start Breadcrumb and datepicker*/}
                    <div className="row">
                        <Col lg={9}>
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
                        <Col lg={3}>
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
                    
                    {/* ColdStorageChart */}
                    { fryseTempIsFetched && staticIsFetched && kWhIsFetched && !loading ? 
                    <div className="loading-content">
                        <div className="row">
                            <Col lg={12}>
                                <div className="TempChart">
                                <ChartTempFryselager
                                    tempIn={fryserTemp}
                                    timeStampIn={fryserTimeStamp}
                                    alarmsIn={fryserVarsel}
                                />
                                </div>
                            </Col>
                        </div>

                        {/* CompressorTable and EnergyConsumption */}
                        <div className="row">
                            <Col lg={6}>
                                <KompressorTabell 
                                    k1_driftstid={k1Driftstid}
                                    k1_forbruk={k1Forbruk[k1Forbruk.length-1]}
                                    k1_status={k1Status}

                                    k2_driftstid={k2Driftstid}
                                    k2_forbruk={k2Forbruk[k3Forbruk.length-1]}
                                    k2_status={k2Status}

                                    k3_driftstid={k3Driftstid}
                                    k3_forbruk={k3Forbruk[k3Forbruk.length-1]}
                                    k3_status={k3Status}

                                    k4_driftstid={k4Driftstid}
                                    k4_forbruk={k4Forbruk[k4Forbruk.length-1]}
                                    k4_status={k4Status}
                                />
                            </Col>

                            <Col lg={6}>
                                    <ChartEnergiforbruk
                                        k1kWhIn={k1Forbruk}
                                        k2kWhIn={k2Forbruk}
                                        k3kWhIn={k3Forbruk}
                                        k4kWhIn={k4Forbruk}
                                        timeStampIn={kForbrukTimeStamp}
                                    />
                            </Col>
                        </div>
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

export default DashboardFryselager;