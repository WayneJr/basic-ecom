import React from "react";
import "./Product.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function product({ name, price, image, availableStock, id }) {
	return (
		<Link to={`/product/${id}`} v>
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
				</div>
			</div>
		</Link>
	);
}

export default product;
