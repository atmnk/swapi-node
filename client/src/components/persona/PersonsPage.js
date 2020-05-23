import React from "react";
import _ from 'underscore';
import User from "../../api/user";

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
    }

    componentDidMount() {
        
    }

    
    render() {
        return (
            <div>List of all Persons</div>
        );
    }

}
