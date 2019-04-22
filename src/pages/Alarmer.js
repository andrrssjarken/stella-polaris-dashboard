import React from 'react'
import {Row, Col, Breadcrumb, Alert, Table} from 'react-bootstrap'
import { Link } from "react-router-dom"
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer'
import moment from "moment"

// API URL
const ALARM_API_URL = 'https://aej-stelladashboard-aej.eu1.mindsphere.io/api/eventmanagement/v3/events?page=0&size=20&sort=timestamp%2Cdesc&history=true'

// Test API URL
const TEST_ALARM_API_URL = 'http://labs.anbmedia.no/json/API/Kontor.json'

const TEST_TEMP_FRYSELAGER_API_URL = 'http://labs.anbmedia.no/json/API/TempFryser.json'

/*
embedded.events.timestamp
embedded.events.entityID
embedded.events.acknowledged
embedded.events.description
*/

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

    // Funksjon for å hente de 20 siste inn alarmene.
    // Henter inn siste statiske data for kompressorer. Status og drifttid.
    FetchAPI(requestURL) {
        fetch(requestURL/*, this.HeaderCredentials*/)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    alarmData: data,
                    staticIsFetched: true

            })
            console.log('Done fetching static komp API')
        })
        .catch(error => console.log('Fetching static komp data failed', error))    
    }


    // Loading icon false after DOM loaded
    componentDidMount() {
        
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
            this.FetchAPI(TEST_TEMP_FRYSELAGER_API_URL)
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
        // Deklarerer states for å slippe å bruke 'this.state' hele tiden.       
        const { loading, alarmsIsFetched} = this.state 

        console.log(this.state.alarmData)

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

                    <Row>
                        <Col xl={12}>
                            { alarmsIsFetched && !loading ? 
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="card-header">
                                        <h5 className="card-title">Datatabell</h5>
                                    </div>
                                    
                                    <Table responsive hover className="m-0">
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-center">Dato og klokkeslett</th>
                                                <th className="text-center">Melding</th>
                                                <th className="text-center">Viktighet</th>
                                                <th className="text-center">Entity ID</th>
                                                <th className="text-center">Anerkjent</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                this.state.alarmData.map((item, key) => {
                                                    return (
                                                    <tr>
                                                        <td className="text-center">{key}</td>
                                                        <td className="text-center">{moment(item._embedded.events.timestamp).format('DD.MM.YYYY HH:mm:ss')}</td>
                                                        <td className="text-center">{item._embedded.events.description}</td>
                                                        <td className="text-center">{item._embedded.events.severity}</td>
                                                        <td className="text-center">{item._embedded.events.entityId}</td>
                                                        <td className="text-center">{item._embedded.events.acknowledged}</td>
                                                    </tr>)

                                                })
                                            }

                                        </tbody>
                                    </Table>
                                </div>
                            </div> : <Alert variant="info">
                     Laster inn data fra MindSphere. Vennligst vent.
                    </Alert>}
                        </Col>
                    </Row>



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