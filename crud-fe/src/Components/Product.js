import React from "react";
import "./Product.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function product({ name, price, image, availableStock, id }) {
	return (
		<div
			className="product"
			style={{
				backgroundImage: `url(${image})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}>
			{/* <img className="product__bg" src={image} alt="" /> */}
			<div className="bg-wrap"></div>
			<div className="product__info">
				<p className="product__name">{name}</p>
				<p className="product__price">${price}</p>
				<p className="product__qty">Qty: {availableStock}</p>
				<Button variant="contained" color="secondary">
					SHOP NOW
				</Button>
				<Link to={`/product/${id}`}>
					<Button variant="contained" color="primary">
						EDIT
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default product;
