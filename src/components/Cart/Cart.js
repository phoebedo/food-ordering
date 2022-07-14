import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitOrder, setSubmitOrder] = useState(false);
  const [didSubmitOrder, setDidSubmitOrder] = useState(false);

  const cartItemRemoveHandle = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const checkoutHandler = () => {
    setShowCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    await fetch(
      "https://food-order-9129f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setSubmitOrder(false);
    setDidSubmitOrder(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandle.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount: </span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout

          onConfirm={submitOrderHandler}
          onCancel={() => {
            setShowCheckout(false);
          }}
        />
      )}
      <div className={classes.actions}>
        {!showCheckout && (
          <button onClick={props.onClose} className={classes["button--alt"]}>
            Close
          </button>
        )}
        {hasItem && !showCheckout && (
          <button onClick={checkoutHandler} className={classes.button}>
            Order
          </button>
        )}
      </div>
    </React.Fragment>
  );

  const submitOrderContent = <p>Order is being sent...</p>;

  const didSubmitOrderContent = (
    <React.Fragment>
      <p>Sucessfully sent the order!</p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!didSubmitOrder && !submitOrder && cartModalContent}
      {submitOrder && submitOrderContent}
      {didSubmitOrder && didSubmitOrderContent}
    </Modal>
  );
};
export default Cart;
