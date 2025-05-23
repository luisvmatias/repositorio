import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ListaProdutosScreen from '../screens/ListaProdutosScreen';
import ProdutoScreen from '../screens/ProdutoScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Categorias' }} />
      <Stack.Screen 
        name="ListaProdutos" 
        component={ListaProdutosScreen} 
        options={({ route }) => ({ title: route.params.categoria })}
      />
      <Stack.Screen name="Produto" component={ProdutoScreen} options={{ title: 'Detalhes' }} />
    </Stack.Navigator>
  );
}