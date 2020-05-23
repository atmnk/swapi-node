import React from "react";
import { Route, Redirect } from "react-router-dom/es";
import { Switch } from "react-router";
import Url from "./url";
import LoginPage from "./components/login/LoginPage";
import PersonsPage from "./components/persona/PersonsPage";

const Router = () => (
    <div>
        <Switch>
            
            {/* PrivateRoute     */}
            <Route exact path={Url.PERSONS_PAGE} component={PersonsPage} />        

            {/* Route */}

            <Route exact path={Url.LOGIN} component={LoginPage} />
        </Switch>
    </div>
);

const defaultRedirection = (props) => {
    return (
        <Redirect to={{
            pathname: Url.LOGIN,
            state: { from: props.location }
        }}
        />
    );
};

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props => (
//             (!window.getJwtToken() || window.getJwtToken() === null) ? defaultRedirection(props) : (
//                 <div>
//                     {window.renderNavBar()}
//                     <Component {...props} />
//                 </div>
//             )
//         )}
//     />
// );

export default Router;
