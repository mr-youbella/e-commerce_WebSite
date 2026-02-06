"use client";
import { JSX } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {StatusProduct} from './updateStatusProduct'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export default function ButtonSetStatus({id}: {id: number | undefined}): JSX.Element
{
	const	router = useRouter();
	async function updateStatus(status: string)
	{
		const	toast_id = toast.loading("Loading...");
		const	ok = await StatusProduct(id, status);
		if (ok)
		{
			toast.update(toast_id,
			{
				type: "success",
				render: "Data is updated.",
				isLoading: false,
				autoClose: 5000,
				closeButton: true
			});
			router.refresh();
		}
		else
		{
			toast.update(toast_id,
			{
				type: "error",
				render: "Data is not updated.",
				isLoading: false,
				autoClose: 5000,
				closeButton: true
			})
		}
	}

	return (
		<div className="flex-1">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger className="outline-none"><FontAwesomeIcon className="hover:bg-blue-500 hover:text-white p-3 rounded-md cursor-pointer" icon={faAngleDown} /></DropdownMenu.Trigger>
				<DropdownMenu.Content className="relative right-14 bg-white border border-gray-400 shadow-[0_0_2px_#808080] rounded-md p-2 text-left">
					<DropdownMenu.Item onClick={() => (updateStatus("approved"))} className="text-green-400 text-base cursor-pointer hover:bg-blue-500 hover:text-white p-0.5 outline-none rounded-sm">Approved</DropdownMenu.Item>
					<DropdownMenu.Item onClick={() => (updateStatus("needs_changes"))} className="text-blue-400 text-base cursor-pointer hover:bg-blue-500 hover:text-white p-0.5 outline-none rounded-sm">Needs Changes</DropdownMenu.Item>
					<DropdownMenu.Item onClick={() => (updateStatus("rejected"))} className="text-red-400 text-base cursor-pointer hover:bg-blue-500 hover:text-white p-0.5 outline-none rounded-sm">Rejected</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
}
