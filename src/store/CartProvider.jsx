import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    //ITS HOW I CALCULATE TOTAL PRICE AMOUNT ADDING ADDED ITEMS PRICE*AMOUNT TO PREVIOUS VALUE
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //CHECK IF ITEM IS ALREADY A PART OF MY STATE.ITEMS AND RETURN ITS INDEX!!
    const existingCartItemsIndex = state.items.findIndex(
      (e) => e.id === action.item.id
    );
    console.log(existingCartItemsIndex);

    //IF THE ITEMS IS ALREADY A PART OF OUR STATE.ITEMS WE CAN ACCESS IT BY DECLARING A NEW CONST
    //IF NOT THE VALUE WILL BE UNDEFINED
    const existingCartItem = state.items[existingCartItemsIndex];

    //I DECLARE A NEW LET VARIABLE OUTSIDE THE IF STATEMENT TO USE IT THE FOLLOWING LOGIC AND REPLACE OLD STATE
    let updatedItems;

    //IF STATEMENT IF THE ITEM ALREADY EXIST IN OUR STATE.ITEMS
    if (existingCartItem) {
      //I DECLARE AN UPDATED OBJECT WITH THE PREVIOUS KEYS, I JUST WANT TO UPDATE THE AMOUNT
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      //I COPY THE OLD STATE OBJECTS INTO NEW ARRAY
      updatedItems = [...state.items];
      //IF THE ITEM EXIST I NOW OVERRIDE IT WITH OUR UPDATED, BY THE NEW AMOUNT, ITEM OBJECT!
      updatedItems[existingCartItemsIndex] = updatedItem;
    } else {
      //IF ADDED ITEM DOES NOT EXIST YET I JUST CREATE A NEW ARRAY WITH THE NEW ITEM ADDED BY CONCAT() METHOD!
      updatedItems = state.items.concat(action.item);
    }

    //THEN I RETURN A NEW STATE WHICH PICKS UP MY UPDATED ITEMS WHICH ARE NOT DOUBLED!!
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
  //CREATING THAT CONST WILL HELP WITH ALL THE IF STATEMENT CHECKS! THAT VARIABLE EITHER EXIST OR NOT
  //THIS CASE WE DEFINE IF REQUESTED IN ACTION ITEM EXIST IN OUR STATE ARRAY
    const existingCartItemsIndex = state.items.findIndex(
      (e) => e.id === action.id
    );
  //ANOTHER VARIABLE TO HELP WITH THE LOGIC
  //IF INDEX FOUND WE CAN ACCESS AND ASSIGN ITEM'S VALUE TO THE CONST
    const existingCartItem = state.items[existingCartItemsIndex];
  //THIS ONE IS ALWAYS TRUE AND VALID
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
  //WE WILL MODIFY THE ITEM'S OBJECT ONLY BY ITS NEW AMOUNT THEREFORE WE USE LET VARIABLE WHICH WILL COPY AND OVERRIDE PREVIOUS STATE
    let updatedItems;

  //CHECK IF IT"S THE LAST ITEM WE WANT TO REMOVE THEN WE WANT TO REMOVE IT FROM THE ARRAY USING FILTER()
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(e=>e.id !== action.id)
    } else {
  //IT AMOUNT IS DIFFERENT THAN 1 (HAS TO BE HIGHER IF IT DOES EXIST) THEN I WANT TO COPY THE ITEM AND OVERRIDE ITS AMOUNT
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1}
  //I COPY THE OLD STATE
      updatedItems = [...state.items]
  //I OVERRIDE THE OBJECT IN OUR OLD STATE WITH THE UPDATED ITEM
      updatedItems[existingCartItemsIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState
  }

  return defaultCartState
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: "CLEAR"})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
