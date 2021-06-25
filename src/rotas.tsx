import React from "react"

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';


const Rotas = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content"/>
    </NavigationContainer>
  );
}

export default Rotas