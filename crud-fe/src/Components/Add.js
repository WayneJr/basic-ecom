import React, { useState } from "react";
import "./Add.css";
import { Input, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Add() {
	let [{ user }] = useStateValue();
	const [file, setFile] = useState(null);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(null);
	const [quantity, setQuantity] = useState(null);
	let history = useHistory();

	let handleSubmit = (e) => {
		e.preventDefault();
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		myHeaders.append("Authorization", `Bearer ${user}`);

		var formdata = new FormData();
		formdata.append("name", name);
		formdata.append("price", price);
		formdata.append("availableStock", quantity);
		formdata.append("image", file, file.name);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: formdata,
			redirect: "follow",
		};

		fetch("https://basic-ecom.waynejr.repl.co/api/v1/products", requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
		history.replace("/");
	};

	return (
		<div className="add">
			<div className="add__card">
				<p className="add__title">Add Product</p>
				<form className="add__form" onSubmit={handleSubmit}>
					<Input
						color="secondary"
						placeholder="Name"
						type="text"
						autoFocus={true}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						color="secondary"
						placeholder="Price in USD"
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<Input
						color="secondary"
						placeholder="Quantity"
						type="number"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>

					<Input
						color="secondary"
						type="file"
						onChange={(e) => setFile(e.target.files[0])}
						accept="image/x-png,image/jpeg"
					/>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleSubmit}
						type="submit">
						Add listing
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Add;
