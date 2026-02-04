'use client';
import { JSX, Suspense, useEffect, useState } from 'react';
import ProductApi from '../GET/ProductsApi';
import Link from 'next/link';
import Image from 'next/image';
import { ProductsType } from '../Interfaces/ProductsType';

function LoadingProducts(): JSX.Element
{
	return (
		<>
			{
				Array.from({length: 5}).map((value, index) =>
				{
					return (
						<div key={index} className="w-full sm:w-[80%] cursor-pointer hover:shadow-2xl p-1 transation duration-300 hover:scale-105 animate-pulse">
							<div className="aspect-square w-full mb-2 border rounded-sm bg-gray-300"></div>
							<div className="space-y-2">
								<h3 className="rounded h-3 bg-gray-500"></h3>
								<p className="h-2 w-1/2 bg-gray-500"></p>
								<p className="h-1 w-1/3 bg-gray-400"></p>
							</div>
						</div>
					);
				})
			}
		</>
	);
}

export default function FilterProduct({category_id}: {category_id: number}): JSX.Element
{
	let	[category, setCategory] = useState<Array<{name: string, amount: number}> | undefined>(undefined);
	let	[products, setProducts] = useState<ProductsType[] | undefined>(undefined);
	let	[is_loading, setIsLoading] = useState<boolean>(true);
	useEffect(() =>
	{
		async function getProductData()
		{
			try
			{
				products = await ProductApi();
				setProducts(products);
			}
			catch (err)
			{
				console.log(err);
			}
			finally
			{
				setIsLoading(false);
			}
		}
		getProductData();
	}, []);
	let	c_is = Number(category_id);
	let	[index_category, setIndexGatergory] = useState<number>(c_is && (c_is >= 1 && c_is <= 10) ? c_is : 0);
	let	[range, setRange] = useState<number>(100);
	let	min_range: number = (products && Math.min(...products?.map((value) => (value.price)))) || 0;
	let	max_range: number = (products && Math.max(...products?.map((value) => (value.price)))) || 0;
	let	[sort, setSort] = useState<string>("HTL");
	let	[filter_product, setFilterProduct] = useState<ProductsType[] | undefined>(undefined);
	useEffect(() =>
	{
		if (!products)
			return ;
		const	sorted: ProductsType[] | undefined = [...products].sort((a, b) => (sort === "HTL" ? b.price - a.price : a.price - b.price));
		const	filter: ProductsType[] | undefined = sorted?.filter((value) => (value.price >= min_range && value.price <= Math.floor(min_range + (range / 100) * (max_range - min_range))));
		if (index_category)
			setFilterProduct(filter.filter((value) => (value.category === index_category)));
		else
			setFilterProduct(filter);
	}, [products, sort, index_category, range]);
	useEffect(() =>
	{
		setCategory
		([
			{
				name: "All",
				amount: products ? products.length : 0
			},
			{
				name: "Electronics",
				amount: products?.filter((value) => (value.category === 1)).length || 0
			},
			{
				name: "Fashion & Apparel",
				amount: products?.filter((value) => (value.category === 2)).length || 0
			},
			{
				name: "Beauty & Personal Care",
				amount: products?.filter((value) => (value.category === 3)).length || 0
			},
			{
				name: "Home & Living",
				amount: products?.filter((value) => (value.category === 4)).length || 0
			},
			{
				name: "Baby & Kids",
				amount: products?.filter((value) => (value.category === 5)).length || 0
			},
			{
				name: "Health & Fitness",
				amount: products?.filter((value) => (value.category === 6)).length || 0
			},
			{
				name: "Books & Stationery",
				amount: products?.filter((value) => (value.category === 7)).length || 0
			},
			{
				name: "Automotive",
				amount: products?.filter((value) => (value.category === 8)).length || 0
			},
			{
				name: "Pet Supplies",
				amount: products?.filter((value) => (value.category === 9)).length || 0
			},
			{
				name: "Gifts",
				amount: products?.filter((value) => (value.category === 10)).length || 0
			},
		]);
	}, [products]);

	return (
		<div className="flex flex-col sm:flex-row sm:my-20 xl:mx-45">
			<div className="sm:w-[35%] p-10">
				<h3 className="text-xl mb-2">Filter by Price</h3>
				<input min={0} max={100} onChange={(event) => (setRange(Number(event.target.value)))} value={range} className="block w-full mb-2 accent-blue-600" type="range"/>
				<div className="flex">
					<button className="rounded-sm text-white bg-blue-500 p-1 w-[30%] mb-2 mr-2 cursor-not-allowed hover:bg-blue-600">Filter</button>
					<p className="flex justify-end my-auto w-full h-full">Price: {min_range} DH — {Math.floor(min_range + (range / 100) * (max_range - min_range))} DH</p>
				</div>
				<h3 className="mt-10 mb-5 text-2xl">category</h3>
				<div className="flex flex-col leading-5">
					{category && category.map((value, index) =>
					{
						return (
							<button key={index} onClick={() => (setIndexGatergory(index))} className="text-start flex justify-between py-2 cursor-pointer capitalize hover:text-cyan-700">{value.name}<span>({value.amount})</span></button>
						);
					})}
				</div>
			</div> 
			<div className="bg-white w-full">
				<div className="m-[10%]">
					<h3 className="text-4xl font-bold mb-10">{category ? category[index_category].name : "Category Name"}</h3>
					<p>Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed ut.</p>
					<div className="flex justify-end">
						<select onChange={(event) => (setSort(event.target.value))} value={sort} className="my-5 p-1 border rounded-sm">
							<option value="LTH">Sort by price: low to high</option>
							<option value="HTL">Sort by price: high to low</option>
						</select>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-1 justify-items-center text-black">
						{is_loading ? <LoadingProducts /> : filter_product?.filter((value) => (value.status === "approved")).map((value, index) =>
						{
							return (
								<Link key={index} className="w-full sm:w-[80%] cursor-pointer hover:shadow-2xl p-1 transation duration-300 hover:scale-105" href={`./Store/${value.title}?id=${value.id}`}>
									<div className="relative aspect-square w-full mb-2 border rounded-sm">
										{value.image && <Image className="object-content rounded-md" src={value.image} alt="Product Image" fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"/>}
									</div>
									<div className="leading-none">
										<h3 className="text-sm">{value.title.length >= 20 ? `${value.title.substring(0, 20)}...` : value.title}</h3>
										<p className="font-bold">{value.price} DH</p>
										<del className="text-xs opacity-55">{value.old_price ? (value.old_price + "DH") : ""}</del>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
