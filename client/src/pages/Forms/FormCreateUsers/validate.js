const validate = (state) => {
    const errors = {};
    
    const patronEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const patronCharact = /^[A-Za-zÑñáéíóúü]+[- ]{0,1}[A-Za-zÑñáéíóúü]+$/;
    const patronNumerico = /^[0-9]+$/;
    const patronPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,10}$/;
    
    
    if (!state.name) errors.name = 'Este campo es requerido'
    if (!patronCharact.test((state.name))) errors.name = 'Introduzca su nombre'
    if (state.name.length > 250){
      errors.name = 'Debe ser menor a 250 caracteres';
    }

    if (!state.last_name) errors.last_name = 'Este campo es requerido'
    if (!patronCharact.test((state.last_name))) errors.last_name = 'Introduzca apellidos'
    if (state.last_name.length > 250){
      errors.last_name = 'Debe ser menor a 250 caracteres';
    }

    if(!state.email) errors.email = 'Este campo es requerido'
    if (!patronEmail.test(state.email)) errors.email = 'Debe corresponder a una dirección de correo'
    if (state.email.length > 250){
      errors.email = 'El nombre debe ser menor a 250 caracteres';
    }
   
    if(!state.phone_number) errors.phone = 'Este campo es requerido' 
    if (!patronNumerico.test(state.phone_number)) errors.phone = 'El teléfono debe ser numérico'
    if (state.phone_number.length > 15) {
        errors.phone = 'El campo debe ser menor a 15 digitos'
    }

    if(!state.password) errors.password = 'Este campo es requerido' 
    if (!patronPassword.test(state.password)) errors.password = 'La contraseña debe tener entre 6 y 10 caracteres, al menos un dígito, una minúscula y una mayúscula'
    
    if(state.password !== state.password1) errors.password1 = 'La contraseña no coincide' 
    
    return errors;
}

export default validate;