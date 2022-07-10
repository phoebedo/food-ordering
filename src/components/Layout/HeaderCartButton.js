import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CardIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnBump, setbtnBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const itemCounts = cartCtx.items.reduce((cur, i) => {
    return cur + i.amount;
  }, 0);
  const { items } = { ...cartCtx };
  const btnClasses = `${classes.button} ${btnBump && classes.bump}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnBump(true);

    const timer = setTimeout(() => {
      setbtnBump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemCounts}</span>
    </button>
  );
};

export default HeaderCartButton;
