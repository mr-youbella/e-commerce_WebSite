"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import ProductApi from './GET/ProductsApi'
import Link from 'next/link';
import Image from 'next/image';
import type { JSX } from 'react';
import type { ProductsType } from './Interfaces/ProductsType'

interface	props_SearchResult
{
	products: ProductsType[] | undefined,
	search: string,
	is_focus: boolean,
}

function SearchResult({products, search, is_focus}: props_SearchResult): JSX.Element
{
	return (
		<div className={`w-full z-20 bg-[#151515] text-white p-4 overflow-x-auto absolute mt-3 custom-scroll transition duration-300 ${!is_focus ? "opacity-0" : "opacity-100"}`}>
			{products && search.length != 0 && products.filter((value) => (value.title.toLowerCase().includes(search.toLowerCase()))).map((value, index) =>
			{
				return (
					<Link key={index} className="flex items-center gap-2 m-1 p-2 rounded-sm bg-[#343232] cursor-pointer hover:bg-[#312f2f]" href={`/Store/${value.title}?id=${value.id}`}>
						<img className="aspect-square w-10" src={value.image}/>
						<h2>{value.title}</h2>
						<p>{value.price} DH</p>
					</Link>
				);
			})}
		</div>
	);
}

export default function NavBar()
{
	let	[nav_bar, setNavBar] = useState<boolean>(false);
	let	[is_focus, setIsFocus] = useState<boolean>(false);
	let	[search, setSearch] = useState<string>("");
	let	[products, setProducts] = useState<ProductsType[] | undefined>(undefined);
	useEffect(() =>
	{
		async function getDataProducts()
		{
			try
			{
				let	products = await ProductApi();
				setProducts(products);
			}
			catch (err)
			{
				console.log(err);
			}
		}
		getDataProducts();
	}, []);

	return (
		<nav>
			<div className={`flex delay-100 duration-300 ${nav_bar ? "bg-[#151515]" : "bg-[#15151560]"}`}>
				<div className="flex-1">
					<div className="aspect-square w-20 cursor-pointer relative">
						<Link href="/" className="absolute inset-0 z-10" aria-label="Home Page"></Link>
						<Image className="object-cover" fill src="/products_images/logo.webp" alt="logo" sizes="80px"/>
					</div>
				</div>
				<div className="flex-1 hidden sm:flex justify-center items-center">
					<Link href="/"><button className="text-2xl mx-2 font-bold text-[#ffffff] transition-color duration-400 hover:text-[#314e81] cursor-pointer">Home</button></Link>
					<Link href="/Store"><button className="text-2xl mx-2 font-bold text-[#ffffff] transition-color duration-400 hover:text-[#314e81] cursor-pointer">Store</button></Link>
					<Link href="/Basket"><button className="text-2xl mx-2 font-bold text-[#ffffff] transition-color duration-400 hover:text-[#314e81] cursor-pointer">Basket</button></Link>
					<button className="text-2xl mx-2 font-bold text-[#ffffff] transition-color duration-400 hover:text-[#314e81] cursor-pointer">About</button>
					<Link href="/Login"><button className="text-2xl mx-2 font-bold text-[#ffffff] transition-color duration-400 hover:text-[#314e81] cursor-pointer">Login</button></Link>
				</div>
				<div className="flex-1 hidden sm:flex justify-center items-center relative">
					<div className="relative w-[70%]">
						<input value={search} onChange={(event) => (setSearch(event.target.value))} onFocus={() => (setIsFocus(true))} onBlur={() => (setIsFocus(false))} className="bg-[#0F1E3A] text-[#F4F8FF] border-2 border-[#202C45] rounded-2xl p-1 pr-10 w-full" type="search" placeholder="Search your Product" />
						<FontAwesomeIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-white" icon={faMagnifyingGlass} />
						<SearchResult products={products} search={search} is_focus={is_focus}/>
					</div>
				</div>
				<div className="flex sm:hidden justify-center items-center m-2">
					<FontAwesomeIcon onClick={() => (setNavBar(!nav_bar))} className="text-white text-4xl" icon={faList} />
				</div>
			</div>
			<div className={`sm:hidden flex flex-col justify-center items-start bg-[#151515] duration-500 ${!nav_bar ? "opacity-0 h-0" : "opacity-100 h-fit"}`}>
				<Link href="/"><button className="text-2xl mx-5 p-1 font-bold text-[#A2B2D2] transition-color duration-400 hover:text-[#F4F8FF] cursor-pointer">Home</button></Link>
				<Link href="/Store"><button className="text-2xl mx-5 p-1 font-bold text-[#A2B2D2] transition-color duration-400 hover:text-[#F4F8FF] cursor-pointer">Store</button></Link>
				<Link href="/Basket"><button className="text-2xl mx-5 p-1 font-bold text-[#A2B2D2] transition-color duration-400 hover:text-[#F4F8FF] cursor-pointer">Basket</button></Link>
				<button className="text-2xl mx-5 p-1 font-bold text-[#A2B2D2] transition-color duration-400 hover:text-[#F4F8FF] cursor-pointer">About</button>
				<Link href="/Login"><button className="text-2xl mx-5 p-1 font-bold text-[#A2B2D2] transition-color duration-400 hover:text-[#F4F8FF] cursor-pointer">Login</button></Link>
				<div className="flex justify-center items-center w-full">
					<div className="relative w-[80%] m-4">
						<input value={search} onChange={(event) => (setSearch(event.target.value))} onFocus={() => (setIsFocus(true))} onBlur={() => (setIsFocus(false))} className="bg-[#0F1E3A] text-[#F4F8FF] border-2 border-[#202C45] rounded-2xl p-1 pr-10 w-full" type="search" placeholder="Search your Product" />
						<FontAwesomeIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-white" icon={faMagnifyingGlass} />
						<SearchResult products={products} search={search} is_focus={is_focus}/>
					</div>
				</div>
			</div>
		</nav>
	);
}
