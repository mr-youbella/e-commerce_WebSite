"use client";
import {useActionState, useEffect, useRef, useState} from 'react';
import { sendData } from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

export default function FormAddProduct()
{
	let	[state, action] = useActionState(sendData, {error: undefined});
	let	[counter_infoProduct, setCounterInfoProduct] = useState<Array<{id: number, att: string, val: string}>>([]);
	let	toast_id = useRef<string | number | null>(null);
	async function ft_submit()
	{
		toast_id.current = toast.loading("Add product...");
	}
	useEffect(() =>
	{
		if (state.error)
		{
			if (toast_id.current)
			{
				toast.update(toast_id.current,
				{
					render: state.error,
					type: "error",
					isLoading: false,
					autoClose: 4000,
					closeButton: true,
				})
			}
		}
		else
		{
			if (toast_id.current)
			{
				toast.update(toast_id.current,
				{
					type: "success",
					render: "Product Add successfully",
					isLoading: false,
					autoClose: 4000,
					closeButton: true,
				});
			}
		}
	}, [state]);

	return (
		<form action={action} onSubmit={ft_submit} className="flex flex-col p-4">
			<label>Product Title</label>
			<input className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none mb-4" placeholder='e.g MacBook Mr 14"' name="title" type="text" required />
			<div className="flex md:flex-row flex-col gap-5 mb-4">
				<div className="flex-1 flex flex-col">
					<label>Current Price</label>
					<input className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none" type="text" name="price" placeholder="1337.5" required />
				</div>
				<div className="flex-1 flex flex-col">
					<label>Original Price</label>
					<input className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none" type="text" name="old_price" placeholder="4242" />
				</div>
			</div>
			<label>Image URL</label>
			<input className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none mb-2" type="file" accept="image/*" name="image" placeholder="/products/image.png" required />
			<label>category</label>
			<select defaultValue="null" className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none mb-4" name="category" required>
				<option value="null" disabled>Select a category</option>
				<option value="1">Electronics</option>
				<option value="2">Fashion & Apparel</option>
				<option value="3">Beauty & Personal Care</option>
				<option value="4">Home & Living</option>
				<option value="5">Baby & Kids</option>
				<option value="6">Health & Fitness</option>
				<option value="7">Books & Stationery</option>
				<option value="8">Automotive</option>
				<option value="9">Pet Supplies</option>
				<option value="10">Gifts</option>
			</select>
			<label>About this Product</label>
			<input className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none mb-4" placeholder='This product is designed to deliver high quality and reliable performance...' name="about" type="text" required />
			<label>Product description</label>
			<textarea className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none mb-4" placeholder='A well-crafted product that combines functionality and style, making it a practical choice for users who value efficiency and simplicity...' name="description" required />
			<label>Additional information</label>
			{
				counter_infoProduct.map((value, index) =>
				{
					return (
						<div key={index} className="flex md:flex-row flex-col gap-5 mb-4">
							<div className="flex-1 flex flex-col">
								<label>Attribute</label>
								<input value={value.att} onChange={(event) => (setCounterInfoProduct((items) => (items.map((item) => (item.id === value.id ? {...item, att: event.target.value} : item)))))} className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none" type="text" name="att" placeholder="color" required />
							</div>
							<div className="flex-1 flex flex-col">
								<label>Value</label>
								<input value={value.val} onChange={(event) => (setCounterInfoProduct((items) => (items.map((item) => (item.id === value.id ? {...item, val: event.target.value} : item)))))} className="border border-gray-500 p-2 rounded-md focus:border-purple-600 focus:border-2 focus:outline-none" type="text" name="val" placeholder="yellow" required />
							</div>
							<button onClick={() => (setCounterInfoProduct((items) => (items.filter((item) => (item.id !== value.id)))))} className="flex bg-red-500 rounded-2xl p-2 text-white my-auto cursor-pointer hover:bg-red-600" type="button">Remove</button>
						</div>
					);
				})
			}
			<button type="button" onClick={() => (setCounterInfoProduct((value) => ([...value, {id: Date.now(), att: "", val: ""}])))} className="bg-purple-500 text-white w-fit p-2 mx-auto rounded-md m-2 cursor-pointer hover:bg-purple-600">Add information</button>
			<button className="m-4 bg-blue-600 rounded-2xl p-4 text-2xl font-bold text-white transition-colors duration-300 cursor-pointer hover:bg-blue-700"><FontAwesomeIcon icon={faStore} /> Add New Product</button>
			<ToastContainer />
		</form>
	);
}
