// Import av dependencies og komponenter
import React from 'react'
import {Row, Col, Breadcrumb, Alert, Table} from 'react-bootstrap'
import Loader from '../components/Common/Loader'
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer'
import moment from "moment"

// MindSphere API URL
const ALARM_API_URL = '/api/eventmanagement/v3/events?page=0&size=20&sort=timestamp%2Cdesc&history=false'

// Test API URL
const TEST_ALARM_API_URL = 'http://labs.anbmedia.no/json/API/Alarmer.json'

class Alarmer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // Static
            loading: true, sideMenu: true, error: null,

            // Data state
            alarmData: [],

            // isFetched states
            alarmsIsFetched: false, 
        }

    }

    // Funksjon for å hente de 20 siste alarmene.
    FetchAPI(requestURL) {
        fetch(requestURL, this.HeaderCredentials)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    alarmData: data,
                    alarmsIsFetched: true

            })
            console.log('Done fetching alarm data API')
        })
        .catch(error => console.log('Fetching alarm data failed', error))
    }


    // Første gang, og vil bare rendre en gang. Komponentens fødsel.
    componentDidMount() {
        
        // Forenkler header kredentials i API spørringen
        let HeaderCredentials = {
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "x-xsrf-token": this.myXRSFToken,
              "origin": `${window.location.protocol}//${window.location.host}`
            }
        }
        
        // Get XRSF cookie token
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
            this.FetchAPI(ALARM_API_URL)
        }, 2000);
        
        // Setter loading false etter 3.5s
        this.myInterval = setInterval(() => { 
            this.setState({ loading: false });
        }, 3500);

    }

    // Komponentens død
    componentWillUnmount(){
        clearInterval(this.myInterval);
    }

    // Toggle side bar menu
    _onSideMenu = (active) => {
        this.setState({sideMenu: active});
    }

    render() {

        // Deklarerer states for å slippe å bruke 'this.state'       
        const { loading, alarmsIsFetched} = this.state 

        // Loadingspinner
        let loader = null;
        if (this.state.loading) {
            loader = <Loader message="Loading..." />
        }

        return (
            <div className="page-wrapper">
                {/* Navigation */}
                <Navigation onClick={this._onSideMenu} />
                {/* Stopp Navigation */}

                <div className={`main-content d-flex flex-column ${this.state.sideMenu ? '' : 'hide-sidemenu'}`}>
                    {/* Loading */}
                    {loader}
                    {/* Stopp Loader */}

                    {/* Breadcrumb */}
                    <div className="main-content-header">
                        <Breadcrumb>
                            <h1>Alarmer</h1>
                            <Breadcrumb.Item active>Oversikt over alarmer</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {/* Stopp Breadcrumb */}

                    {/* Alarmtabell */}
                    <Row>
                        <Col xl={12}>
                            { alarmsIsFetched && !loading ? 
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="card-header">
                                        <h5 className="card-title">Datatabell</h5>
                                    </div>
                                    {/* Tabellheader */}
                                    <Table responsive hover className="m-0">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Dato og klokkeslett</th>
                                                <th className="text-center">Melding</th>
                                                <th className="text-center">Viktighet</th>
                                                <th className="text-center">Entity ID</th>
                                                <th className="text-center">Anerkjent</th>
                                            </tr>
                                        </thead>
                                        {/* Stopp Tabellheader */}
                                        
                                        {/* Datarader */}
                                        {/* Itererer gjennom data og generere rader */}
                                        <tbody>
                                            {
                                                this.state.alarmData._embedded.events.map((item, key) => {
                                                    return (
                                                    <tr key={key}>
                                                        <td className="text-center">{moment(item.timestamp).format('DD.MM.YYYY HH:mm:ss')}</td>
                                                        <td className="text-center">{item.description}</td>
                                                        <td className="text-center">{item.severity}</td>
                                                        <td className="text-center">{item.entityId}</td>
                                                        <td className="text-center">
                                                            {item.acknowledged === true && <span className="badge badge-warning">Anerkjent</span>}
                                                            {item.acknowledged === false && <span className="badge badge-danger">Ikke anerkjent</span>}
                                                        </td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                        {/* Stopp datarader */}

                                    </Table>
                                </div>
                            </div> : <Alert variant="info">
                     Laster inn data fra MindSphere. Vennligst vent. {/* Terneries / Conditional logikk */}
                    </Alert>}
                        </Col>
                    </Row>
                    {/* Stopp Alarmtabell */}

                    {/* Footer  */}    
                    <div className="flex-grow-1"></div>
                    <Footer />
                    {/* Stopp Footer  */}   
                </div>
            </div>
        );
    }
}

export default Alarmer;