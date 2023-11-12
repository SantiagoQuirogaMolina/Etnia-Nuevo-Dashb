/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './ShoppingCart.module.css';
import NavBar from '../../components/navBar/NavBar';
import { removeFromCart,finishPurchase} from '../../redux/actions';

function ShoppingCart() {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch(); 

  const [quantities, setQuantities] = useState({})
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);
  const [objectPago, setObjectPago] = useState([]);

  useEffect(() => {
    const newTotalPrice = cart.reduce((total, product) => {
      const quantity = quantities[JSON.stringify(product.size)] || 0;
      return total + product.price * quantity;
    }, 0);
    if (Object.entries(quantities).length !== cart.length) {
      setDisabledButton(true)
    }else{
      setDisabledButton(false)
    }
     setTotalPrice(newTotalPrice);   
  }, [cart, quantities]);

  const handleRemoveFromCart = (productId) => {
    console.log(productId)
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, event, cantidad) => {
      
    const newValue = parseInt(event.target.value, 10);

    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newValue
    }));
    
    const index = cart.find((product) => JSON.stringify(product.size) === productId)
     
    if (index) {
      const index2 = objectPago.find((object)=> object.title === index.name)
      if (index2){
        index2.quantity = newValue
      }else{
        setObjectPago(prevObjectPago => [
          ...prevObjectPago,
          {
            title: index.name,
            description: index.description,
            quantity: newValue,
            unit_price: index.price,
            currency_id: 'ARG',
            image: index.img,
          }
        ]);
      }
    }
    if (Number(event.target.value) > cantidad || Number(event.target.value) <= 0) {
      setError({
        ...error,
        [productId]: true
      })
      setDisabledButton(true)
      
    }else{
      setError({})
      setDisabledButton(false)
    }
  };
  

  const mercadoPago=()=>{
    console.log(objectPago)
    finishPurchase(objectPago);
  }
 
  return (
    <div className={styles['shopping-cart']}>
      <NavBar />
      <div>
        <h1 className={styles.title}>Carrito de compras</h1>
      </div>
      {console.log(cart.length < 1)}
        {cart.length > 0 ? 
      <div className={styles['product-list']}>
        {cart.map(carts => 
          (
            <div key={Object.values(carts.size)} className={styles['cart-item']}>
              <img src={carts.img} alt={carts.name} />
              <div className={styles['product-details']}>
                <h2>{carts.name}</h2>
                <p className={styles.price}>Color: {carts.color}</p>
                <p className={styles.price}>Precio unitario: ${carts.price?.toLocaleString()}</p>
                <p className={styles.price}>Talla: {Object.keys(carts.size)}</p>
                <div className={styles['cart-controls']}>
                  <div className={styles.quantity} >
                   <p>Cantidad: </p>
                   <input
                     type='number'
                     name={carts.price}
                     value={quantities[JSON.stringify(carts.size)] }
                     onChange={(e) => handleQuantityChange(JSON.stringify(carts.size), e, Object.values(carts.size))}
                   />
                   <p>{error[JSON.stringify(carts.size)] === true ? 'cantidad invalida' : `cantidad maxima: ${Object.values(carts.size)}` }</p>
                  </div>
                </div>
                <div className={styles.closeButton}>
                  <button onClick={()=>handleRemoveFromCart(carts.size)}>X</button>
                </div>
              </div>
            </div>
          )
        )} 
      </div>
        : <h1> CARRITO VACIO</h1> }
      <div className={styles.totalPrice}>
        <p>Precio Total: ${totalPrice.toLocaleString()}</p>
      </div>
      <button  onClick={mercadoPago} disabled={disabledButton || Object.entries(error).length > 0 || cart.length < 1} className={styles['checkout-button']}>Finalizar compra</button>
    </div>
  );
}

export default ShoppingCart; 