import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyles } from './globalStyles';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import RequestPasswordReset from "./components/auth/RequestPasswordReset";
import Home from "./components/guild/Home";
import Alert from "./components/shared/Alert";
import PrivateRoute from "./components/auth/PrivateRoute";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyles />
            <Alert />
            <Router>
                <Switch>
                    <PrivateRoute path="/" exact component={Home} />
                    <Route path="/auth/login" exact component={Login} />
                    <Route path="/auth/register" exact component={Register} />
                    <Route path="/auth/req/password" exact component={RequestPasswordReset} />
                    <Route
                        path="/auth/reset/password/:token"
                        exact
                        component={ResetPassword}
                    />
                </Switch>
            </Router>
        </>
    );
};

export default App;
