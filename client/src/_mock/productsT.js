/* eslint-disable no-shadow */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import { sample } from 'lodash';

// JSON con la información de los usuarios
const products = [
  {
    "id": 1,
    "prenda": "SHORT SOLO TONO PRETINA MEDIA CIERRE",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/141-200x200.png",
    "usuario": "female",
    "fecha": "M",
    "metodo": "mercado pago",
    "estado": "licras",
    "precio": "68000",
    "cantidad": "12",
    "status": "Verde Menta"
  },
  {
    "id": 2,
    "prenda": "SHORT SOLO TONO PRETINA MEDIA CIERRE",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/142-100x100.png",
    "usuario": "female",
    "fecha": "S",
    "metodo": "efectivo",
    "estado": "licras",
    "precio": "68000",
    "cantidad": "30",
    "status": "Verde Menta"
  },
  {
    "id": 3,
    "prenda": "SHORT SOLO TONO PRETINA ALTA",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/1-100x100.png",
    "usuario": "female",
    "fecha": "L",
    "metodo": "otro",
    "estado": "licras",
    "precio": "70000",
    "cantidad": "40",
    "status": "Palo de Rosa Claro"
  },
  {
    "id": 4,
    "prenda": "SHORT SOLO TONO PRETINA ALTA",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/1-100x100.png",
    "usuario": "female",
    "fecha": "M",
    "metodo": "otro",
    "estado": "licras",
    "precio": "70000",
    "cantidad": "20",
    "status": "Palo de Rosa Claro"
  },
  {
    "id": 5,
    "prenda": "SHORT SOLO TONO PRETINA ALTA",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/1-100x100.png",
    "usuario": "female",
    "fecha": "XL",
    "metodo": "otro",
    "estado": "licras",
    "precio": "70000",
    "cantidad": "60",
    "status": "Negro"
  },
  {
    "id": 6,
    "prenda": "SHORT SOLO TONO PRETINA ALTA",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/1-100x100.png",
    "usuario": "female",
    "fecha": "S",
    "metodo": "otro",
    "estado": "licras",
    "precio": "70000",
    "cantidad": "35",
    "status": "Negro"
  },
  {
    "id": 7,
    "prenda": "BLUSA SOLO TONO RESORTES",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/175-100x100.png",
    "usuario": "female",
    "fecha": "L",
    "metodo": "otro",
    "estado": "blusas",
    "precio": "60000",
    "cantidad": "15",
    "status": "Mora en leche"
  },
  {
    "id": 8,
    "prenda": "BLUSA SOLO TONO RESORTES",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/173-100x100.png",
    "usuario": "female",
    "fecha": "M",
    "metodo": "otro",
    "estado": "blusas",
    "precio": "60000",
    "cantidad": "25",
    "status": "Mora en leche"
  },
  {
    "id": 9,
    "prenda": "BLUSA SOLO TONO RESORTES",
    "imagen": "https://etniasportswear.com/wp-content/uploads/2023/04/169-100x100.png",
    "usuario": "female",
    "fecha": "XXL",
    "metodo": "otro",
    "estado": "blusas",
    "precio": "60000",
    "cantidad": "70",
    "status": "Mora en leche"
  },
];

export const product = products.map((product) => ({
  id: product.id,
  prenda: product.name,
  imagen: product.img,
  usuario: product.gender,
  fecha: product.size,
  metodo: product.sale,
  estado: product.category,
  precio: product.price,
  cantidad: product.quantity,
  status: product.color,
}));
