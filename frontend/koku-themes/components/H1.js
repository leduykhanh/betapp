import variable from "./../variables/platform";

export default (variables = variable) => {
  const h1Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH1,
    lineHeight: variables.lineHeightH1,
    '.app-title' :{
      fontSize: 40,
      marginBottom: 15,
      lineHeight: 40
    },
    backgroundColor:'transparent'
  };

  return h1Theme;
};
