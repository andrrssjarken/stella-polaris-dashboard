import React from 'react';
import Chart from 'react-apexcharts'

const series = 
{
    "kokekardata": {
        "temp": [
            101.23,93.77,96.89,94.33,99.37,100.09,99.43,96.77,98.12,94.16,93.25,101.61,94.52,95.5,93.05,98.52,96.57,101.15,100.92,100.36
        ],
        "dates": [
            "13 Nov 2018",
            "14 Nov 2018",
            "15 Nov 2018",
            "16 Nov 2018",
            "17 Nov 2018",
            "20 Nov 2018",
            "21 Nov 2018",
            "22 Nov 2018",
            "23 Nov 2018",
            "24 Nov 2018",
            "27 Nov 2018",
            "28 Nov 2018",
            "29 Nov 2018",
            "30 Nov 2018",
            "01 Dec 2018",
            "04 Dec 2018",
            "05 Dec 2018",
            "06 Dec 2018",
            "07 Dec 2018",
            "08 Dec 2018"
        ]
    },

    "temperatursonde": {
        "temp": [
            90.54,90.52,91.58,92.37,93.93,90.13,95.43,94.5,91.15,90.27,93.97,95.19,93.49,91.81,94.07,90.42,91.17,94.6,92.96,93.05
        ]
    }
}

class ChartTempKokeprosess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                annotations: {
                    points: [{
                        x: new Date('1 Dec 2018').getTime(),
                        y: 93.05,
                        marker: {
                            size: 8,
                            fillColor: '#fff',
                            strokeColor: 'red',
                            radius: 2,
                            cssClass: 'apexcharts-custom-class'
                        },
                        label: {
                            borderColor: '#FF4560',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#FF4560',
                            },
                            text: 'Lav temperatur',
                        },
                    },
                    {
                        x: new Date('20 Nov 2018').getTime(),
                        y: 90.13,
                        marker: {
                            size: 8,
                            fillColor: '#fff',
                            strokeColor: 'red',
                            radius: 2,
                            cssClass: 'kokekar'
                        },
                        label: {
                            borderColor: '#FF4560',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#FF4560',
                            },
                            text: 'Lav temperatur',
                        },
                    },]
                },
                chart: {
                    height: 350,
                    type: 'line',
                    id: 'areachart-2'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    lineCap: 'round',
                    width: 3
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
                labels: series.kokekardata.dates,
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    min: 80,
                    max: 105,
                    title: {
                        text: 'Temperatur °C'
                    },
                }

            },
            series: [{
                name: 'Kokekar',
                data: series.kokekardata.temp
            },
            {
                name: 'Temperatursonde',
                data: series.temperatursonde.temp
            }],
        }
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-header">
                        <h5 className="card-title">Kokeprosess</h5>
                    </div>
                    <div id="chart">
                        <Chart options={this.state.options} series={this.state.series} type="line" height={400} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartTempKokeprosess;