export const API = fetch('https://free-food-menus-api-two.vercel.app/burgers')
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.error(error));
