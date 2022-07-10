import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartShown, setCartShown] = useState(false);

  const showCarthandler = () => {
    setCartShown(true);
  };
  const hideCartHandler = () => {
    setCartShown(false)
  }
  return (
    <CartProvider>
      {cartShown && <Cart onClose={ hideCartHandler}/>}
      <Header onShowCart={ showCarthandler}/>
      <Meals />
    </CartProvider>
  );
}

export default App;
