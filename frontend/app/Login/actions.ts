"use server";
import { cookies } from "next/headers";

interface State
{
	error?: string | undefined;
	succes?: boolean | undefined;
};

export async function LoginFormData(pre_state: State, login_form_data: FormData): Promise<State>
{
	const	email = login_form_data.get("email");
	const	password = login_form_data.get("password");
	let		response = undefined;
	let		data = undefined;
	try
	{
		response = await fetch(`${process.env.BACKEND_URL}/login`,
		{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email: email, password: password})
		});
		data = await response.json();
	}
	catch (e)
	{
		console.log(e);
	}
	if (response && response.ok)
	{
		const	cookie = await cookies();
		cookie.set("token", data.token,
		{
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
			maxAge: 60 * 60,
		});
		return ({succes: true});
	}
	return ({error: "Invalid email or password"});
}
