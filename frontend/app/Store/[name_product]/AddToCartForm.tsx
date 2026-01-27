'use client';
import { useState, type JSX } from 'react';
import type { ProductsType } from '../../Interfaces/ProductsType'

interface	propsType
{
	current_product: ProductsType | undefined;
}

export default function	AddToCartForm({current_product}: propsType): JSX.Element
{
	let	[amount, setAmount] = useState<number>(1);

	return (
		<>
			<h2 className="text-2xl font-bold mb-5">{current_product && (current_product.price * amount).toFixed(2)} DH</h2>
			<div className="w-full">
				<input onChange={(event) => (setAmount(Number(event.target.value)))} value={amount} min={1} className="bg-white border p-1 w-[15%] mr-5 rounded-md" type="number" inputMode="numeric"/>
				<button className="bg-blue-600 w-[50%] p-1 rounded-xl text-white text-xl cursor-pointer hover:bg-blue-700">Add To Card</button>
			</div>				
		</>
	);
}
