import React, { useState } from "react";
import "./Login.css";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Login() {
	let [{ user }, dispatch] = useStateValue();
	let history = useHistory();
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let login = (e) => {
		e.preventDefault();
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("email", email);
		urlencoded.append("password", password);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
			redirect: "follow",
		};

		let fetchData = async () => {
			const a = await fetch(
				"https://basic-ecom.waynejr.repl.co/api/v1/auth/login",
				requestOptions
			);

			const b = await a.json();
			if (b.success) {
				dispatch({
					type: "SET_USER",
					user: b.data.token,
				});
				history.push("/");
			} else {
				alert("Error logging in");
			}
		};

		fetchData();
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
