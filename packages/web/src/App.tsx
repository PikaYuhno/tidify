import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/*import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';*/

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Home = React.lazy(() => import("./pages/Home"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));

const App: React.FC = () => {
	return (
		<>
			<Router>
				<Switch>
					<Suspense fallback={<div>Loading...</div>}>
						<Route path="/" exact component={Home} />
						<Route path="/auth/login" exact component={Login} />
						<Route path="/auth/register" exact component={Register} />
						<Route
							path="/auth/reset/password/:token"
							exact
							component={ResetPassword}
						/>
					</Suspense>
				</Switch>
			</Router>
		</>
	);
};

export default App;
