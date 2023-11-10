/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable default-case */
/* eslint-disable spaced-comment */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable import/order */
/* eslint-disable arrow-body-style */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useParams } from "react-router";
import Validation from './validation';
import primeraMayuscula from '../../../functions/primeraMayuscula';
import { updateProduct, clearErrors, getByID } from '../../../redux/actions';
import Swal from 'sweetalert2';
import './formedit.css';

const FormEditProduct = () => {
  
  const dispatch = useDispatch();
  //const {id} = useParams();
  const id = 4;
  console.log(id)
  const inputReduce = useSelector((state) => state.productDetail);
  

  const [errorSubmit, setErrorSubmit] = useState('');
  const gErrors = useSelector((state) => state.errors);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState(inputReduce);

  
  // para armar el muñeco de entrada

//   for (let option of input.size) {
//    if (Object.keys(option).includes("XS")) {
//       document.querySelector('#quantityXS').value = option.XS
//       document.querySelector('#quantityXS').disabled = true
//       document.getElementById('XS').checked = true
//    };

//    if (Object.keys(option).includes("S")) {
//       document.querySelector('#quantityS').value = option.S
//       document.querySelector('#quantityS').disabled = true
//       document.getElementById('S').checked = true
//     };

//    if (Object.keys(option).includes("M")) {
//       document.querySelector('#quantityM').value = option.M
//       document.querySelector('#quantityM').disabled = true
//       document.getElementById('M').checked = true
//     };

//     if (Object.keys(option).includes("L")) {
//       document.querySelector('#quantityL').value = option.L
//       document.querySelector('#quantityL').disabled = true
//       document.getElementById('XS').checked = true
//     };

//     if (Object.keys(option).includes("XL")) {
//       document.querySelector('#quantityXL').value = option.XL
//       document.querySelector('#quantityXL').disabled = true
//       document.getElementById('XL').checked = true
//     };

//     if (Object.keys(option).includes("XXL")) {
//       document.querySelector('#quantityXXL').value = option.XXL
//       document.querySelector('#quantityXXL').disabled = true
//       document.getElementById('XXL').checked = true
//     };

//  }
  
    
  



  useEffect(() => {
    dispatch(getByID(id))
    return () => dispatch(clearErrors());
  }, [id, dispatch]);

  
  const mostrarAlertaExitosa = () => {
    Swal.fire({
      icon: 'success',
      title: '',
      text: 'El producto se actualizó de manera exitosa',
    });
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    
    setErrors(
      Validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
    setErrorSubmit('');
  };

 

 // let isSubmitDisabled = Object.keys(errors).length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    // para armar el muñeco
    let selected = [];
    if (
      document.querySelector('#quantityXS').value != 0 &&
      document.querySelector('#quantityXS').disabled === false
    ) {
      selected.push({ XS: document.querySelector('#quantityXS').value });
    }
    if (
      document.querySelector('#quantityS').value != 0 &&
      document.querySelector('#quantityS').disabled === false
    ) {
      selected.push({ S: document.querySelector('#quantityS').value });
    }
    if (
      document.querySelector('#quantityM').value != 0 &&
      document.querySelector('#quantityM').disabled === false
    ) {
      selected.push({ M: document.querySelector('#quantityM').value });
    }
    if (
      document.querySelector('#quantityL').value != 0 &&
      document.querySelector('#quantityL').disabled === false
    ) {
      selected.push({ L: document.querySelector('#quantityL').value });
    }
    if (
      document.querySelector('#quantityXL').value != 0 &&
      document.querySelector('#quantityXL').disabled === false
    ) {
      selected.push({ XL: document.querySelector('#quantityXL').value });
    }
    if (
      document.querySelector('#quantityXXL').value != 0 &&
      document.querySelector('#quantityXXL').disabled === false
    ) {
      selected.push({ XXL: document.querySelector('#quantityXXL').value });
    }

    let suma = 0;
    input.size = selected;
    for (let option of input.size) {
      suma += parseInt(Object.values(option), 10);
    }
    input.quantity = suma;
    input.name = input.name.toUpperCase();
    input.brand = input.brand.toUpperCase();
    input.category = primeraMayuscula(input.category);
    input.color = primeraMayuscula(input.color);

    console.log(input);

    if (input.quantity === 0) {
      setErrorSubmit('Debe escoger una talla y una cantidad');
      console.log (errorSubmit);
    }
    else {
      dispatch(updateProduct(input));

      setInput({
        name: '',
        description: '',
        brand: '',
        sale: 0,
        category: '',
        size: [],
        color: '',
        price: 0,
        gender: 'default',
        image: '',
        quantity: 0,
      });
      console.log(input);
      // desmarca todo los checkbox
      for (let i = 0; i < document.f1.elements.length; i++) {
        if (document.f1.elements[i].type == 'checkbox') {
          document.f1.elements[i].checked = false;
        }
      }
      //deshabilita todos los inputs de cantidad
      document.querySelector('#quantityXS').disabled = true;
      document.querySelector('#quantityXS').value = null;
      document.querySelector('#quantityS').disabled = true;
      document.querySelector('#quantityS').value = null;
      document.querySelector('#quantityM').disabled = true;
      document.querySelector('#quantityM').value = null;
      document.querySelector('#quantityL').disabled = true;
      document.querySelector('#quantityL').value = null;
      document.querySelector('#quantityXL').disabled = true;
      document.querySelector('#quantityXL').value = null;
      document.querySelector('#quantityXXL').disabled = true;
      document.querySelector('#quantityXXL').value = null;

      document.querySelector('#submit').disabled = true;
      mostrarAlertaExitosa();
      dispatch(clearErrors());
    }
  };

  const habilitar = (event) => {
    switch (event.target.value) {
      case 'XS':
        if (document.querySelector('#quantityXS').disabled)
          document.querySelector('#quantityXS').disabled = false;
        else if (!document.querySelector('#quantityXS').disabled) {
          document.querySelector('#quantityXS').disabled = true;
          document.querySelector('#quantityXS').value = null;
        }
        break;

      case 'S':
        if (document.querySelector('#quantityS').disabled)
          document.querySelector('#quantityS').disabled = false;
        else if (!document.querySelector('#quantityS').disabled) {
          document.querySelector('#quantityS').disabled = true;
          document.querySelector('#quantityS').value = null;
        }
        break;

      case 'M':
        if (document.querySelector('#quantityM').disabled)
          document.querySelector('#quantityM').disabled = false;
        else if (!document.querySelector('#quantityM').disabled) {
          document.querySelector('#quantityM').disabled = true;
          document.querySelector('#quantityM').value = null;
        }
        break;

      case 'L':
        if (document.querySelector('#quantityL').disabled)
          document.querySelector('#quantityL').disabled = false;
        else if (!document.querySelector('#quantityL').disabled) {
          document.querySelector('#quantityL').disabled = true;
          document.querySelector('#quantityL').value = null;
        }
        break;

      case 'XL':
        if (document.querySelector('#quantityXL').disabled)
          document.querySelector('#quantityXL').disabled = false;
        else if (!document.querySelector('#quantityXL').disabled) {
          document.querySelector('#quantityXL').disabled = true;
          document.querySelector('#quantityXL').value = null;
        }
        break;

      case 'XXL':
        if (document.querySelector('#quantityXXL').disabled)
          document.querySelector('#quantityXXL').disabled = false;
        else if (!document.querySelector('#quantityXXL').disabled) {
          document.querySelector('#quantityXXL').disabled = true;
          document.querySelector('#quantityXXL').value = null;
        }
    }
  };

  

  return (
    <div className="Formedit-container">
      <form
        onSubmit={(event) => handleSubmit(event)}
        name="f1"
        id="formElement"
        className="formedit-container"
      >
        <div className="globalCont">
          
          <h3 className="formeditTitle">Actualizar producto</h3>
          <br />

          <div className="formedit-precio-descuento">
            <div className="formedit-group">
              <label className="label-form" htmlFor="name">
                Nombre
              </label>
              <input
                className="input1"
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
              <p className="errores" style={{ visibility: errors.name ? 'visible' : 'hidden' }}>
                {errors.name}
              </p>
            </div>

            <div className="formedit-group">
              <label className="label-form" htmlFor="brand">
                Marca
              </label>
              <input
                className="input1"
                type="text"
                id="brand"
                name="brand"
                value={input.brand}
                onChange={handleChange}
              />
              <p className="errores" style={{ visibility: errors.brand ? 'visible' : 'hidden' }}>
                {errors.brand}
              </p>
            </div>

            <div className="formedit-group">
              <label className="label-form" htmlFor="category">
                Categoria
              </label>
              <input
                className="input1"
                type="text"
                id="category"
                name="category"
                value={input.category}
                onChange={handleChange}
              />
              <p className="errores" style={{ visibility: errors.category ? 'visible' : 'hidden' }}>
                {errors.category}
              </p>
            </div>
          </div>

          <div className="formedit-group">
            <label className="label-form-descripcion" htmlFor="description">
              Descripción
            </label>
            <br />
            <textarea
              className="textarea-descripcion"
              id="description"
              name="description"
              value={input.description}
              onChange={handleChange}
            />
            <p
              className="errores"
              style={{ visibility: errors.description ? 'visible' : 'hidden' }}
            >
              {errors.description}
            </p>
          </div>

          <div className="formedit-precio-descuento">
            <div className="formedit-group">
              <label className="label-form" htmlFor="color">
                Color
              </label>
              <input
                className="input1"
                type="text"
                id="color"
                name="color"
                value={input.color}
                onChange={handleChange}
              />
              <p className="errores" style={{ visibility: errors.color ? 'visible' : 'hidden' }}>
                {errors.color}
              </p>
            </div>
            <div className="formedit-group">
              <label className="label-form" htmlFor="price">
                Precio
              </label>
              <input
                className="input2"
                type="number"
                id="price"
                name="price"
                value={input.price}
                onChange={handleChange}
              />
              <p className="errores" style={{ visibility: errors.price ? 'visible' : 'hidden' }}>
                {errors.price}
              </p>
            </div>

            <div className="formedit-group">
              <label className="label-form" htmlFor="sale">
                Descuento
              </label>
              <input
                className="input2"
                type="number"
                id="sale"
                name="sale"
                value={input.sale}
                onChange={handleChange}
              />
              <p className="errores" style={{ visibility: errors.sale ? 'visible' : 'hidden' }}>
                {errors.sale}
              </p>
            </div>
          </div>

          <div className="formedit-group">
            <label className="label-form" htmlFor="gender">
              Genero
            </label>
            <select id="gender" name="gender" onChange={handleChange} value={input.gender}>
              <option value="default">Seleccione Genero</option>
              <option value="female">Mujer</option>
              <option value="male">Hombre</option>
            </select>
            <p className="errores" style={{ visibility: errors.gender ? 'visible' : 'hidden' }}>
              {errors.gender}
            </p>
          </div>

          <div className="formedit-group">
            <label className="label-form" htmlFor="img">
              URL de Imagen
            </label>
            <input
              className="input3"
              type="url"
              id="image"
              name="image"
              value={input.img}
              onChange={handleChange}
            />
            <p className="errores" style={{ visibility: errors.image ? 'visible' : 'hidden' }}>
              {errors.image}
            </p>
            
          </div>

          <div className="previewImage">
            <h5>Imagen Previa:</h5>
            <div className="img-container">
              <img className="img" src={input.img} alt="" />
            </div>
            <p className="errorsubmit">{errorSubmit}</p>
          </div>
        </div>
        
        <div className="globalTalla">
        
          <label>Tallas:</label>
          <input type="checkbox" name="xs" id="XS" value="XS" onChange={habilitar} />
          <label htmlFor="XS">XS</label>
          <input
            disabled
            className="input2T"
            type="number"
            min="0"
            id="quantityXS"
            name="quantityXS"
            onChange={handleChange}
          />
          <input type="checkbox" name="s" id="S" value="S" onChange={habilitar} />
          <label for="S">S</label>
          <input
            disabled
            className="input2T"
            type="number"
            min="0"
            id="quantityS"
            name="quantityS"
            onChange={handleChange}
          />

          <input type="checkbox" name="m" id="M" value="M" onChange={habilitar} />
          <label for="M">M</label>
          <input
            disabled
            className="input2T"
            type="number"
            min="0"
            id="quantityM"
            name="quantityM"
            onChange={handleChange}
          />

          <input type="checkbox" name="l" id="L" value="L" onChange={habilitar} />
          <label for="L">L</label>
          <input
            disabled
            className="input2T"
            type="number"
            min="0"
            id="quantityL"
            name="quantityL"
            onChange={handleChange}
          />

          <input type="checkbox" name="xl" id="XL" value="XL" onChange={habilitar} />
          <label for="XL">XL</label>
          <input
            disabled
            className="input2T"
            type="number"
            min="0"
            id="quantityXL"
            name="quantityXL"
            onChange={handleChange}
          />

          <input type="checkbox" name="xxl" id="XXL" value="XXL" onChange={habilitar} />
          <label for="XXL">XXL</label>
          <input
            disabled
            className="input2T"
            type="number"
            min="0"
            id="quantityXXL"
            name="quantityXXL"
            onChange={handleChange}
          />
        </div>

        <div className="buttonDiv">
          <button
            id="submit"
            className="btn"
            type="submit"
          >
            Actualizar Producto
          </button>
        </div>

        <p
          className="errores"
          style={{ visibility: gErrors?.createProduct?.error ? 'visible' : 'hidden' }}
        >
          {gErrors?.createProduct?.error}
        </p>
      </form>
    </div>
  );
};

export default FormEditProduct;