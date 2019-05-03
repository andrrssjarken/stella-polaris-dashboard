// Import av dependencies og komponenter
import React from 'react'

// Footer med kreditering
class Footer extends React.Component {
    render(){
        return(
            <footer className="footer mt-2">
                <p>
                    AEJ Automasjon @ 2019 - Bacheloroppgave UiT <a href="https://automasjon.haneseth.no" rel="noopener noreferrer" target="_blank">Haneseth Automasjon</a>
                </p>
            </footer>
        )
    }
}

export default Footer