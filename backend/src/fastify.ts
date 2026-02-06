import fastify from 'fastify';
import cors from '@fastify/cors';
import type { ProductsType, EmailType, UsersType } from './interfaces';
import postgres from 'fastify-postgres';
import argon2 from 'argon2';
import jwt from '@fastify/jwt';
import { v2 as cloudinary } from 'cloudinary';
import multiparr from '@fastify/multipart';
import dotenv from 'dotenv';

dotenv.config({path: "../.env.local"})

const	server = fastify({logger: true});

// Register Plugins
server.register(cors, {origin: ["https://youbella-e-commerce.vercel.app", "http://localhost:3000"]});
server.register(postgres,
{
	connectionString: process.env.DATABASE_PUBLIC_URL,
	ssl: {rejectUnauthorized: false},
});
server.register(jwt, {secret: process.env.JWT_SECRET!})
server.register(multiparr);
cloudinary.config
({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

// Products
server.get("/products", async (req, res) =>
{
	if (req.headers["secret-key"] === process.env.SECRET_KEY)
	{
		const {rows} = await server.pg.query("SELECT * FROM products ORDER BY id");
		return (rows);
	}
	res.status(401);
	return ({error: "Forbidden"});
});
server.post<{Body: ProductsType}>("/products", async (req, res) =>
{
	const	data = await req.file();
	if (!data)
	{
		res.status(401);
		return ({error: "Data no sended"});
	}
	const	fields = data.fields as Record<string, {value: string}>;
	const	product_data: ProductsType = JSON.parse(fields.data.value);
	const	buffer_image = await data.toBuffer();
	let		image_url: string = "";
	try
	{
		const	promise = await new Promise<string>((resolve, reject) =>
		{
			const	upload_image = cloudinary.uploader.upload_stream({folder: "products"}, (error, result) =>
			{
				if (error || !result)
					return (reject(error));
				return (resolve(result.url));
			});
			upload_image.end(buffer_image);
		});
		image_url = promise;
	}
	catch (e)
	{
		console.log(e);
		res.status(401).send({error: "Can't send data try again...."});
	}
	try
	{
		await server.pg.query(`INSERT INTO products (title, price, old_price, image, category, about, description, attributes, values_attributes, status) VALUES ('${product_data.title}', '${product_data.price}', '${product_data.old_price}', '${image_url}', '${product_data.category}', '${product_data.about}', '${product_data.description}', '${product_data.attributes}', '${product_data.values_attributes}', 'pending')`);
	}
	catch (e)
	{
		console.log(e);
		res.status(401).send({error: "Can't send data try again...."});
	}
});
// Subscribe
server.post<{Body: EmailType}>("/subscribe", async (req, res) =>
{
	const	{email} = req.body;
	try 
	{
		await	server.pg.query(`INSERT INTO subscribe (email) VALUES ('${email}')`);
	}
	catch (e)
	{
		res.status(409).send({error: `email=${email} already exists.`});
	}
});
// Login
server.post<{Body: UsersType}>("/login", async (req, res) =>
{
	const	{email, password} = req.body;
	const	{rows}  = await server.pg.query<UsersType>(`SELECT * FROM users WHERE email = $1`, [email]);
	if (rows.length)
	{
		const	check_password = await argon2.verify(rows[0].password, password);
		if (check_password)
		{
			const	token = await server.jwt.sign({email: email}, {expiresIn: "48h"});
			return ({token: token});
		}
	}
	res.status(401);
	return ({error: "Invalid email or password"});
});
server.get("/verfiy", {preHandler: async (req) => {await req.jwtVerify()}}, async (req) =>
{
	return { ok: true };
});

server.patch<{Body: {id: number, status: string}}>("/productStatus", async (req, res) =>
{
	const	body = await req.body;
	const	product_id = body.id;
	const	product_status = body.status;
	server.pg.query(`UPDATE products SET status='${product_status}' WHERE id=${product_id}`)
});

server.listen({port: Number(process.env.PORT) || 3001, host: "0.0.0.0"}, (error, address) =>
{
	if (error)
	{
		console.log(error);
		process.exit(1);
	}
	console.log(address);
});
