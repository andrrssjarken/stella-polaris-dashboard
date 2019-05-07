// Import av dependencies og komponenter
import React from 'react'
import Chart from 'react-apexcharts'

class ChartEnergiforbruk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                chart: {
                    toolbar: {
                        show: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    lineCap: 'round',
                    width: 2
                },
                title: {
                    text: '',
                    align: 'left'
                },
                subtitle: {
                    text: '',
                    align: 'left'
                },
                labels: this.props.timeStampIn,
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    min: 0,
                    max: 250,
                    opposite: true,
                    title: {
                        text: 'kWh'
                    },
                }
            },
            series: [{
                name: 'K1',
                data: this.props.k1kWhIn
            },
            {
                name: 'K2',
                data: this.props.k2kWhIn
            },
            {
                name: 'K3',
                data: this.props.k3kWhIn
            },
            {
                name: 'K4',
                data: this.props.k4kWhIn
            }
            ],
        }
    }
    
    render() {

        return (
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-header">
                        <h5 className="card-title">Energiforbruk</h5>
                    </div>
                    <div id="chart" className="apexcharts-content">
                        <Chart options={this.state.options} series={this.state.series} type="area" height={335} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartEnergiforbruk