
export default currencyHelper = (value) => {
  let result = parseFloat(value.replace(',', '.'));
  
  if (isNaN(result)) {
    result = '';
  } else if (value.indexOf('.') === value.length - 1 && value[value.length -1] === '.') {
    result += '.';
  } else {
    result = Math.floor(result * 100)/100;
  }
  
  return result
};
