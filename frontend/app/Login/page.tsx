import type {JSX} from 'react'
import NavBar from "../NavBar";
import Footer from "../Footer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import FormLogin from "./FormLogin";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Login(): Promise<JSX.Element>
{
	const	cookie = await cookies();
	let		response;
	if (cookie.has("token"))
	{
		try
		{
			response = await fetch("http://localhost:3001/verfiy",
			{
				headers: {Authorization: `Bearer ${cookie.get("token")?.value}`}
			});
		}
		catch (e)
		{
			console.log(e);
		}
		if (response && response.ok)
			redirect("/AddProduct");
	}
	return (
		<div className="min-h-screen flex flex-col bg-[url(/background_LoginPage.jpg)] bg-no-repeat bg-cover">
			<NavBar />
			<div className="grow">
				<div className="xl:w-1/4 md:w-1/2 md:mx-auto bg-linear-to-b from-cyan-200 to-white flex flex-col p-5 m-4 md:m-10 rounded-2xl text-center">
					<div className="m-4">
						<FontAwesomeIcon className="text-3xl bg-white/30 p-3 rounded-2xl shadow-2xl shadow-black" icon={faArrowRightToBracket} />
					</div>
					<h1 className="text-3xl font-bold">Sign in with email</h1>
					<p>Login now and add or manager your product</p>
					<FormLogin />
					<p className="mb-2">or sign in with</p>
					<div className="text-center">
						<FontAwesomeIcon className="bg-white px-5 py-1 rounded-xl border border-black text-xl shadow-2xl shadow-black cursor-pointer hover:text-green-300" icon={faGoogle} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
