import Image from 'next/image';
import Link from 'next/link';
import type { ProductsType } from '../Interfaces/ProductsType'
import ProductApi from '../GET/ProductsApi'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faGift, faShirt, faSpa, faHouse, faBaby, faDumbbell, faBook, faCarSide, faCat } from "@fortawesome/free-solid-svg-icons";

export default async function Products()
{
	let products: ProductsType[] | undefined = undefined;
	products = await ProductApi();

	return (
		<main className="mx-2 xl:mx-50 3xl:mx-150" id="products">
			<div className="lg:mx-auto rounded-md relative group">
				<div className="flex m-2">
					<div className="flex-1">
						<h3 className="text-2xl font-bold">Featured Products</h3>
					</div>
					<div>
						<Link href="/Store" className="text-md text-blue-600 cursor-pointer">Veiw All {'>'}</Link>
					</div>
				</div>
				<div className="overflow-y-hidden custom-scroll border border-gray-300 rounded-md">
					<div className="flex text-[#000000] m-2 gap-2">
						{products && products.filter((value) => (value.status === "approved")).map((value, index) =>
						{
							return (
								<Link key={index} className="cursor-pointer hover:shadow-2xl p-1 transition duration-300 hover:scale-105" href={`./Store/${value.title}?id=${value.id}`}>
									<div className="relative aspect-square w-35 md:w-45 mb-2 border rounded-sm overflow-hidden">
										<Image className="object-cover rounded-md" src={value.image} alt="Product Image" fill sizes="(max-width: 768px) 140px, 180px"/>
									</div>
									<h3 className="text-xl font-bold">{value.title.length >= 10 ? `${value.title.substring(0, 10)}...` : value.title}</h3>
									<div className="leading-none"> 
										<p>{value.price} DH</p>
										<del className="text-xs opacity-55">{value.old_price ? (value.old_price + "DH") : ""}</del>
									</div>
								</Link>
							);
						})}
						<h3 className="text-3xl absolute right-4 top-1/2 -translate-y-1/2 bg-gray-400 aspect-square w-10 text-center rounded-full opacity-20 transition duration-300 group-hover:opacity-90">{">"}</h3>
						<h3 className="text-3xl absolute left-4 top-1/2 -translate-y-1/2 bg-gray-400 aspect-square w-10 text-center rounded-full opacity-20 transition duration-300 group-hover:opacity-90">{"<"}</h3>
					</div>
				</div>
			</div>
			<div className="my-10">
				<h2 className="text-center my-4 text-2xl font-bold">Shop by category</h2>
				<div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
					<Link href="/Store?category_id=1" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-purple-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faLaptop} />
						<h3 className="mt-3">Electronics</h3>
					</Link>
					<Link href="/Store?category_id=2" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-pink-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faShirt} />
						<h3 className="mt-3">Fashion & Apparel</h3>
					</Link>
					<Link href="/Store?category_id=3" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-yellow-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faSpa} />
						<h3 className="mt-3">Beauty & Personal Care</h3>
					</Link>
					<Link href="/Store?category_id=4" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-blue-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faHouse} />
						<h3 className="mt-3">Home & Living</h3>
					</Link>
					<Link href="/Store?category_id=5" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-green-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faBaby} />
						<h3 className="mt-3">Baby & Kids</h3>
					</Link>
					<Link href="/Store?category_id=6" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-emerald-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faDumbbell} />
						<h3 className="mt-3">Health & Fitness</h3>
					</Link>
					<Link href="/Store?category_id=7" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-red-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faBook} />
						<h3 className="mt-3">Books & Stationery</h3>
					</Link>
					<Link href="/Store?category_id=8" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-cyan-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faCarSide} />
						<h3 className="mt-3">Automotive</h3>
					</Link>
					<Link href="/Store?category_id=9" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-orange-400/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faCat} />
						<h3 className="mt-3">Pet Supplies</h3>
					</Link>
					<Link href="/Store?category_id=10" className="border-gray-300 shadow-sm text-center shadow-gray-400 p-5 rounded-2xl cursor-pointer hover:bg-gray-50/60">
						<FontAwesomeIcon className="bg-amber-300/40 text-4xl p-5 rounded-full w-20 h-20 aspect-square " icon={faGift} />
						<h3 className="mt-3">Gifts</h3>
					</Link>
				</div>
			</div>
			<div className="my-10 p-3  rounded-md">
				<div className="flex m-2">
					<div className="flex-1">
						<h3 className="text-2xl font-bold">Trending & Low Spend Finds</h3>
					</div>
					<div>
					<Link href="/Store" className="text-md text-blue-600 cursor-pointer">See More {'>'}</Link>
					</div>
				</div>
				<div className="grid gap-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-items-center text-black">
					{products && products.filter((value) => (value.status === "approved")).map((value, index) =>
					{
						return (
							<Link key={index} className="w-full cursor-pointer hover:shadow-2xl p-1 transition duration-300 hover:scale-105" href={`./Store/${value.title}?id=${value.id}`}>
								<div className="relative aspect-square w-full mb-2 border rounded-sm">
										<Image className="object-cover rounded-md" src={value.image} alt="Product Image" fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 24vw, 20vw"/>
								</div>
								<div className="leading-none">
									<h3 className="text-xl font-bold">{value.title.length >= 20 ? `${value.title.substring(0, 20)}...` : value.title}</h3>
									<p>{value.price} DH</p>
									<del className="text-xs opacity-55">{value.old_price ? (value.old_price + "DH") : ""}</del>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</main>
	);
}
