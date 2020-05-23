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

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: null
        };
        _.bindAll(this, 'submit', 'resetPassword', 'changeState', 'onSuccess');
        // _.bindAll(this, 'submit','updateText', 'handleChange', 'renderError', 'navigateTo');
    }

    componentDidMount() {
        // if (window.getJwtToken()) {
        //     this.navigateTo(Url.CONTENT);
        // }
    }

    changeState(event) {
        let fieldValue = event.target.value;
        let fieldName = event.target.name;
        this.setState({ [fieldName]: fieldValue });
    }

    onSuccess(response) {
        const { data } = response
        const user = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        };
        window.storeToken(data.idToken);
        window.setRefreshToken(data.refreshToken);
        window.setTokenExpiry(data.tokenExpiresAt);
        window.userInit(user);
        window.renderNavBar();
        this.navigateTo(Url.CONTENT);
    }

    onFail(error) {
        if (error.response) {
            this.setState({ errors: error.response.data.error });
        }
    }

    login() {
        const loginData = {
            username: this.state.email,
            password: this.state.password
        };
        let user = new User();
        user.login(loginData)
            .then(response => this.onSuccess(response))
            .catch(error => this.onFail(error));
    }

    submit = () => { this.login(); };

    onEnter = (e) => { if (e.keyCode === 13) { this.login(); } };

    resetPassword() {
        this.navigateTo(Url.RESET_PASSWORD);
    }

    render() {
        return (
            <div className="login-page my-n5">
                <div className="container">
                    <Row>
                        <Col xl={{ offset: 7, span: 5 }} sm={{ span: 8, offset: 2 }} md={{ offset: 3, span: 6 }}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className="sign-in-label">Sign in</Card.Title>
                                    <Card.Subtitle className="not-registered d-none">Not yet registered?
                                    <Card.Link href="/users">
                                            &nbsp;Sign up now</Card.Link>
                                    </Card.Subtitle>
                                    <label className="login-error">
                                        Some Error
                                    {/* {this.renderError('message')} */}
                                    </label>
                                    
                                    
                                    <Form className="login-form">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="text" name='username' placeholder="Username" onChange={this.changeState} />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control onKeyDown={this.onEnter} type="password" name='password' placeholder="Password" value={this.state.password} onChange={this.changeState} />
                                        </Form.Group>
                                        <Button variant="primary" type="button" onClick={this.submit}>
                                            LOGIN
                                    </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}
