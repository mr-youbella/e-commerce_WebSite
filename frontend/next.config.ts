import type { NextConfig } from "next";
import dotenv from 'dotenv';

dotenv.config({path: "../.env.local"});

const nextConfig: NextConfig =
{
	images:
	{
		remotePatterns:
		[
			{
				protocol: "http",
				hostname: "res.cloudinary.com", 
				pathname: "/**"
			}
		]
	}
};

export default nextConfig;
