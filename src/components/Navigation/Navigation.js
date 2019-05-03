// Import av dependencies og komponenter
import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './Navigation.css'
import {Navbar, Nav, Image, Button} from 'react-bootstrap'
import SideMeny from './SideMenu/SideMeny'
import LiveClock from '../Common/LiveClock'

// Logo bilder
import Logo from '../../assets/img/stella_polaris_logo.png'
import SmallLogo from '../../assets/img/stella_polaris_small-logo.png'

class Navigation extends React.Component {
    state = {
        sideMenu: false,
        term: '',
        menuColor: false
    };

    _toggleClass = () => {
        const currentSideMenu = this.state.sideMenu
        this.setState({sideMenu: !currentSideMenu})
        this.props.onClick(this.state.sideMenu)
    }

    // Printfunksjon for "Generer rapport" (Burde forbedres)
    print(){
        window.print();
    }

    render() {
        return (
            <div className="page-wrapper">
                <Navbar fixed="top" className="top-menu">
                    <Link to="/dashboard-fryselager" className={`navbar-brand ${this.state.sideMenu ? 'navbar-logo' : ''}`}>
                        {/* Stor logo */}
                        <Image src={Logo} alt="Logo" className="large-logo" /> 
                        {/* Liten logo */}
                        <Image src={SmallLogo} alt="Small Logo" className="small-logo" /> 
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Burger menu */}
                    <div className={`burger-menu ${this.state.sideMenu ? 'toggle-menu' : ''}`} onClick={this._toggleClass}>
                        <span className="top-bar"></span>
                        <span className="middle-bar"></span>
                        <span className="bottom-bar"></span> 
                    </div>
                    {/* Stopp Burger menu */}
 
                    <Nav className="ml-auto right-nav navbar-nav">
                        {/* Sett inn klokke her*/}
                        <LiveClock/>
                        <div className="generate-report-placer">
                            <Button variant="primary" className="generate-report-btn" onClick={this.print}>Generer rapport</Button>
                        </div>
                    </Nav>
                    
                </Navbar>    
                
                <SideMeny sideMenu={this.state.sideMenu} />
                                    
            </div>
        )
    }
}

export default withRouter(Navigation)