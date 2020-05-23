import React from "react";
import _ from 'underscore';
import User from "../../api/user";
import messages from "../../assets/messages/errors.json";
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
        _.bindAll(this, 'submit', 'resetPassword', 'changeState', 'onSuccess','updateText', 'handleChange', 'renderError', 'navigateTo');
    }

    componentDidMount() {
        if (window.getJwtToken()) {
            this.navigateTo(Url.PERSONS_PAGE);
        }
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
        window.storeToken(data.token);
        // window.setRefreshToken(data.refreshToken);
        // window.setTokenExpiry(data.tokenExpiresAt);
        window.renderNavBar();
        this.navigateTo(Url.PERSONS_PAGE);
    }

    onFail(error) {
        if (error.response) {
            this.setState({ errors: error.response.data.error });
        }
    }

    login() {
        const loginData = {
            username: this.state.username,
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

    renderError(className = 'text-danger') {
        const containsError = this.state.errors && this.state.errors !== undefined;
        if (containsError) {
            const errorMessage = this.state.errors;
            return <span className={className}>{messages[errorMessage] ? messages[errorMessage] : errorMessage}</span>;
        }
    }

    updateText(event) {
        const attributeName = event.target.name;
        const attributeValue = event.target.value;

        this.state.model.set(attributeName, attributeValue);
        this.setState({ model: this.state.model });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    navigateTo(url, state = {}) {
        this.props.history.push(url, state);
    }

    render() {
        return (
            <div>
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
                                    <label id="loginError">
                                        {this.renderError()}
                                    </label>
                                    
                                    
                                    <Form className="login-form">
                                        <Form.Group controlId="username">
                                            <Form.Control type="text" name='username' placeholder="Username" onChange={this.changeState} />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Control onKeyDown={this.onEnter} type="password" name='password' placeholder="Password" value={this.state.password} onChange={this.changeState} />
                                        </Form.Group>
                                        <Button variant="primary" type="button" onClick={this.submit} id="loginButton">
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
