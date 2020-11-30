import "./Login.css";
import React, { useState } from "react";
import "./Login.css";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Login() {
	let [{ user }, dispatch] = useStateValue();
	let history = useHistory();
	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let register = async (e) => {
		e.preventDefault();
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("name", name);
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
				"https://basic-ecom.waynejr.repl.co/api/v1/auth/register",
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
				alert("Error creating user");
			}
		};

		fetchData();
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
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus={true}
					/>
					<Input
						type="email"
						fullWidth={true}
						placeholder="Email"
						value={email}
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
						value={password}
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
