const [state, dispatch] = useReducer(cartReducer, { items: [] });
const total = state.items.reduce((s, d) => s + d.price, 0);


<button onClick={() => dispatch({ type: "add", dish })}>Add</button>
<button onClick={() => dispatch({ type: "clear" })}>Clear</button>
