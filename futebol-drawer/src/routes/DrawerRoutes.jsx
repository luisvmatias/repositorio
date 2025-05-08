import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import EscudoScreen from '../screens/EscudoScreen';
import JogadoresScreen from '../screens/JogadoresScreen';
import TitulosScreen from '../screens/TitulosScreen';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Escudo">
      <Drawer.Screen name="Escudo" component={EscudoScreen} />
      <Drawer.Screen name="Jogadores" component={JogadoresScreen} />
      <Drawer.Screen name="Títulos" component={TitulosScreen} />
    </Drawer.Navigator>
  );
}