import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <h2>Welcome to Addis Eats</h2>
      <p style={{ fontSize: '1.1rem', color: '#f5e3e3', marginBottom: '20px' }}>
        Discover authentic traditional dishes and local favorites delivered straight to your door.
      </p>

      
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', maxWidth: '400px', margin: '0 auto 20px auto', backgroundColor: '#f9f9f9' }}>
        <h3>🔥 Today's Special</h3>
        <p><strong>Special Kitfo & Beyaynetu Combo</strong></p>
        <p style={{ color: '#666' }}>Freshly prepared local dishes with authentic spices.</p>
      </div>

      <div>
        <Link 
          to="/menu" 
          style={{ 
            display: 'inline-block',
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Browse Full Menu →
        </Link>
      </div>
    </div>
  );
}