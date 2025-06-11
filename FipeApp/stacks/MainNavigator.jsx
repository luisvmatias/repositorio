import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import VeiculoForm from './VeiculoForm';
import VeiculoLista from './VeiculoLista';
import SelectionScreen from './SelectionScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ConsultaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VeiculoForm"
        component={VeiculoForm}
        options={{ title: 'Consulta FIPE' }}
      />
      <Stack.Screen
        name="Selection"
        component={SelectionScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

function FavoritosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VeiculoLista"
        component={VeiculoLista}
        options={{ title: 'Veículos Favoritos' }}
      />
      <Stack.Screen
        name="VeiculoForm"
        component={VeiculoForm}
        options={{ title: 'Editar Veículo' }}
      />
      <Stack.Screen
        name="Selection"
        component={SelectionScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Consulta') iconName = 'car';
          else if (route.name === 'Favoritos') iconName = 'star';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Consulta" component={ConsultaStack} />
      <Tab.Screen name="Favoritos" component={FavoritosStack} />
    </Tab.Navigator>
  );
}
