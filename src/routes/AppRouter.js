import React from "react";
import { Route, Redirect } from "react-router-dom";

import Dashboard from '../pages/Dashboard';
import DashboardFryselager from '../pages/DashboardFryselager';
import DashboardKokeprosess from '../pages/DashboardKokeprosess'
import Alarmer from '../pages/Alarmer';
import DatatabellFryselager from '../pages/DatatabellFryselager';
import DatatabellKokeprosess from '../pages/DatatabellKokeprosess';
import Brukermanual from '../pages/Brukermanual';

import '../assets/css/style.css';
import '../assets/css/responsive.css';

const AppRouter = () => (
    <React.Fragment>
        <Route exact path="/" render={() => (
            <Redirect to="/dashboard/" />
        )} />

        <Route path="/dashboard/" exact component={Dashboard} />
        <Route path="/dashboard-fryselager/" component={DashboardFryselager} />
        <Route path="/dashboard-kokeprosess/" component={DashboardKokeprosess}/>
        <Route path="/alarmer/" component={Alarmer} />
        <Route path="/datatabell-kokeprosess/" component={DatatabellKokeprosess}/>
        <Route path="/datatabell-fryselager/" component={DatatabellFryselager} />  
        <Route path="/brukermanual/" component={Brukermanual} />
    </React.Fragment>
);

export default AppRouter;