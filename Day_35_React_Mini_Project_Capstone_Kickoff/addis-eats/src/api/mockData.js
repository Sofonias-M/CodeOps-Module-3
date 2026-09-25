export const MOCK_DISHES = [
  { id: '1', name: 'Doro Wat', category: 'Traditional', price: 350, description: 'Spicy chicken stew with boiled egg.' },
  { id: '2', name: 'Beyaynetu', category: 'Vegetarian', price: 200, description: 'Assorted vegetarian stews served on injera.' },
  { id: '3', name: 'Special Kitfo', category: 'Traditional', price: 400, description: 'Minced beef cooked with butter and mitmita.' }
];



export const fetchDishesApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DISHES), 2000); // Simulates network delay
  });
};


// export const MOCK_DISHES = 'https://free-food-menus-api-two.vercel.app/burgers';


// export const fetchDishesApi = async () => {
//   const response = await fetch(MOCK_DISHES);

//   if (!response.ok) {
//     throw new Error(`Failed to fetch dishes: ${response.status}`);
//   }

//   return response.json();
// };