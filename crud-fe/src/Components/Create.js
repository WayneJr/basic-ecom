import "./Login.css";
import React, { useState } from "react";
import "./Login.css";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

function Login() {
	let history = useHistory();
	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let register = (e) => {
		e.preventDefault();
	};

	return (
		<div className="login">
			<div className="login__card">
				<h1>Create Account</h1>
				<form className="login__form">
					<Input
						type="text"
						fullWidth={true}
						placeholder="Username"
						color="secondary"
						required
						onChange={(e) => setName(e.target.value)}
						autoFocus={true}
					/>
					<Input
						type="email"
						fullWidth={true}
						placeholder="Email"
						color="secondary"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						fullWidth={true}
						placeholder="Password"
						color="secondary"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						variant="contained"
						color="secondary"
						onClick={register}>
						Create Account
					</Button>
				</form>
				<Link to="/">
					<p className="gobackhomebtn">Go back home &rarr;</p>
				</Link>
			</div>
		</div>
	);
}

export default Login;
