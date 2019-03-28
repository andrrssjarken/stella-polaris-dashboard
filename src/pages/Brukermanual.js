import React from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer';
import { 
    Accordion, 
    AccordionItem, 
    AccordionItemTitle, 
    AccordionItemBody 
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';


class Faq extends React.Component {
    state = {
        sideMenu: true
    };

    // Toggle side bar menu
    _onSideMenu = (active) => {
        this.setState({sideMenu: active});
    };

    render() {
        return (
            <div className="page-wrapper"> 
                {/* Navigation */}
                <Navigation onClick={this._onSideMenu} />
                {/* End Navigation */}
                
                <div className={`main-content d-flex flex-column ${this.state.sideMenu ? '' : 'hide-sidemenu'}`}>
                    {/* Breadcrumb */}
                    <div className="main-content-header">
                        <Breadcrumb>
                            <h1>Brukermanual</h1>
                            <Link to="/dashboard" className="breadcrumb-item">
                                Tilbake til dashboard
                            </Link>
                            <Breadcrumb.Item active>Brukermanual</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {/* End Breadcrumb */}

                    {/* Faq area */}
                    <Row> 
                        <Col lg={12}>
                            <Accordion className="custom-accordion mb-4">
                                <h4 className="heading"></h4>
                                <AccordionItem>
                                    
                                    <AccordionItemTitle>
                                        <h3>Om prosessene</h3>
                                        <div className="accordion__arrow"></div>
                                    </AccordionItemTitle>

                                    <AccordionItemBody>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> 
                                        <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </AccordionItemBody>
                                </AccordionItem>

                                <AccordionItem>
                                    
                                    <AccordionItemTitle>
                                        <h3>Hvor hentes dataen?</h3>
                                        <div className="accordion__arrow"></div>
                                    </AccordionItemTitle>

                                    <AccordionItemBody>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> 
                                        <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </AccordionItemBody>
                                </AccordionItem>

                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3>Hvor ofte oppdateres dataen?</h3>
                                        <div className="accordion__arrow"></div>
                                    </AccordionItemTitle>

                                    <AccordionItemBody>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> 
                                        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                    </AccordionItemBody>
                                </AccordionItem>

                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3>Hvordan kan jeg generere rapport?</h3>
                                        <div className="accordion__arrow"></div>
                                    </AccordionItemTitle>

                                    <AccordionItemBody>
                                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p> 
                                    </AccordionItemBody>
                                </AccordionItem>

                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3>Hvem har laget dette?</h3>
                                        <div className="accordion__arrow"></div>
                                    </AccordionItemTitle>

                                    <AccordionItemBody>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> 
                                        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                    </AccordionItemBody>
                                </AccordionItem> 
                                
                            </Accordion>
                        </Col>
                    </Row>
                    {/* End Faq area */}

                    {/* Footer  */}    
                    <div className="flex-grow-1"></div>
                    <Footer />
                    {/* End Footer  */}
                </div>
            </div>
        );
    }
}

export default Faq;