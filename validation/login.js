/* Login validation through Validator */

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Ingresa un email";
  }

  // if (!Validator.isEmail(data.email)) {
  //   errors.email = "Ingresa un email válido";
  // }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Ingresa una contraseña";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
