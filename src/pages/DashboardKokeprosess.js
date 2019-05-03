// Import av dependencies og komponenter
import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import {Breadcrumb, Col, Button, Alert} from 'react-bootstrap';
import Footer from '../components/Footer';
import Loader from '../components/Common/Loader';
import Datovelger from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'
import * as Icon from 'react-feather';
import moment from "moment"
import ChartTempKokeprosess from '../components/ChartTempKokeprosess'

/* Henter inn dummydata, ikke API */

class DashboardKokeprosess extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            // Static
            loading: true, sideMenu: true, error: null,

            // Initiering av datovelger
            startDate: moment().subtract(1, 'days'), endDate: moment(),

        }
    }

    // Første gang, og vil bare rendre en gang. Komponentens fødsel.
    componentDidMount() {

        this.myInterval = setInterval(() => { 
            this.setState({ loading: false });
        }, 2500);

    }

    // Komponentens død
    componentWillUnmount(){
        clearInterval(this.myInterval);
    }

    // Toggle side bar menu
    _onSideMenu = (active) => {
        this.setState({sideMenu: active});
    }

    // Funksjon for å handle datovelger
    // Ikke aktiv på sidne pga dummydata
    handleApply(event, picker){
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        })
        
        // Parser dataen for å få rett format til MindSphere
        let APISTARTDATO = moment(this.state.startDate._d).toISOString().slice(0,-5) + "Z"
        let APISLUTTDATO = moment(this.state.endDate._d).toISOString().slice(0,-5) + "Z"

    }
    
    render() {
        // Deklarerer states for å slippe å bruke 'this.state'       
        const {loading} = this.state 

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
                {/* Stopp Navigation */}
                
                <div className={`main-content d-flex flex-column ${this.state.sideMenu ? '' : 'hide-sidemenu'}`}>
                    {/* Loader */}
                    {loader}
                    {/* Stopp Loader */}

                    {/* Start Breadcrumb and datepicker*/}
                    <div className="row">
                        <Col lg={9}>
                        <div className="main-content-header">               
                            <Breadcrumb>
                                <h1>Dashboard</h1>
                                <Breadcrumb.Item active>Kokeprosess</Breadcrumb.Item>
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
                    {/* Stopp Breadcrumb */}

                    {/* ChartTempKokeprosess */}
                    { !loading ? 
                    <div className="row">
                        <Col lg={12}>
                            <ChartTempKokeprosess/>
                        </Col>
                    </div> : <Alert variant="info">
                     Laster inn statisk dummydata. Vennligst vent.
                    </Alert>}

                    {/* Stopp ChartTempKokeprosess */}

                    {/* Footer */}
                    <div className="flex-grow-1"></div>
                    <Footer /> 
                    {/* Stopp Footer */}
                </div>
            </div>
        );
    }
}

export default DashboardKokeprosess;