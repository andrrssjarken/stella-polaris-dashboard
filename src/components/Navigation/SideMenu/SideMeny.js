import React from 'react';
import { NavLink } from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import * as Icon from 'react-feather';
import './SideMenu.css';

class SideMenuDark extends React.Component {
    render() { 
        return (
            <div className={`sidemenu-area ${this.props.sideMenu ? 'sidemenu-toggle' : ''}`}>
                <Navbar className={`sidemenu ${this.props.sideMenu ? 'hide-nav-title' : ''}`} >
                    <Navbar.Collapse>
                        <Nav>
                            <NavLink to="/dashboard-fryselager/" className="nav-link">
                                <Icon.BarChart2 
                                    className="icon"
                                /> 
                                <span className="title">Fryselager</span>
                            </NavLink>

                            <NavLink to="/dashboard-kokeprosess/" className="nav-link">
                                <Icon.BarChart2 
                                    className="icon"
                                /> 
                                <span className="title">Kokeprosess</span>
                            </NavLink>

                            <NavLink to="/dashboard-kontor/" className="nav-link">
                                <Icon.BarChart2 
                                    className="icon"
                                /> 
                                <span className="title">Kontor</span>
                            </NavLink>
                         
                            <NavLink to="/alarmer/" className="nav-link">
                                <Icon.Bell 
                                    className="icon"
                                />
                                <span className="title">Alarmer</span>
                            </NavLink>

                            <NavDropdown 
                                className="super-color" 
                                title= {
                                    <div className="dropdown-title">
                                        <Icon.Database 
                                            className="icon"
                                        />
                                        <span className="title">
                                            Datatabeller
                                            <Icon.ChevronRight 
                                                className="icon fr"
                                            />
                                        </span>
                                    </div>
                                }
                                id="basic-nav-dropdown">
                                <NavLink  
                                    activeClassName="drpMenu"
                                    to="/datatabell-fryselager/" 
                                    className="dropdown-item">
                                    <Icon.Database 
                                        className="icon" 
                                    />
                                    Fryselager
                                </NavLink>
                                <NavLink 
                                    activeClassName="drpMenu"
                                    to="/datatabell-kontor/" 
                                    className="dropdown-item"> 
                                    <Icon.Database 
                                        className="icon" 
                                    /> 
                                    Kontor
                                </NavLink>

                            </NavDropdown>

                            <NavLink to="/brukermanual/" className="nav-link">
                                <Icon.FileText 
                                    className="icon"
                                />
                                <span className="title">Brukermanual</span>
                            </NavLink>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default SideMenuDark;