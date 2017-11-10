import React from 'react';
import {ImageBackground as ImageBG, Dimensions, Platform} from 'react-native';

const platform = Platform.OS;
const maxHeight = platform === "ios"?Dimensions.get("window").height:Dimensions.get("window").height -20;

const ImageBackground = props => {
  return (
    <ImageBG style={backgroundStyle}
             source={require('../../../../assets/images/background.jpg')}
             {...props}>
      {props.children}
    </ImageBG>
  );
};

const backgroundStyle = {
  height: maxHeight,
  justifyContent: 'center'
};

export default ImageBackground;