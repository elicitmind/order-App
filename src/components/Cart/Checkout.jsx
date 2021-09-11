import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });
  //store my form inputs data in ref
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  //dummy validation to prevent form submit and render input errors
  const isEmpty = (value) => value.trim() === '';
  //ON SUBMIT
  const confirmHandler = (event) => {
    event.preventDefault();
    //give a name to input current value
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;
    //booleans to determine is input is valid after submission
    const enteredNameIsValid = !isEmpty(name);
    const enteredStreetIsValid = !isEmpty(street);
    const enteredCityIsValid = !isEmpty(city);
    const enteredPostalIsValid = !isEmpty(postal);
    //state to keep the validity of input accessible
    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });
    //condition to allow the form submission
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;
    //always use CONSOLE LOG with state names/variables/booleans along of my code to find errors
    console.log(name, street, postal, city, formValidity, formIsValid);
    //prevent submit if inputs are not valid
    if (!formIsValid) {
      return;
    }

    props.onCheckout({
      name: name,
      street: street,
      city: city,
      postal: postal,
    });
  };
  //custom styles for my inputs, use template literals for dynamic insertion of extra invalid class when condition failed
  const nameClasses = `${classes.control} ${
    formValidity.name ? '' : classes.invalid
  }`;

  const streetClasses = `${classes.control} ${
    formValidity.street ? '' : classes.invalid
  }`;

  const postalClasses = `${classes.control} ${
    formValidity.postal ? '' : classes.invalid
  }`;

  const cityClasses = `${classes.control} ${
    formValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p> Please enter a valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formValidity.street && <p> Please enter a valid street</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formValidity.postal && <p> Please enter a valid post code</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formValidity.city && <p> Please enter a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.cancelCheckout}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
