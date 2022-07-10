import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItem;
    let updatedItems;
    const updatedTotalAmount =
      state.totalAmount + action.payload.amount * action.payload.price;
    const existingItemIndex = state.items.findIndex(
      (i) => i.id === action.payload.id
    );
    const existingItem = state.items[existingItemIndex];

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItem = { ...action.payload };
      updatedItems = state.items.concat(updatedItem);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if ((action.type = "DELETE")) {
    let updatedItem;

    const existingItemIndex = state.items.findIndex((i) => i.id === action.id);
    const existingItem = state.items[existingItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      //remove entire item
      updatedItems = state.items.filter((i) => i.id !== action.id);
    } else {
      //decrease by one
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCart;
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "DELETE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
