/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getByID, addToCart } from "../../redux/actions";
import NavBar from '../../components/navBar/NavBar'
import ReactImageMagnify from 'react-image-magnify';
import Swal from 'sweetalert2';
import { useLocalStorage } from "../../functions/useLocalStorage";
import styles from './ProductDetail.module.css';

export default function ProductDetail({handleChange}) {
  
    const dispatch = useDispatch();
    const Product = useSelector((state) => state.productDetail);
    const user = useSelector((state)=> state.user);
    const { id } = useParams();
    const [productAdded, setProductAdded] = useState(false);
    const [inputCantidad, setInputCantidad] = useState('');
    const [productUp, setProductUp] = useState(Product);

    const loadIdProduct = () => {
     if (id === Product.id) return;
     else dispatch(getByID(id));
    }

    useEffect(() => {
     loadIdProduct()
    }, [])
    
    const cart = useSelector((state) => state.cart)

    const handleAddToCart = () => {
        const index = cart.find((product) => 
        JSON.stringify(product.size) === JSON.stringify(productUp.size))

        if(!index){
          // Cambios en esta linea
          dispatch(addToCart(productUp));
          mostrarAlerta();
          setProductAdded(true);
        }else{
          return Swal.fire({
            icon: 'info',
            title: '',
            text: 'ya esta en el carrito ',
            position: "top-end",
            showConfirmButton: false,
            timer: 1500
          })
        }
    }
    
    const handleInput = (event) => {
      const siz = JSON.parse(event.target.value)
      setInputCantidad(event.target.value)
      setProductUp({
        ...productUp,
        size : siz
      })
    }

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
     if(inputCantidad === '') {
       return setIsHovered(true);
     }
     return
    }

   const handleMouseLeave = () => {
    if(inputCantidad === '') {
      setIsHovered(false);
    }
    return
   }

   const mostrarAlerta = () => {
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'Añadido al Carrito',
        position: "top-end",
        showConfirmButton: false,
        timer: 1500
      })
    }
  

    return (
      <div className={styles.centrardiv}>
        
        <NavBar/>
        <div className={styles.space}>
        </div>

          <div className={styles.productdetail}>
            <div className={styles.productdeta} style={{ width: '50vh'}}>
            <ReactImageMagnify 
             {...{
               smallImage: {
                 alt: 'product etnia',
                 isFluidWidth: true,
                 src: `${Product.img}` ,
                   },
                   largeImage: {
                     src: `${Product.img}`,
                     width: 1426,
                     height: 2200
                    },
                 }}
            />
            </div>
  
            <div>
              {Product && (
                <div className={styles.productinfo}>
                  <h2 className={styles.productname}>{Product.name}</h2>
                  <p>${`${Product.price?.toLocaleString()} COP`} | {Product.sale}% OFF</p>
                  <p>Descripcion: {Product.description}</p>
                  <p className={isHovered ? styles.error : null }>Select talla:</p> 
                  <div className={styles.contentLabel}>
                       {Product.size?.map(siz => (
                         <label key={Object.keys(siz)} className={styles.label}>
                         <input className={styles.inputSelect} onChange={handleInput} type="radio" name={"talla"} value={JSON.stringify(siz)}/>
                           {Object.keys(siz)}
                         </label>  
                        ))}  
                  </div>
              <button 
              disabled={isHovered===true ? true: false}
              onMouseEnter={()=>handleMouseEnter()}
              onMouseLeave={()=>handleMouseLeave()}              
              onClick={handleAddToCart} className={styles.addToCartButton}>
                Agregar al carrito
                  
              </button>
              <p>      </p>
                  <p>Marca: {Product.brand} | Categoria: {Product.category}</p>
                  <p>Colores: {Product.color} | Genero: {Product.gender} | Stock: {Product.quantity}</p>
                </div>
              )}
            </div>
         </div>
      </div>
    );
  }