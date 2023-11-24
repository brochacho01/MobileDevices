import { Text, Pressable, StyleSheet } from 'react-native';
import MyText from './MyText';

const ResetButton = ({text, handler}) => {
    return (
      <Pressable style={styles.bottomButton} onPress={() => handler(text)}>
      {/* <Text style={styles.buttonText}>{text}</Text> */}
      <MyText style={styles.buttonText}>{text}</MyText>
      </Pressable>
    );
  };

  const styles = StyleSheet.create({
    bottomButton: {
      width: '45%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'hsl(225, 21%, 49%)',
      backgroundColor: 'hsl(225, 21%, 49%)',
      borderBottomColor: 'hsl(224, 28%, 35%)',
      borderBottomWidth: 3,
    },
    buttonText: {
      fontSize: 20,
      color: 'hsl(0, 0%, 100%)',
      fontFamily: 'leaguespartan_bold',
    },
  });
  
  export default ResetButton;
   