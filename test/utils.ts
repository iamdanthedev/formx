export const onlyNumbersRe = /^[0-9]*$/;
export const capitalFirst = /^[A-Z]/;

export const onlyLetters = value =>
  value.match(/^[a-zA-Z]*$/) ? true : "Only letters";

export const onlyNumbers = value =>
  value.match(onlyNumbersRe) ? true : "Only numbers";
