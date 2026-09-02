import './App.css';
import Menu from './MenuItem.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

{/* <h1>Welcome to Addis Eats.</h1> */}
// const restaurantName = "Addis Café";


// function withVAT(){
//   Menu.forEach(element => {
//     element.price = element.price * 1.15;
//   });
// } 
// console.log({Header})

function App () {
  return (
    <div>
      {/* <h1>Addis Eats</h1>
      <p>Order great food across Addis.</p>
      <h1>{restaurantName}</h1>*/}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

export default App
