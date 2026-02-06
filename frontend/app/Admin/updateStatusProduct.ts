"use server";

export async function StatusProduct(id: number | undefined, status: string): Promise<boolean>
{
	try
	{
		let response = await fetch(`${process.env.BACKEND_URL}/productStatus`,
		{
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify
			({
				id: id,
				status: status
			})
		});
		if (!response.ok)
			throw new Error("response not OK");
	   }
	catch (e)
	{
		console.error(e);
	}
	return (true);
}
