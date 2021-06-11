import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import RequestPasswordReset from "./components/auth/RequestPasswordReset";
import Home from "./components/guild/Home";
import Alert from "./components/shared/Alert";
import Calendar from "./components/calendar/Calendar";
import LandingPage from "./components/landing/LandingPage";

const App: React.FC = () => {
    return (
        <>
            <Alert />
            <Router>
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/app" exact component={Home} />
                    <Route path="/calendar" exact component={Calendar} />
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
