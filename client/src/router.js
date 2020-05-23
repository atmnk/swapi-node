import React from "react";
import { Route, Redirect } from "react-router-dom/es";
import { Switch } from "react-router";
import Url from "./url";
import LoginPage from "./components/login/LoginPage";
import PersonsPage from "./components/persona/PersonsPage";
import {getJwtToken} from './utils/cache'

const Router = () => (
    <div>
        <Switch>
            
            <PrivateRoute exact path={Url.PERSONS_PAGE} component={PersonsPage} />        

            <Route exact path={Url.LOGIN} component={LoginPage} />
        </Switch>
    </div>
);

const defaultRedirection = (props) => {
    console.log("Redirecting")
    return (
        <Redirect to={{
            pathname: Url.LOGIN,
            state: { from: props.location }
        }}
        />
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            (!getJwtToken() || getJwtToken() === null) ? defaultRedirection(props) : (
                <div>
                    {window.renderNavBar()}
                    <Component {...props} />
                </div>
            )
        )}
    />
);

export default Router;
