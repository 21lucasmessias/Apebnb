import React from "react"

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Inicio } from "./telas/Inicio";

const { Navigator, Screen } = createMaterialBottomTabNavigator();

export const Rotas = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen component={Inicio} name='inicio'/>
      </Navigator>
    </NavigationContainer>
  );
}