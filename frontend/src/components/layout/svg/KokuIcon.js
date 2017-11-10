import React, { Component } from "react";
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

// export default () =>  <Icon name="wallet" />;
export default Icon;