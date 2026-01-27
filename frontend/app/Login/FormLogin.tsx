"use client";
import {useEffect, useRef, type JSX} from 'react';
import {ToastContainer, toast} from "react-toastify";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faL, faLock} from '@fortawesome/free-solid-svg-icons';
import {LoginFormData} from './actions';
import {useActionState} from 'react';


export default function FormLogin(): JSX.Element
{
	let	[state, action] = useActionState(LoginFormData, {error: undefined});
	let	toast_id = useRef<string | number| null>(null);
	function ft_submit ()
	{
		toast_id.current = toast.loading("Login...");
	}
	useEffect(() =>
	{
		if (state.error)
		{
			if (toast_id.current)
			{
				toast.update(toast_id.current,
				{
					type: "error",
					render: state.error,
					isLoading: false,
					autoClose: 4000,
					closeButton: true,
					
				});
			}
		}
	}, [state]);


	return (
		<form action={action} onSubmit={ft_submit} className="m-4">
			<div className="relative mb-2">
				<input className="bg-gray-200 w-full p-2 rounded-xl pl-6" type="email" name="email" placeholder="Email"/>
				<FontAwesomeIcon className="absolute top-1/2 -translate-y-1/2 left-1 opacity-60" icon={faEnvelope} />
			</div>
			<div className="relative">
				<input className="bg-gray-200 w-full p-2 rounded-xl pl-6" type="password" name="password" placeholder="Password"/>
				<FontAwesomeIcon className="absolute top-1/2 -translate-y-1/2 left-1 opacity-60" icon={faLock} />
			</div>
			<p className="text-right cursor-pointer">Forgot password!?</p>
			<button className="bg-black/90 text-white text-xl w-full p-2 rounded-3xl my-2 cursor-pointer hover:bg-black">Login</button>
			<ToastContainer />
		</form>
	);
}
