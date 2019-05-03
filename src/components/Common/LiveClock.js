// Import av dependencies og komponenter
import React  from 'react'
import Clock from 'react-live-clock'
 
class LiveClock extends React.Component {
    render() {
        return(
        // Klokkeformat og tidssone
        <div className="live-clock">
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Oslo'} />
        </div>
        )
    }
}

export default LiveClock