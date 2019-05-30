const emailValidator = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const requireValidator = (value, required) =>
  required ? value.trim().length > 0 : !required;

const minLengthValidator = (value, minLength) =>
  value.trim().length >= minLength;

const equalToValidator = (value, checkValue) => value === checkValue;

const validate = (value, rules, connectedValue) => {
  let isValid = true;
  for (const rule in rules) {
    switch (rule) {
      case 'required':
        isValid = isValid && requireValidator(value, rules[rule]);
        break;
      case 'isEmail':
        isValid = isValid && emailValidator(value);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(value, connectedValue[rule]);
        break;
      default:
        isValid = true;
        break;
    }
  }
  return isValid;
};

export default validate;
