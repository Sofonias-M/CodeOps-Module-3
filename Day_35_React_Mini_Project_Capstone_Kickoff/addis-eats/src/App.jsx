import { useCartStore } from './cart/cartStore';

function Layout() {
  // Subscribe to cartItems for badge count
  const cartItems = useCartStore((state) => state.cartItems);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      {/* ... header links ... */}
      <Link to="/checkout">Checkout ({totalCount})</Link>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {/* No CartProvider needed with Zustand! */}
      <BrowserRouter>
        <Layout />
        <Routes>...</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}