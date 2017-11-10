import variable from "./../variables/platform";

export default (variables = variable) => {
  const h3Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH3,
    lineHeight: 1.2* variables.lineHeightH3,
    '.white': {
      color: 'white'
    },
    backgroundColor:'transparent'
    
  };

  return h3Theme;
};
