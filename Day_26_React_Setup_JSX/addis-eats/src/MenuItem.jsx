import menu from './Menu.jsx';
// import withVAT from './App.jsx';

function Dish({name, price, description, category, withVAT}) {
  return (
    <div className="dish">
      <h3 className='itemName'>{name}</h3>
      <p className='priceOriginal'>{price} ETB</p>
      <p className='itemDescription'>{description}</p>
      <p className='itemCategory'>{category}</p>
      <p className='withVAT'>withVAT: {withVAT.toFixed(2)} ETB</p>
    </div>
  );
}


function Menu() {
return (
    <div className='dishContainer'>
      {menu.map(d => <Dish key={d.id} name={d.name} price={d.price} 
      description={d.description} category={d.category} withVAT={d.price * 1.15}/>)}
    </div>
  );
}

export default Menu