import { createStackNavigator } from '@react-navigation/stack';
import VeiculoForm from './VeiculoForm';
import VeiculoLista from './VeiculoLista';
import SelectionScreen from './SelectionScreen';

const Stack = createStackNavigator();

export default function VeiculoStack() {
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