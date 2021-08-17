import { useRef, useState } from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(true)
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsFormValid(false)
      return;
    }

    props.onAddToCart(enteredAmountNumber)
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: 1,
          max: 10,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!isFormValid && <p>Wrong input, enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
