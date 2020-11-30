import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
	const [products, setProducts] = useState([]);

	useEffect(async () => {
		const a = await fetch("https://basic-ecom.waynejr.repl.co/api/v1/products");
		const b = await a.json();
		setProducts(b.data.products);
	}, []);

	return (
		<div className="home">
			<p className="home__title">PRODUCTS</p>
			<div className="home__showcase">
				{products.length > 0 ? (
					products.map((product) => (
						<Product
							key={product._id}
							name={product.name}
							price={product.price}
							availableStock={product.availableStock}
							image={product.image}
							id={product.slug}
						/>
					))
				) : (
					<p style={{ fontWeight: "600", fontStyle: "italic" }}>
						Be the first to make a listing
					</p>
				)}
			</div>
		</div>
	);
}

export default Home;
