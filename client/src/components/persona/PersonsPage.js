import React from "react";
import User from "../../api/user";
import Persona from "../../api/persona"
import PersonaList from "./PersonaList"
import _, {isEmpty} from "underscore";
import {
    Form,
    Button,
    Card,
    Image,
    Row,
    Col
} from "react-bootstrap";
import Url from "../../url";

export default class PersonsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            personas:[],
        };
        _.bindAll(this, 'fetchPersonas')
    }
    fetchPersonas = () => {
        let persona = new Persona();
        persona.get_all()
            .then((response) => {
                this.setState({ personas: response.data.results})
            });
    }

    componentDidMount() {
        this.fetchPersonas();
    }
    render() {
        return (
            <div>
                <div id="personsPageTitle">List of all Persons</div>
                <PersonaList personas={this.state.personas}/>
            </div>
            
        );
    }

}
