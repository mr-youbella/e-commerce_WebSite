"use client";
import type {JSX} from 'react';
import { logOut } from "./actions";
import Swal from 'sweetalert2';

export default function ButtonLogOut(): JSX.Element
{
	return (
		<div className="flex">
			<button onClick={ () =>
			{
				Swal.fire
				({
					title: "Log Out",
					text: "Are you sure!?",
					showCancelButton: true,
					showConfirmButton: true,
					confirmButtonColor: "red",
					confirmButtonText: "Yes",
				}).then((result) =>
				{
					if (result.isConfirmed)
						logOut();
				});
			}} className="bg-red-500 p-2 rounded-2xl text-white ml-auto mx-3 mb-1 cursor-pointer hover:bg-red-600">LogOut</button>
		</div>
	);
}
