import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDishesApi } from '../api/mockData';
import { useCart } from '../cart/CartContext';
import { useCartStore } from '../cart/cartStore';

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  // const { addToCart } = useCart();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setLoading(true);
    fetchDishesApi()
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch dishes.');
        setLoading(false);
      });
  }, []);

  const filteredDishes =
    selectedCategory === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  if (loading) return <p>Loading dishes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Menu</h2>

      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {['All', 'Traditional', 'Vegetarian'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSearchParams({ category: cat })}
            style={{ fontWeight: selectedCategory === cat ? 'bold' : 'normal' }}
          >
            {cat}
          </button>
        ))}
      </div>


      <div style={{ display: 'grid', gap: '10px' }}>
        {filteredDishes.map((dish) => (
          <div key={dish.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            {/* <img src = {dish.img} width="200px" height="200px"/> */}
            <h3>{dish.name} - {dish.price} ETB</h3>
            <p>{dish.description}</p>
            {/* <p>{dish.dsc}</p> */}
            {/* console.log(filteredDishes) */}
            
            <button onClick={() => addToCart(dish)}>
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}