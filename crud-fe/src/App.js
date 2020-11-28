import "./App.css";
import Login from "./Components/Login";
import Create from "./Components/Create";
import Home from "./Components/Home";
import Add from "./Components/Add";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/create">
						<Create />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/add">
						<Nav />
						<Add />
					</Route>
					<Route path="/">
						<Nav />
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
