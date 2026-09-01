import './App.css'
import Menu from './Dish.jsx'

{/* <h1>Welcome to Addis Eats.</h1> */}

function Header() {
  return <h1>Addis Eats</h1>;
}

function App () {
  return (
    <div>
      {/* <h1>Addis Eats</h1> */}
      {/* <Dish name="Firfir" price="220" />
      <Dish name="Pasta" price="240" /> */}

      <Header />
      <p>Order great food across Addis.</p>      
      <Menu />
      
    </div>
  );
}

export default App
