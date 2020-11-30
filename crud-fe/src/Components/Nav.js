import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useStateValue } from "./StateProvider";

function Nav() {
	const [{ user }, dispatch] = useStateValue();
	const [showNav, setShowNav] = useState(false);
	const [width, setWidth] = useState(0);
	let toggleNav = () => {
		setShowNav(!showNav);
	};

	useEffect(() => {
		let getWidth = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener("resize", getWidth);

		getWidth();
		return () => {
			window.removeEventListener("resize", getWidth);
		};
	}, []);

	let logout = () => {
		dispatch({
			type: "SET_USER",
			user: null,
		});
		toggleNav();
	};

	return (
		<nav>
			<div className="nav__branding">
				<Link to="/">Shoppe</Link>
			</div>

			{showNav || width > 767 ? (
				<div className="nav__items">
					<ul>
						<li onClick={toggleNav}>
							<Link to="/">Catalog</Link>
						</li>
						<li onClick={toggleNav}>
							<Link to="/add">Create Listing</Link>
						</li>
						<li onClick={logout}>
							{user ? (
								<Link to="/login">Logout</Link>
							) : (
								<Link to="/login">Login</Link>
							)}
						</li>
					</ul>
				</div>
			) : (
				""
			)}
			<div className="nav__details">
				<p>Hello, {user ? "User" : "Guest"} </p>

				<div
					className={showNav ? "nav__hamburger toggle" : "nav__hamburger"}
					onClick={toggleNav}>
					<div className="nav__bar"></div>
					<div className="nav__bar"></div>
					<div className="nav__bar"></div>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
