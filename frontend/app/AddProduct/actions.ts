"use server";
import { cookies } from "next/headers";
import { ProductsType } from "../Interfaces/ProductsType";

export async function logOut()
{
	const	cookie = await cookies();
	cookie.delete("token");
	console.log("delete");
}

interface State
{
	error?: string | undefined;
	succes?: boolean | undefined;
};

export async function sendData(pre_state: State, form_data: FormData): Promise<State>
{
	let	response;
	try
	{
		const	fd = new FormData();
		const	data: ProductsType =
		{
			title: form_data.get("title") as string,
			price: Number(form_data.get("price")),
			old_price: Number(form_data.get("old_price")),
			image: form_data.get("image") as string,
			category: Number(form_data.get("category")),
			attributes: JSON.stringify(form_data.getAll("att")),
			values_attributes: JSON.stringify(form_data.getAll("val")),
			about: form_data.get("about") as string,
			description: JSON.stringify(form_data.get("description")),
		};
		if (!data.category)
			return ({error: "Plase set category"});
		fd.append("data", JSON.stringify(data));
		fd.append("image", data.image);
		response = await fetch(`${process.env.BACKEND_URL}/products`,
		{
			method: "POST",
			body: fd
		});
	}
	catch (e)
	{
		console.log(e);
	}
	if (response && response.ok)
		return ({succes: true});
	try
	{
		const	{error} = await response?.json();
		return ({error: error});
	}
	catch
	{
		return ({error: "Data not sended try again..."});
	}
}
