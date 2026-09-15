import { useReducer} from "react";

// const [state, dispatch] = useReducer(cartReducer, { items: [] });

export default function cartReducer(state, action) {
    switch (action.type) {
        case "add":
            return { ...state, items: [...state.items, action.game] };
        case "remove":
            return { ...state, items: state.items.filter(d => d.id !== action.id) };
        case "clear":
            return { items: [] };
        default:
        throw new Error("Unknown action: " + action.type);
    }
}