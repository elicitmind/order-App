import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [orderCheckout, setOrderCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  // console.log(cartCtx);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  //UWAGA!! IN THIS MOMENT I WANT TO HANDLE A SINGLE ITEM BEING ADDED DIRECTLY FROM THE CART THEREFORE I OVERRIDE ITS AMOUNT!
  const cartItemAddHandler = (item) => {
    //INCREDIBLE!! SPREAD OPERATOR AND ITS ABILITY TO COPY, OVERRIDE VALUES AND DELIVER OBJECTS!! SUPER USEFUL
    // console.log({ ...item, price: 666 });
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setOrderCheckout(true);
  };

  const cancelCheckout = () => {
    setOrderCheckout(false);
  };

  

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    const sendOrders = async () => {
      await fetch(
        'https://let-s-backend-default-rtdb.europe-west1.firebasedatabase.app/ORDERS.json',
        {
          method: 'POST',
          body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        }
      );
    };
    sendOrders();
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
  };

  const modalActions = (
    <div className={styles.actions}>
      <button onClick={props.onCloseClick} className={styles['button--alt']}>
        Close
      </button>
      {hasItems && !orderCheckout && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <ul className={styles['cart-items']}>
        {cartCtx.items.map((e) => (
          <CartItem
            key={e.id}
            {...e}
            onAdd={cartItemAddHandler.bind(null, e)}
            onRemove={cartItemRemoveHandler.bind(null, e.id)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>that will cost you!</span>
        <span>{totalAmount}</span>
      </div>
      {orderCheckout && (
        <Checkout
          cancelCheckout={cancelCheckout}
          onCheckout={submitOrderHandler}
        />
      )}
      {!orderCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data, submitting..</p>;
  const orderSubmittedModalContent = (
    <React.Fragment>
      <p>SUCCESS YOU GOT IT !! 4 MINUTES OPEN THE DOOR</p>
      <div className={styles.actions}>
      <button onClick={props.onCloseClick} className={styles.button}>
        Close
      </button>
         </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onCloseClick}>
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && !didSubmit && cartModalContent}
      {didSubmit && !isSubmitting && orderSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
