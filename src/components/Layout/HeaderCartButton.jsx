import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  // console.log(btnIsHighlighted);
  // console.log(ctx);
  //PULL ITEMS FROM CTX OBJECT AND ASSIGN TO VARIABLE
  const { items } = ctx;

  console.log(items);

  const numberOfCartItems = ctx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

  useEffect(() => {
    if (items.length !== 0) {
      setBtnIsHighlighted(true);
    }

//AFTER APPLYING I WANT TO REMOVE THE CLASS MANAGED BY USESTATE
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

//CLEAN UP FUNCTION, GOOD PRACTICE
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button onClick={props.onCartClick} className={btnClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
