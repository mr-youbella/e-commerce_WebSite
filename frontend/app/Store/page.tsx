import type { JSX } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import FilterProduct from './FilterProducts';


export default async function	Products(props: {searchParams: {category_id: number}}): Promise<JSX.Element>
{
	let	params = await props.searchParams;
	let	category_id = params.category_id;
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="grow">
				<FilterProduct category_id={category_id} />
			</div>
			<Footer />
		</div>
	);
}
