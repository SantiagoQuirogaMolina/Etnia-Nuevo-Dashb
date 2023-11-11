/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import { useSelector, useDispatch } from 'react-redux';

import { removeFromCart, finishPurchase, updateCartItemQuantity } from '../../redux/actions'; // Añadir las acciones necesarias
import styles from './ShoppingCart.module.css';
import NavBar from '../../components/navBar/NavBar';


function calculateTotalPrice(cart) {
  return cart.reduce((total, product) => {
    let quantity = (product.cantidad || 1)
    return total + (product.price * quantity);
  }, 0);
}

function ShoppingCart() {
  const cart = useSelector((state) => state.cartPersist);

  const dispatch = useDispatch(); // Obtener el dispatcher
  const totalPrice = calculateTotalPrice(cart);


  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); // Acción para eliminar un producto del carrito
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateCartItemQuantity(productId, newQuantity)); // Acción para actualizar la cantidad de un producto
  };

  const handleCheckout = () => {
    dispatch(finishPurchase(cart));
    // You might want to reset the cart or navigate to a different page after the purchase is finished
    // You can add those actions here
  };

  const disabled = cart.length === 0;
  const uniqueCartItems = Array.from(new Set(cart.map((item) => item.id))); // Filtrar elementos únicos

  return (
    <div>
      <NavBar />
      <div>
        <h1 className={styles.title}>Carrito de compras</h1>
      </div>
      <div className={styles['product-list']}>
        {uniqueCartItems.map((productId) => {
          const item = cart.find((product) => product.id === productId);
          return (
            <div key={productId} className={styles['cart-item']}>

              <img src={item.img} alt={item.name} />

              <div className={styles['product-details']}>

                <h2>{item.name}</h2>
                <p className={styles.price}>Precio: ${item.price}</p>

                <div className={styles['cart-controls']}>

                  <div className={styles.quantity} >
                  <p>Cantidad: </p>
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad || 1}
                    onChange={(e) => handleQuantityChange(productId, e.target.value)}
                  />
                  </div>


                </div>
                <div className={styles.closeButton}>
                  <button onClick={() => handleRemoveFromCart(productId)}>X</button>
                </div>

              </div>

            </div>
          );
        })}
      </div>
      <div className={styles.totalPrice}>
        <p>Precio Total: ${totalPrice}</p>
      </div>
      <button 
        className={styles['checkout-button']}

        onClick={handleCheckout} // Use the new handleCheckout function
        id="checkout-btn"
        disabled={disabled}
      >

        Finalizar compra
        </button>
    </div>
  );
}

export default ShoppingCart;
