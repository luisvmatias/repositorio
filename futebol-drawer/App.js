import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutes from './src/routes/DrawerRoutes';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}