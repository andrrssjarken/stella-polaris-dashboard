import React from 'react';
import Chart from 'react-apexcharts'

const series = 
{
    "kokekardata": {
        "temp": [
            101.23,93.77,96.89,94.33,99.37,100.09,99.43,96.77,98.12,94.16,94.25,101.61,94.52,95.5,94.05,98.52,96.57,101.15,100.92,100.36
        ],
        "dates": [
            "6 April 2019",
            "7 April 2019",
            "8 April 2019",
            "9 April 2019",
            "10 April 2019",
            "11 April 2019",
            "12 April 2019",
            "13 April 2019",
            "14 April 2019",
            "15 April 2019",
            "16 April 2019",
            "17 April 2019",
            "18 April 2019",
            "19 April 2019",
            "20 April 2019",
            "21 April 2019",
            "22 April 2019",
            "23 April 2019",
            "24 April 2019",
            "25 April 2019"
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
                        x: new Date('7 April 2019').getTime(),
                        y: 93.77,
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
                        x: new Date('11 April 2019').getTime(),
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
                    },{
                        x: new Date('15 April 2019').getTime(),
                        y: 90.27,
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
                    },{
                        x: new Date('21 April 2019').getTime(),
                        y: 90.42,
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
                        }}],
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