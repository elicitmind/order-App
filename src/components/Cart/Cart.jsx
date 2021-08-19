import { useContext } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  console.log(cartCtx);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };


  //UWAGA!! IN THIS MOMENT I WANT TO HANDLE A SINGLE ITEM BEING ADDED DIRECTLY FROM THE CART THEREFORE I OVERRIDE ITS AMOUNT!
  const cartItemAddHandler = (item) => {
//INCREDIBLE!! SPREAD OPERATOR AND ITS ABILITY TO COPY, OVERRIDE VALUES AND DELIVER OBJECTS!! SUPER USEFUL
    console.log({...item, price: 666})
    cartCtx.addItem({...item, amount: 1})

  };

  return (
    <Modal onClose={props.onCloseClick}>
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
      <div className={styles.actions}>
        <button onClick={props.onCloseClick} className={styles['button--alt']}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
