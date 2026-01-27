import Link from 'next/link'
import Image from 'next/image';
import type { JSX } from 'react';

export default function FrontPage(): JSX.Element
{
	return (
		<div className="m-4 md:my-20 lg:mx-20 xl:mx-50">
			<div className="flex flex-col sm:flex-row bg-[#eeedf2] w-full p-10 md:p-16 rounded-3xl">
				<div className="flex-1">
					<h1 className="text-3xl sm:text-5xl mb-5 md:mb-10 font-bold">Level Up Your Shopping Experience</h1>
					<p className="text-2xl">Discover a smarter way to shop with premium products, seamless browsing, and everything you need in one place.</p>
					<Link className="inline-block my-10 bg-blue-600 p-2 px-5 rounded-3xl text-white text-xl cursor-pointer hover:bg-blue-700" href="/Store">Shop Now</Link>
				</div>
				<div className="hidden xl:flex flex-1">
					<div className="relative w-2/3 mx-auto h-4/5 my-auto shadow-2xl shadow-black">
						<Image className="absolute object-cover bg-center rounded-md" src="/bg_FrontPage.webp" fill alt="Image HomePage"></Image>
					</div>
				</div>
			</div>
		</div>
	);
}
