export interface ProductsType
{
	id?: number;
	title: string;
	price: number;
	old_price: number;
	image: File;
	category: string;
	about: string;
	description: string;
	attributes: string;
	values_attributes: string;
	status: string;
}

export interface UsersType
{
	id: number;
	username: string;
	email: string;
	password: string;
}

export interface EmailType
{
	email: string;
}
