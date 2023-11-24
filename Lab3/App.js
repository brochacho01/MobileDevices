import React from 'react';
import ClockScreen from './src/screens/ClockScreen';
import { View, SafeAreaView, Text, StyleSheet, ImageBackground } from 'react-native';
import { BackgroundProvider } from './src/context/Background';
import { useMyBackgrounds } from './src/hooks/useMyBackgrounds';

const App = () => {


  return ( 
    <SafeAreaView style={styles.container}>
      <BackgroundProvider>
        <ClockScreen />
      </BackgroundProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default App;
