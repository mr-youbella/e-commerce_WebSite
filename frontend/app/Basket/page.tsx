import { JSX } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';

interface propsTypes
{
	type: string,
	placeholder: string,
}

function InputsStyles({type, placeholder}: propsTypes): JSX.Element
{
	let	margin_b: boolean = true;
	if (placeholder === "coupon code")
		margin_b = false;

	return (
		<div className={`flex-2 relative border rounded-md ${margin_b ? "mb-2" : ""}`}>
			<input className="peer w-full rounded-md px-4 pt-6 pb-2" placeholder=" " id={placeholder} type={type}/>
			<label className="absolute top-4 left-4 opacity-50 peer-focus:top-1 peer-focus:opacity-100 peer-focus:text-blue-500 peer-not-placeholder-shown:top-1 transition duration-300 capitalize select-none" htmlFor={placeholder}>{placeholder}</label>
		</div>
	);
}

export default function Basket(): JSX.Element
{
	return (
		<div className="min-h-screen bg-[#f5f7f9] flex flex-col">
			<NavBar />
			<div className="flex flex-1 gap-4 flex-col-reverse md:flex-row mx-2 xl:mx-[17%] my-10">
				<form className="flex-1 bg-white p-4 rounded-sm">
					<h3 className="mb-4 text-xl font-bold">Contact</h3>
					<InputsStyles type="email" placeholder="email"/>
					<InputsStyles type="tel" placeholder="phone number"/>
					<h3 className="mb-4 text-xl font-bold">Billing details</h3>
					<div className="flex gap-2">
						<div className="flex-1">
							<InputsStyles type="text" placeholder="first name"/>
						</div>
						<div className="flex-1">
							<InputsStyles type="text" placeholder="last name"/>
						</div>
					</div>
					<div className="relative w-full">
						<select className="peer border w-full px-4 pt-6 pb-2 rounded-md mb-2 focus:border-blue-500">
							<option>Morocco</option>
						</select>
						<label className="absolute left-5 opacity-50 peer-focus:text-blue-500 peer-focus:opacity-100">Country</label>
					</div>
					<InputsStyles type="text" placeholder="full address"/>
					<h3 className="mb-4 text-xl font-bold">Any additional!?</h3>
					<div className="relative w-full">
						<textarea className="peer border w-full px-4 pt-6 rounded-md mb-2 placeholder:font-bold" placeholder=" "></textarea>
						<label className="absolute left-4 top-4 opacity-50 peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:top-1 peer-focus:top-1 peer-focus:opacity-100">Order notes</label>
					</div>
					<h3 className="mb-4 text-xl font-bold">Payment</h3>
					<div className="w-full rounded-md p-3 border">
						<input className="accent-blue-600 scale-125" id="payemnt1" type="radio"/>
						<label className="ml-3" htmlFor="payemnt1">Cash on delivery</label>
					</div>
					<hr className="my-4"/>
					<button className="w-full rounded-md p-3 bg-blue-700 text-white text-xl cursor-pointer hover:bg-blue-800">Place Order <span className="font-bold text-green-300">9400 DH</span></button>
				</form>
				<div className="flex-1">
					<div className="flex items-center gap-3 p-1 rounded-md text-lg hover:bg-gray-300">
						<div className="relative aspect-square w-20 flex justify-center items-center">
							<img className="border aspect-square w-17" src="/products_images/p1.jpg"/>
							<span className="absolute top-0 right-0 inline-block aspect-square w-5 font-bold text-sm text-center rounded-full text-white bg-blue-500">3</span>
						</div>
						<h2>MacBook pro M4 PRO</h2>
						<p className="ml-auto">150 DH</p>
					</div>
					<div className="flex items-center gap-3 p-1 rounded-md text-lg hover:bg-gray-300">
						<div className="relative aspect-square w-20 flex justify-center items-center">
							<img className="border aspect-square w-17" src="/products_images/p2.jpg"/>
							<span className="absolute top-0 right-0 inline-block aspect-square w-5 font-bold text-sm text-center rounded-full text-white bg-blue-500">99</span>
						</div>
						<h2>Keyboard</h2>
						<p className="ml-auto">90 DH</p>
					</div>
					<hr className="my-4"/>
					<div className="flex gap-3">
						<InputsStyles type="text" placeholder="coupon code"/>
						<button className="flex-1 rounded-md bg-blue-700 text-white text-xl cursor-pointer hover:bg-blue-800">Apply</button>
					</div>
					<div className="flex p-2">
						<h3>Subtotal</h3>
						<p className="ml-auto">9360 DH</p>
					</div>
					<div className="flex p-2">
						<h3>Shipping</h3>
						<p className="ml-auto">40 DH</p>
					</div>
					<hr className="m-2"/>
					<div className="flex p-4">
						<h3 className="text-lg font-bold">Total</h3>
						<p className="ml-auto font-bold">9400 DH</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}