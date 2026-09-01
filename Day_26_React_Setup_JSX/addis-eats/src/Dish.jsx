const menu = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Shiro", price: 120 },
  { id: 3, name: "Tibs", price: 280 },
  { id: 4, name: "Firfir", price: 220},
  { id: 5, name: "Pasta", price: 240}
];

function Dish({name, price}) {
  return (
    <div className="dish">
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </div>
  );
}


function Menu() {
return (
    <div>
      {menu.map(d => <Dish key={d.id} name={d.name} price={d.price} />)}
    </div>
  );
}


export default Menu