"use server";
import type { ProductsType } from '../Interfaces/ProductsType'

export default async function ProductApi(): Promise<ProductsType[] | undefined>
{
	let	products: ProductsType[] | undefined = undefined;
	try 
	{
		let response = await fetch(`${process.env.BACKEND_URL}/products`,
		{
			headers: {"secret-key": process.env.SECRET_KEY!},
			cache: "no-cache",
		});
		if (!response.ok)
			throw new Error("Failed to fetch products");
		products = await response.json();
	}
	catch
	{
		console.log("Failed to get products Data...");
	}
	return (products);
}

