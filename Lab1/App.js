import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import {useFonts} from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit.ttf'),
    'outfitBold': require('./assets/fonts/Outfit-Bold.ttf'),    
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainBody}>
          <Image style={styles.qrCode} source={require('./assets/image-qr-code.png')} />
          <Text style={styles.baseText}>Improve your front-end skills by building projects</Text>
          <Text style={styles.paragraph}>Scan the QR code to visit Frontend Mentor and take your coding skills to the next level</Text>

	<StatusBar style="auto" />
      </View>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(212, 45%, 89%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBody: {
    flex: 1,
    backgroundColor: 'hsl(0, 0%, 100%)',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 50,
    marginTop: 60,
    borderRadius: 25,
    maxWidth: '90%',
    height: 'auto',
  },
  qrCode: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginTop: 20,
    resizeMode: 'contain',
  },
  baseText: {
    color: 'hsl(218, 44%, 22%)',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'outfitBold',
  },
  paragraph: {
    color: 'hsl(220, 15%, 55%)',
    fontWeight: 400,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'outfit',
  },
});
