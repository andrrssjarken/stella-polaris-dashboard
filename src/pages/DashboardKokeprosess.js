import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import {Row, Breadcrumb, Col, Table} from 'react-bootstrap';
import Footer from '../components/Footer';
import Loader from '../components/Common/Loader';

import { Link } from "react-router-dom";
import ChartTempKokeprosess from '../components/ChartTempKokeprosess'

const FROMDATE = '2019-04-05T00:12:00Z'
const TODATE = '2019-04-08T00:16:00Z'
const API_FETCH_URL = '/api/iottimeseries/v3/timeseries/2271ff4bcc0b48e88109909c158e0142/Temperatur_Fryser?from=' + FROMDATE + '&to=' + TODATE

class DashboardKokeprosess extends React.Component {
    
    state = {
        sideMenu: true,
        loading: false
    }

    constructor(props){
        super(props)
        this.state = {
            TestData: []
        }
    }

    FetchAPI(requestURL) {
        fetch(requestURL, {
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "x-xsrf-token": this.myXRSFToken,
              "origin": `${window.location.protocol}//${window.location.host}`
            }})
          .then(response => {
            let Responseheader = response.headers.get('Link')
            console.log(Responseheader)
            response.json()
            .then(data => this.setState({
                TestData: this.state.TestData.concat(data)
            }))
            if (Responseheader){
                let nextPageUrl = Responseheader.match(/\bhttps?:\/\/\S+Z/gi)
                console.log('Next Page URL: ', nextPageUrl)
                setTimeout(() => {
                    this.FetchAPI(nextPageUrl)
                }, 10000);
          } else {
                console.log('Done fetching API')
                this.setState({ 
                    loading: false
                })
                return
          }  
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
                  
            this.FetchAPI(API_FETCH_URL)
   
        }, 5000);

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

        const {TestData} = this.state
        console.log('Fetched data: ', TestData)

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