import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FontsScreen from './src/screens/FontsScreen';
import NewBottomTabs from './src/navigation/NewBottomTabs';
import { ThemeProvider } from './src/context/Theme';
import { useThemeColors } from './src/hooks/useThemeColors';
import * as Font from 'expo-font';
import { FontProvider } from './src/context/Font';

const Tab = createBottomTabNavigator();
const customFonts = {
  'Inconsolata-Bold': require('./assets/fonts/inconsolata/static/Inconsolata-Bold.ttf'),
  'Inconsolata-Regular': require('./assets/fonts/inconsolata/static/Inconsolata-Regular.ttf'),
  'Inter-Bold': require('./assets/fonts/inter/static/Inter-Bold.ttf'),
  'Inter-Regular': require('./assets/fonts/inter/static/Inter-Regular.ttf'),
  'Lora-Bold': require('./assets/fonts/lora/static/Lora-Bold.ttf'),
  'Lora-Regular': require('./assets/fonts/lora/static/Lora-Regular.ttf'),
  'Space-Mono-Bold': require('./assets/fonts/spacemono/static/SpaceMono-Bold.ttf'),
  'Space-Mono-Regular': require('./assets/fonts/spacemono/static/SpaceMono-Regular.ttf'),
};

const App = () => {
  const { colors } = useThemeColors();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer testID='nav-bar'>
      <ThemeProvider>
        <FontProvider>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
            tabBar={(props) => <NewBottomTabs {...props} />}
          >
            <Tab.Screen name="Fonts" component={FontsScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </FontProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
