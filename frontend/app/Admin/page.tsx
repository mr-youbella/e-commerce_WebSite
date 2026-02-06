import {JSX} from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircleCheck, faXmark, faExclamation } from '@fortawesome/free-solid-svg-icons';
import type { ProductsType } from '../Interfaces/ProductsType'
import ProductApi from '../GET/ProductsApi'
import ButtonSetStatus from './ButtonSetStatus';

export default async function Admin(): Promise<JSX.Element>
{
	let products: ProductsType[] | undefined = undefined;
	products = await ProductApi();
	function getCategoryName(id: number): string
	{
		switch (id)
		{
			case 1: return ("Electronics");
			case 2: return ("Fashion & Apparel");
			case 3: return ("Beauty & Personal Care");
			case 4: return ("Home & Living");
			case 5: return ("Baby & Kids");
			case 6: return ("Health & Fitness");
			case 7: return ("Books & Stationery");
			case 8: return ("Automotive");
			case 9: return ("Pet Supplies");
			case 10: return ("Gifts");
		}
		return ("Name category");
	}
	function statusStyle(status: string): string
	{
		switch (status)
		{
			case "pending": return ("text-yellow-600 bg-yellow-400/40");
			case "approved": return ("text-green-600 bg-green-400/40");
			case "needs_changes": return ("text-blue-600 bg-blue-400/40");
			case "rejected": return ("text-red-600 bg-red-400/40");
		}
		return ("");
	}

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="grow lg:mx-auto my-15">
				<div className="mb-10">
					<h1 className="text-3xl font-bold">User Submitted Products Review</h1>
					<p className="">Review and manage product submissions from vendors</p>
				</div>
				<div className="flex gap-3">
					<div className="bg-white rounded-xl border border-gray-400 shadow/45 border-l-yellow-600 border-l-6 px-8 py-7 flex gap-10">
						<div className="space-y-2">
							<h3>Pending Approval</h3>
							<p className="font-bold text-3xl">{products?.filter((value) => (value.status === "pending")).length}</p>
						</div>
						<div className="flex justify-center items-center text-4xl text-yellow-400/60">
							<FontAwesomeIcon icon={faClock} />
						</div>
					</div>
					<div className="bg-white rounded-xl border border-gray-400 shadow/45 border-l-green-700 border-l-6 px-8 py-7 flex gap-10">
						<div className="space-y-2">
							<h3>Approved</h3>
							<p className="font-bold text-3xl">{products?.filter((value) => (value.status === "approved")).length}</p>
						</div>
						<div className="flex justify-center items-center text-4xl text-green-400/60">
							<FontAwesomeIcon icon={faCircleCheck} />
						</div>
					</div>
					<div className="bg-white rounded-xl border border-gray-400 shadow/45 border-l-red-700 border-l-6 px-8 py-7 flex gap-10">
						<div className="space-y-2">
							<h3>Rejected</h3>
							<p className="font-bold text-3xl">{products?.filter((value) => (value.status === "rejected")).length}</p>
						</div>
						<div className="flex justify-center items-center text-4xl text-red-400/60">
							<FontAwesomeIcon icon={faXmark} />
						</div>
					</div>
					<div className="bg-white rounded-xl border border-gray-400 shadow/45 border-l-blue-700 border-l-6 px-8 py-7 flex gap-10">
						<div className="space-y-2">
							<h3>Needs Revision</h3>
							<p className="font-bold text-3xl">{products?.filter((value) => (value.status === "needs_changes")).length}</p>
						</div>
						<div className="flex justify-center items-center text-4xl text-blue-400/60">
							<FontAwesomeIcon icon={faExclamation} />
						</div>
					</div>
				</div>
				<div className="border rounded-md my-13 p-4">
					<input className="border border-gray-400 rounded-md py-1 w-full" type="text" placeholder="Search by product name..."/>
					<div className="flex mt-5 gap-3">
						<select className="border border-gray-400 rounded-md py-1">
							<option disabled>Select a Status</option>
							<option>Pending</option>
							<option>Approved</option>
							<option>Rejected</option>
							<option>Needs Changes</option>
						</select>
						<select className="border border-gray-400 rounded-md py-1">
							<option disabled>Select a category</option>
							<option>Electronics</option>
							<option>Fashion & Apparel</option>
							<option>Beauty & Personal Care</option>
							<option>Home & Living</option>
							<option>Baby & Kids</option>
							<option>Health & Fitness</option>
							<option>Books & Stationery</option>
							<option>Automotive</option>
							<option>Pet Supplies</option>
							<option>Gifts</option>
						</select>
						<button className="hover:text-white hover:bg-blue-500 p-1 rounded-md cursor-pointer transition-color duration-100">Clear Filter</button>
					</div>
				</div>
				<div className="border rounded-md mx-auto text-center">
					<div className="flex mx-auto border-b border-gray-400 w-full p-3 bg-gray-100 rounded-md">
						<h3 className="flex-3 text-left">PRODUCT</h3>
						<h3 className="flex-1">VENDOR</h3>
						<h3 className="flex-1">PRICE</h3>
						<h3 className="flex-1">CATEGORY</h3>
						<h3 className="flex-1">STATUS</h3>
						<h3 className="flex-1">DATE</h3>
						<h3 className="flex-1">ACTIONS</h3>
					</div>
					{products && products.map((value, index) =>
					{
						return (
							<div key={index} className="flex p-3 border-b border-gray-400 hover:bg-gray-100">
								<div className="flex-3 flex">
									<img className="w-10" src={value.image}></img>
									<h3 className="my-auto mx-1 font-bold text-sm">{value.title}</h3>
								</div>
								<p className="flex-1 my-auto font-bold">Youbella</p>
								<p className="flex-1 my-auto font-bold">{value.price} DH</p>
								<p className="flex-1 my-auto">{getCategoryName(value.category)}</p>
								<p className={`flex-1 my-auto text-sm p-0.5 rounded-xl ${statusStyle(value.status!)} font-bold capitalize`}>{value.status}</p>
								<p className="flex-1 my-auto">Jan 15</p>
								<ButtonSetStatus id={value.id}/>
						</div>
						);
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
}
