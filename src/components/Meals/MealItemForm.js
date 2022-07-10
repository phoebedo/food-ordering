import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const [amountValid, setAmountValid] = useState(true);
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputRef.current.value;
    const enteredAmountToNum = +enteredAmount;

    if (enteredAmountToNum < 1) {
      setAmountValid(false);
      return;
    }

    props.onAddToCart(enteredAmountToNum);
  };

  return (
    <form action="" className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">Add</button>
      {!amountValid && <p>Please enter a valid amount</p>}
    </form>
  );
};
export default MealItemForm;
