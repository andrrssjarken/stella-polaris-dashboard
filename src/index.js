// Import av komponenter
// Main index
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import '../node_modules/bootstrap/scss/bootstrap.scss'
import AppRouter from './routes/AppRouter'

// DOM rendering
ReactDOM.render(
    <BrowserRouter basename='/'>
        <AppRouter />
    </BrowserRouter>, document.querySelector('#root')
)
