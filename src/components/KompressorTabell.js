import React from 'react';
import { Table, Button } from 'react-bootstrap';

class KompressorTabell extends React.Component {
    render() {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-header">
                        <h5 className="card-title">Kjølekompressorer</h5>                      
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
                            {/* Compressor 1 */}
                            <tr>
                                <td className="text-center">
                                    <span className="badge badge-success">Aktiv</span>
                                </td>
                                <td>Kompressor 1</td>
                                <td className="text-center">700 timer</td>
                                <td className="text-center">900 kWh</td>
                            </tr>
                            {/* Compressor 2 */}
                            <tr>
                                <td className="text-center">
                                    <span className="badge badge-warning">Ikke aktiv</span>
                                </td>
                                <td>Kompressor 2</td>
                                <td className="text-center">650 timer</td>
                                <td className="text-center">685 kWh</td>
                            </tr>
                            {/* Compressor 3 */}
                            <tr>
                                <td className="text-center">
                                    <span className="badge badge-warning">Ikke aktiv</span>
                                </td>
                                <td>Kompressor 3</td>
                                <td className="text-center">850 timer</td>
                                <td className="text-center">1050 kWh</td>
                            </tr>
                            {/* Compressor 4 */}
                            <tr>
                                <td className="text-center">
                                    <span className="badge badge-success">Aktiv</span>
                                </td>
                                <td>Kompressor 4</td>
                                <td className="text-center">950 timer</td>
                                <td className="text-center">250 kWh</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default KompressorTabell;