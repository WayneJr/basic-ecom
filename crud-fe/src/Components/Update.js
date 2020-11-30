import React, { useState, useEffect } from "react";
import "./Add.css";
import { Input, Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Add() {
	const id = useParams();
	let [{ user }] = useStateValue();
	const [file, setFile] = useState(null);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	let history = useHistory();

	useEffect(async () => {
		const a = await fetch(
			`https://basic-ecom.waynejr.repl.co/api/v1/products/${id.id}`
		);
		const b = await a.json();
		if (b.success) {
			setName(b.data.name);
			setQuantity(b.data.availableStock);
			setPrice(b.data.price);
			setFile(b.data.image);
		}
	}, []);

	let handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="add">
			<div className="add__card">
				<p className="add__title">Update Product</p>
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
					<p className="file__label">Product Image</p>
					<Input
						color="secondary"
						type="file"
						accept="image/x-png,image/jpeg"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						type="submit">
						Update
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Add;
