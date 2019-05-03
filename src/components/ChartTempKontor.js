// Import av dependencies og komponenter
import React from 'react'
import Chart from 'react-apexcharts'


class ChartTempKontor extends React.Component {
    
    constructor(props) { 
        super(props);

        this.state = {
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    id: 'hjemmekontorchart'
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
                    title: {
                        text: 'Temperatur °C / Fuktighet %',
                    },
                }

            },
            series: [{
                name: 'Temperatur',
                data: this.props.temperatureIn
            },
            {
                name: 'Fuktighet',
                data: this.props.humidityIn
            }
            ],
        }
    }

    render() {

        return (
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-header">
                        <h5 className="card-title">Hjemmekontor</h5>
                    </div>
                    <div id="chart">
                        <Chart options={this.state.options} series={this.state.series} type="line" height={400} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartTempKontor;