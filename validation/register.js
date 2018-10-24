/* Register validation through Validator */

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = "Tu nombre debe contener entre 2 y 30 caractéres";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Ingresa tus nombres";
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "Tu apellido debe contener entre 2 y 30 caractéres";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Ingresa tu apellido";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Ingresa un email válido";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Ingresa un email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Ingresa una contraseña";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Tu contraseña debe contener entre 6 y 20 caractéres";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Ingresa nuevamente tu contraseña";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Debe coincidir con la contraseña que ingresaste";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
