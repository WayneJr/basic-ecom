import React, { useState, useEffect } from "react";
import "./ProductView.css";
import { useParams } from "react-router-dom";

function ProductView() {
	const id = useParams();
	const [item, setItem] = useState(null);

	useEffect(async () => {
		const a = await fetch(
			`https://basic-ecom.waynejr.repl.co/api/v1/products/${id.id}`
		);
		const b = await a.json();
		console.log(b);
		setItem(b.data);
	}, []);
	return (
		<div className="productview">
			<p>Product Pages</p>
		</div>
	);
}

export default ProductView;
