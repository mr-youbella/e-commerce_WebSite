import Products from './Home/Products';
import FrontPage from './Home/FrontPage';
import Footer from './Footer';
import NavBar from './NavBar';

export default function Home()
{
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<FrontPage />
			<div className="grow">
				<Products />
			</div>
			<Footer />
		</div>
	);
}
