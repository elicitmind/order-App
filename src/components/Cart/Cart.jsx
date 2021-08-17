import { useContext } from 'react'
import styles from './Cart.module.css';
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

  return (
    <Modal onClose={props.onCloseClick}>
      {cartCtx.items.map(e=>(
        <ul className={styles['cart-items']}><li>{e.name}</li><li>{e.amount}</li><li>{e.price}</li>
        </ul>))}
      <div className={styles.total}>
				<span>is this is what you want??</span>
				<span>{totalAmount}</span>
			</div>
      <div className={styles.actions}>
				<button onClick={props.onCloseClick} className={styles['button--alt']}>Close</button>
				<button className={styles.button}>Order</button>
			</div>
    </Modal>
  );
};

export default Cart;
