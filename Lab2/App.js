import { useFonts } from 'expo-font';
import CalculatorScreen from './screens/CalculatorScreen';

const App = () => {
  const [loaded] = useFonts({
    'leaguespartan_bold': require('./assets/fonts/static/LeagueSpartan-Bold.ttf'),
    'leagespartan-variablefont_wght': require('./assets/fonts/LeagueSpartan-VariableFont_wght.ttf'),    
  });

  if (!loaded) {
    return null;
  }
  return <CalculatorScreen />;
};

export default App;
