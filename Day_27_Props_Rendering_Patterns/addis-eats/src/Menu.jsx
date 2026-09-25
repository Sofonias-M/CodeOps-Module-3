import dishes from './data.jsx';
import { useState } from 'react';
import OrderForm from './OrderForm.jsx';


function Dish({ name, price, category, spicy }) {
    return (
        <div className="dish">
            <h3 >{name}</h3>
            <p className='priceOriginal'>{price} ETB</p>
            <p className='itemCategory'>{category}</p>
            {spicy && <span className='spicyItem'>🔥 Spicy</span>}
        </div>
    );
}


export default function Menu() {
    const [category, setCategory] = useState("All");
    const cats = ["All", "Main", "Vegan", "Grill", "Drinks"];
    const shown = category === "All" ? dishes : dishes.filter(d => d.category === category);
    const [total, setTotal] = useState(0);
    
    function addToOrder(price) {
        setTotal(total + price, 0);
    }

    function OrderButton() {
        function handleClick() {
            alert("Doro Wat added to your order");
        }
        return <button id='orderButtonWithAlert' onClick={handleClick}>Order</button>;
    }


    return (
        <div>
            <div className='categoryFilterList'>
                {cats.map(c => (
                <button key={c} onClick={() => setCategory(c)}>{c}</button>
                ))}
            </div>

            <div className='dishContainer'>
                {shown.length === 0 ? <p>No dishes in this category yet.</p> 
                : shown.map(d => <Dish key={d.id} {...d} />)}
            </div>

            <OrderButton />

            <div className='orderItems'>
                {dishes.map(dish => (<button key={dish.id} onClick={() => addToOrder(dish.price)}>{dish.name} -- {dish.price} ETB</button>))}
            </div>
            
            {<h4 id='orderTotal'>Ordered Total: {total}</h4>}

            {/* <div className='input-group'>
                <OrderForm />
            </div> */}
            <OrderForm />

        </div>
    );
}
