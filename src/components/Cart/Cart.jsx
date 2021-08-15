import styles from './Cart.module.css';

const Cart = () => {
  const cartItems = (
    <ul className={styles['cart-items']}>
      {[{ id: 'c1', name: 'kiwi', amount: 2, price: 12.33 }].map((e) => (
        <li>{e.name}</li>
      ))}
    </ul>
  );
  return (
    <div>
      {cartItems}
      <div className={styles.total}>
				<span>Total Amount</span>
				<span>34.44</span>
			</div>
      <div className={styles.actions}>
				<button className={styles['button--alt']}>Close</button>
				<button className={styles.button}>Order</button>
			</div>
    </div>
  );
};

export default Cart;
