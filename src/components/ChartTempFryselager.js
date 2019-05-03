// Import av dependencies og komponenter
import React from 'react'
import Chart from 'react-apexcharts'

class ChartTempFryselager extends React.Component {
    constructor(props) {    
        super(props)
        this.state = {
            options: {
                annotations: {
                    points: this.props.alarmsIn,
                    yaxis: [{
                        y: -23,
                        y2: -28,
                        borderColor: '#FEB019',
                        opacity: 0.1,
                        label: {
                          borderColor: '#333',
                          style: {
                            fontSize: '10px',
                            color: '#333',
                            background: '#FEB019',
                          },
                          text: 'Ønsket temperaturområde',
                        }
                      }]                  
                },
                chart: {
                    height: 350,
                    type: 'line',
                    id: 'TempFryselager'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    lineCap: 'round',
                    width: 2
                },
                grid: {
                    padding: {
                        right: 30,
                        left: 20
                    }
                },
                title: {
                    text: '',
                    align: 'left'
                },
                labels: this.props.timeStampIn,
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    min: -30,
                    max: -10,
                    title: {
                        text: 'Temperatur °C'
                    },
                }

            },
            series: [{
                name: 'Temperatur',
                data: this.props.tempIn
            }],
        }
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-header">
                        <h5 className="card-title">Temperatur - Fryselager</h5>
                    </div>
                    <div id="chart">
                        <Chart options={this.state.options} series={this.state.series} type="line" height={400} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartTempFryselager