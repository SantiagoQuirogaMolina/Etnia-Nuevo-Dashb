/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
export default function Validation(input){
console.log(input)
const errors={}

// Name
if(!input.name){errors.name = "Este campo es obligatorio"};
if(input.name.length > 100){errors.name = "El nombre debe estar por debajo de 100 caracteres"};

// Description

if(input.description.length > 250){errors.description = "Hasta 250 caracteres"};

// Color
if(input.color === "default"){errors.color="Seleccione un color"};
// Brand
if (!input.brand.trim()) {errors.brand = 'Este campo es obligatorio'};
// Price
if(!input.price){errors.price="Seleccione un precio"};
if(input.price<0){errors.price="El precio no puede ser negativo"};
// Category
if (input.category === "default") {  errors.category = 'Seleccione una categoria'};

// Genero
if (input.gender != "female" && input.gender != "male") {  errors.gender = 'Seleccione un género'};

// Imagen
 if(!input.image) {errors.image="Seleccione una imagen para su producto"}






return errors;
}