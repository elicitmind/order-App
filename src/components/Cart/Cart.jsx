import styles from './Cart.module.css';
import Modal from '../UI/Modal'

const Cart = (props) => {
  const cartItems = (
    <ul className={styles['cart-items']}>
      {[{ id: 'c1', name: 'RESTLESSNESS', amount: 654, price: 99.33 }].map((e) => (
        <li>{e.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onCloseClick}>
      {cartItems}
      <div className={styles.total}>
				<span>is this is what you want??</span>
				<span>€ 99.44</span>
			</div>
      <div className={styles.actions}>
				<button onClick={props.onCloseClick} className={styles['button--alt']}>Close</button>
				<button className={styles.button}>Order</button>
			</div>
    </Modal>
  );
};

export default Cart;
