import React from "react";
import "./Product.css";
import { Button } from "@material-ui/core";

function product() {
	return (
		<div className="product">
			<img className="product__bg" />
			<div className="product__info">
				<p className="product__name">Name</p>
				<p className="product__price">Price</p>
				<Button variant="contained" color="secondary">
					SHOP NOW
				</Button>
			</div>
		</div>
	);
}

export default product;
