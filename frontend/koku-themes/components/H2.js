import variable from "./../variables/platform";

export default (variables = variable) => {
  const h2Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH2,
    lineHeight: variables.lineHeightH2,
    backgroundColor:'transparent'
  };

  return h2Theme;
};
