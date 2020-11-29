import React, { useState } from "react";
import "./Add.css";
import { Input, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Add() {
	let history = useHistory();

	let handleSubmit = (e) => {
		e.preventDefault();
		history.replace("/");
	};

	const [name, setName] = useState("");
	const [price, setPrice] = useState(null);
	const [quantity, setQuantity] = useState(null);

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
					<Input color="secondary" type="file" />
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
