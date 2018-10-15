export const onlyLetters = value =>
  value.match(/^[a-zA-Z]*$/) ? true : "Only letters";

export const onlyNumbers = value =>
  value.match(/^[0-9]*$/) ? true : "Only numbers";
