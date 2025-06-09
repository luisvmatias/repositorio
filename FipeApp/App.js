import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import VeiculoStack from './stacks/VeiculoStack';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <VeiculoStack />
      </NavigationContainer>
    </PaperProvider>
  );
}