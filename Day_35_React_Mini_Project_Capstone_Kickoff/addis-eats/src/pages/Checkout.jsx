import { useState } from 'react';
import { useCart } from '../cart/CartContext';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import { useCartStore } from '../cart/cartStore';

export default function Checkout() {
  const { user, login } = useAuth();
  // const { cartItems, totalETB, clearCart } = useCart();
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalETB = useCartStore((state) => state.getTotalETB);

  const totalETB = getTotalETB();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

 
  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '30px' }}>
        <h2>Sign In Required</h2>
        <p>You must be signed in to complete your checkout.</p>
        <button 
          onClick={login}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sign In Now
        </button>
      </div>
    );
  }

  
  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '30px' }}>
        <h2>🎉 Order Confirmed!</h2>
        <p>Thank you for ordering with Addis Eats.</p>
        <Link to="/menu">Return to Menu</Link>
      </div>
    );
  }

  
  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px' }}>
        <h2>Your Cart is Empty</h2>
        <p>You haven't added any dishes yet.</p>
        <Link to="/menu">Go to Menu</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !phone) {
      alert('Please fill out all delivery fields.');
      return;
    }
    setSubmitted(true);
    clearCart();
  };


  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '10px' }}>
      <h2>Checkout</h2>

      
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
        <h3>Your Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>{item.name} (x{item.quantity})</span>
            <span>{item.price * item.quantity} ETB</span>
          </div>
        ))}
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>{totalETB} ETB</span>
        </div>
      </div>

      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>Delivery Details</h3>
        <div>
          <label style={{ display: 'block' }}>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="e.g. Bole, Addis Ababa"
          />
        </div>

        <div>
          <label style={{ display: 'block' }}>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="e.g. +251 911 000 000"
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Place Order ({totalETB} ETB)
        </button>
      </form>
    </div>
  );
}