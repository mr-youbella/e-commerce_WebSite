import {JSX} from 'react';
import NavBar from "../NavBar";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ButtonLogOut from "./ButtonLogOut";
import FormAddProduct from "./FormAddProduct";

export default async function AddProduct(): Promise<JSX.Element>
{
	const	cookie = await cookies();
	let		response = undefined;
	if (cookie.has("token"))
	{
		try
		{
			response = await fetch(`${process.env.BACKEND_URL}/verfiy`,
			{
				headers: {Authorization: `Bearer ${cookie.get("token")?.value}`}
			});
		}
		catch (e)
		{
			console.log(e);
			redirect("/Login");
		}
		if (response && !response.ok)
				redirect("/Login");
	}
	else
		redirect("/Login");
	return (
		<div className="min-h-screen flex flex-col">
			<NavBar />
			<div className="m-4 grow">
				<h1 className="text-center bg-blue-400/20 p-2 w-fit mx-auto rounded-4xl border-2 border-blue-600 text-blue-700 px-3">✨ Product Management</h1>
				<h2 className="text-center text-5xl font-bold">Add Products to Your Store</h2>
				<p className="text-center m-4">Create and manage your product catalog with a beautiful, intuitive form. Set prices, discounts, categories, and more.</p>
				<div className="bg-gray-100 rounded-2xl my-5 md:mx-auto md:w-2/3 lg:w-1/3">
					<div className="p-5 py-8 bg-linear-to-l from-blue-600 via-purple-700 to-cyan-700 rounded-t-2xl">
						<h2 className="text-2xl font-bold text-white"><FontAwesomeIcon icon={faStore} /> Add New Product</h2>
						<p className="text-white">Create and list a new product in your store</p>
					</div>
					<FormAddProduct />
					<ButtonLogOut />
				</div>
			</div>
			<Footer />
		</div>
	);
}
