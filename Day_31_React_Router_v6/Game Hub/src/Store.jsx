import {games} from './Game.jsx';
import { useState,useReducer } from 'react';
import OrderForm from './OrderForm.jsx';
import cartReducer from './CartReducer.jsx';

function Game({ id, name, price, category }) {
    return (
        <div className="game">
            <h3 >{name}</h3>
            <p className='priceOriginal'>{price} ETB</p>
            <p className='itemCategory'>{category}</p>
            <button onClick={() => dispatch({ type: "add", game })}>Add</button>
        </div>
    );
}

function Cart({ id, name, price, category }) {
    return (
        <div className="game">
            <h3 >{name}</h3>
            <p className='priceOriginal'>{price} ETB</p>
            <p className='itemCategory'>{category}</p>
            <button onClick={() => dispatch({ type: "remove", game })}>Remove</button>
        </div>
    );
}

export default function Store() {
    const [category, setCategory] = useState("All");
    const cats = ["All", "Racing", "Puzzle", "Action"];
    const shown = category === "All" ? games : games.filter(d => d.category === category);
    const [total, setTotal] = useState(0);
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    // const cart = items["All"] ? null : items.filter(d => d.id);
    
    function addToOrder(price) {
        setTotal(total + price, 0);
    }

    // function OrderButton() {
    //     function handleClick() {
    //         alert(`${games.name} added to your order`);
    //     }
    //     return <button id='orderButtonWithAlert' onClick={handleClick}>Place Order</button>;
    // }


    return (
        <div>
            <div className='categoryFilterList'>
                {cats.map(c => (
                <button key={c} onClick={() => setCategory(c)}>{c}</button>
                ))}
            </div>

            <div className='gameContainer'>
                {shown.length === 0 ? <p>No games in this category yet.</p> : shown.map(d => <Game key={d.id} {...d} />)}
            </div>

            {/* <OrderButton /> */}

            <div className='orderItems'>
                {games.map(game => (<button key={game.id} onClick={() => addToOrder(game.price)}>{game.name} -- {game.price} ETB</button>))}
            </div>
            
            <div className='orderItems'>
                <h4 id='orderTotal'>Cart</h4>
                {/* const total1 = state.items.reduce((s, d) => s + d.price, 0); */}
                {/* {itmes.length === 0 ? <p>No games in this category yet.</p> : items.map(d => <Game key={d.id} {...d} />)} */}
                {/* {items.map(game => (<button key={game.id} onClick={() => addToOrder(game.price)}>cart.map(d => <Cart key={d.id} {...d})</button>))}     */}
                {games.map(game => (<button key={game.id} onClick={() => addToOrder(game.price)}>{game.name} -- {game.price} ETB</button>))}
            </div>

            {<h4 id='orderTotal'>Ordered Total: {total}</h4>}

            {/* <div className='input-group'>
                <OrderForm />
            </div> */}
            <OrderForm />

        </div>
    );
}
