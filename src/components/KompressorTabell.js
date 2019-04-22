import React from 'react';
import { Table, Button } from 'react-bootstrap';

class KompressorTabell extends React.Component {

    handleRefresh = (e) => {
        this.props.handleRefresh()
     }

    render() {

        return (
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-header">
                        <Button variant="outline-primary btn-sm" onClick={this.handleRefresh} className="float-right refresh-button">Oppdater data</Button> 
                        <h5 className="card-title">Frysekompressorer - Sanntidsdata</h5>       
                    </div>

                    <Table responsive hover className="m-0">
                        <thead className="border-none bg-none">
                            <tr>
                                <th className="text-center">Status</th>
                                <th>Enhet</th>
                                <th className="text-center">Driftstid</th>
                                <th className="text-center">Forbruk</th>
                            </tr>
                        </thead>

                        <tbody>

                            {/* Kompressor 1 */}
                            <tr>                            
                                <td className="text-center">
                                    {this.props.k1_status === true && <span className="badge badge-success">Aktiv</span>}
                                    {this.props.k1_status === false && <span className="badge badge-warning">Inaktiv</span>}                        
                                </td>
                                <td>Kompressor 1</td>
                                <td className="text-center">{this.props.k1_driftstid} timer</td>
                                <td className="text-center">{this.props.k1_forbruk} kWh</td>
                            </tr>

                            {/* Kompressor 2 */}
                            <tr>
                                <td className="text-center">
                                    {this.props.k2_status === true && <span className="badge badge-success">Aktiv</span>}
                                    {this.props.k2_status === false && <span className="badge badge-warning">Inaktiv</span>}
                                </td>
                                <td>Kompressor 2</td>
                                <td className="text-center">{this.props.k2_driftstid} timer</td>
                                <td className="text-center">{this.props.k2_forbruk} kWh</td>
                            </tr>

                            {/* Kompressor 3 */}
                            <tr>
                                <td className="text-center">
                                    {this.props.k3_status === true && <span className="badge badge-success">Aktiv</span>}
                                    {this.props.k3_status === false && <span className="badge badge-warning">Inaktiv</span>}
                                </td>
                                <td>Kompressor 3</td>
                                <td className="text-center">{this.props.k3_driftstid} timer</td>
                                <td className="text-center">{this.props.k3_forbruk} kWh</td>
                            </tr>
                            {/* Kompressor 4 */}
                            <tr>
                                <td className="text-center">
                                    {this.props.k4_status === true && <span className="badge badge-success">Aktiv</span>}
                                    {this.props.k4_status === false && <span className="badge badge-warning">Inaktiv</span>}
                                </td>
                                <td>Kompressor 4</td>
                                <td className="text-center">{this.props.k4_driftstid} timer</td>
                                <td className="text-center">{this.props.k4_forbruk} kWh</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default KompressorTabell;