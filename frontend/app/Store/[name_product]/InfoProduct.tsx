'use client';
import { useEffect, useState, type JSX } from 'react';
import ProductApi from '../../GET/ProductsApi'
import type { ProductsType } from '../../Interfaces/ProductsType'

export default function InfoProduct({id_product}: {id_product: number | undefined}): JSX.Element
{
	let	[ type_button, setTypeButton ] = useState<number>(1);
	let	[ description, setDescription ] = useState<string | undefined>(undefined);
	let	[ attributs, setAttributs ] = useState<string | undefined>(undefined);
	let	[ values, setValues ] = useState<string | undefined>(undefined);
	useEffect(() =>
	{
		async function getProducts()
		{
			let		current_product: ProductsType | undefined = undefined;
			let		products: ProductsType[] | undefined = undefined;
			try
			{
				products = await ProductApi();
				current_product = products && products.find((value) => (value.id === id_product));
				setDescription(current_product?.description);
				setAttributs(current_product?.attributes);
				setValues(current_product?.values_attributes);
			}
			catch (err)
			{
				console.log(err);
			}
		}
		getProducts();
	}, []);
	let	attrs: Array<string> | undefined = undefined;
	let	vals: Array<string> | undefined = undefined;
	if (attributs && values)
	{
		attrs = JSON.parse(attributs);
		vals = JSON.parse(values);
	}

	return (
		<div>
			<div className="flex my-10 gap-5 border-t border-gray-500">
				<button onClick={() => (setTypeButton(1))} className={`p-2 cursor-pointer ${type_button === 1 ? "border-t-2" : ""}`}>Description</button>
				<button onClick={() => (setTypeButton(2))} className={`p-2 cursor-pointer ${type_button === 2 ? "border-t-2" : ""}`}>Additional information</button>
				<button onClick={() => (setTypeButton(3))} className={`p-2 cursor-pointer ${type_button === 3 ? "border-t-2" : ""}`}>Reviews (0)</button>
			</div>
			<div className={`${type_button === 1 ? "block" : "hidden"}`}>
				<h3 className="text-4xl font-bold mb-5">Product description</h3>
				<p className="whitespace-pre-line break-all">{description ? JSON.parse(description) : "Description this product..."}</p>
			</div>
			<div className={`${type_button === 2 ? "block" : "hidden"}`}>
				<table className="table-auto border-collapse border">
					<caption className="p-1">More Details</caption>
					<tbody className="p-4">
						{attrs && vals && values && attrs.map((value, index) =>
						{
							return (
								<tr key={index} className="font-normal border">
									<th className="borde p-2">{value}</th>
									<th className="border p-2 w-full text-start font-normal">{vals[index]}</th>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className={`${type_button === 3 ? "block" : "hidden"}`}>
				<p>There are no reviews yet.</p>
			</div>
		</div>
	);
}
