"use client";
import {JSX, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function ButtonSetStatus(): JSX.Element
{
	let	[is_open, setIsOpen] = useState<boolean>(false);
	return (
		<div className="flex-1 relative">
			<button onClick={() => (setIsOpen(!is_open))} className="flex-1"><FontAwesomeIcon className="hover:bg-blue-500 hover:text-white p-3 rounded-md cursor-pointer" icon={faAngleDown}/></button>
			<div className="p-1 w-40 bg-white absolute right-10 border border-gray-400 rounded-md shadow-2xl flex flex-col gap-2 z-20" hidden={!is_open}>
				<button className="text-green-600  p-1 rounded-sm cursor-pointer hover:bg-green-500/40" >Approved</button>
				<button className="text-blue-600  p-1 rounded-sm cursor-pointer hover:bg-blue-500/40">Needs Changes</button>
				<button className="text-red-600  p-1 rounded-sm cursor-pointer hover:bg-red-500/40">Rejected</button>
			</div>
		</div>
	);
}
