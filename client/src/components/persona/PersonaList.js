import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default class PersonaList extends React.Component {

    constructor(props) {
        super(props);
    }

    renderPersona(persona) {
            console.log(persona)
            return(
                <div>{persona.name}</div>
            );
    }

    renderPersonaList() {
        let personas = this.props.personas;
        
        return personas.map((persona, index) => {
            return (
                <Row key={persona.id}>
                    <Col md={{span: 11, offset: 1}} >
                        {this.renderPersona(persona)}
                    </Col>
                </Row>
            );
        })
    }

    render() {
        return (
            <Row>
                <Col>
                    {this.renderPersonaList()}
                </Col>
            </Row>
        );
    }
}