import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import {useContext} from 'react'


const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext)

  const numberOfCartItems = ctx.items.reduce((curNum, item) => {
    return curNum + item.amount
  }, 0)

  console.log(ctx)
  return (
    <button onClick={props.onCartClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
