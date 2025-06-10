import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from './stacks/MainNavigator';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
