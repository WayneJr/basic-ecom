import React, { useState } from "react";
import "./Login.css";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function Login() {
	let history = useHistory();
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let login = (e) => {
		e.preventDefault();
	};

	return (
		<div className="login">
			<div className="login__card">
				<h1>Shoppe</h1>
				<form className="login__form">
					<Input
						type="email"
						fullWidth={true}
						placeholder="Email"
						autoComplete="true"
						color="secondary"
						autoFocus={true}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						fullWidth={true}
						placeholder="Password"
						required
						color="secondary"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						variant="contained"
						color="secondary"
						onClick={login}>
						Sign In
					</Button>
					<p className="login__cta">
						Don't have an Account?{" "}
						<Link to="/create">
							<span>Create One</span>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
