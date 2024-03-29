// Import av sider
import React from "react"
import { Route, Redirect } from "react-router-dom"
import DashboardFryselager from '../pages/DashboardFryselager'
import DashboardKontor from '../pages/DashboardKontor'
import DashboardKokeprosess from "../pages/DashboardKokeprosess"
import Alarmer from '../pages/Alarmer'
import DatatabellFryselager from '../pages/DatatabellFryselager'
import DatatabellKontor from '../pages/DatatabellKontor'
import Brukermanual from '../pages/Brukermanual'

import '../assets/css/style.css'
import '../assets/css/responsive.css'

// React linking og routing
const AppRouter = () => (
    <React.Fragment>
        <Route exact path="/" render={() => (
            <Redirect to="/dashboard-fryselager/" />
        )} />
        <Route path="/dashboard-fryselager/" component={DashboardFryselager} />
        <Route path="/dashboard-kontor/" component={DashboardKontor}/>
        <Route path="/dashboard-kokeprosess/" component={DashboardKokeprosess}/>
        <Route path="/alarmer/" component={Alarmer} />
        <Route path="/datatabell-kontor/" component={DatatabellKontor}/>
        <Route path="/datatabell-fryselager/" component={DatatabellFryselager} />  
        <Route path="/brukermanual/" component={Brukermanual} />
    </React.Fragment>
)

export default AppRouter