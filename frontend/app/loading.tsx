import Image from 'next/image';

export default function LoadingPage()
{
	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<div className="relative">
				<div className="absolute inset-0 border border-y-transparent rounded-full animate-spin"></div>
				<div className="aspect-square w-40 cursor-pointer relative">
					<Image className="object-cover" fill src="/products_images/logo.webp" alt="logo" sizes="160px"/>
				</div>
			</div>
			<h1 className="text-5xl font-bold m-4">Loading....</h1>
		</div>
	);
}