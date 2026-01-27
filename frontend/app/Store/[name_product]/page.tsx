import type { JSX } from 'react';
import Image from 'next/image';
import NavBar from '../../NavBar';
import Footer from '../../Footer';
import InfoProduct from './InfoProduct';
import AddToCartForm from './AddToCartForm';
import ProductApi from '../../GET/ProductsApi'
import type { ProductsType } from '../../Interfaces/ProductsType'
import { redirect } from 'next/navigation';

export default async function	Product(props: {params: {name_product: string}, searchParams: {id: string}}): Promise<JSX.Element>
{
	const	params = await props.params;
	const	search_params = await props.searchParams;
	const	id_product: number | undefined = Number(search_params.id);
	let		products: ProductsType[] | undefined = undefined;
	let		current_product: ProductsType | undefined = undefined;
	try
	{
		products = await ProductApi();
		current_product = products && products.find((value) => (value.id === id_product));
	}
	catch (err)
	{
		console.log(err);
	}

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
	if (!current_product || decodeURIComponent(params.name_product) !== current_product.title)
		redirect("/Store");
	return (
		<div>
			<NavBar />
			<div className="p-5 md:p-10 md:mx-40">
				<div className="flex flex-col md:flex-row gap-2">
					<div className="flex-1 justify-items-center">
						<div className="relative w-full md:w-[70%] aspect-square border border-gray-500 transition duration-300 hover:scale-105">
							<Image className="object-cover" src={current_product && current_product.image || ""} alt="product" fill/>
						</div>
					</div>
					<div className="flex-1 w-full flex flex-col justify-center">
						<p className="mb-5 capitalize">{current_product && getCategoryName(current_product.category) || "Name category"}</p>
						<h1 className="text-2xl sm:text-7xl mb-5">{current_product && current_product.title || "TITLE"}</h1>
						<h2 className="text-2xl font-bold mb-5">{current_product && current_product.price || "00.00"} DH<del className="opacity-50 font-normal ml-2 text-xl">{current_product && current_product.old_price ? (current_product.old_price + "DH") : ""}</del></h2>
						<p className="mb-5">{current_product && current_product.about || "About this product..."}</p>
						<hr className="mb-5" />
						<AddToCartForm current_product={current_product}/>
					</div>
				</div>
				<InfoProduct id_product={id_product}/>
			</div>
			<Footer />
		</div>
	);
}
