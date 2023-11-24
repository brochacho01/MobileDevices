import { Text, Pressable, StyleSheet } from 'react-native';

const EqualsButton = ({text, handler}) => {
    return (
      <Pressable style={styles.bottomButton} onPress={() => handler(text)}>
        <Text style={styles.buttonText}>{text}</Text>
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
      borderColor: 'hsl(6, 70%, 34%)',
    //   Dark red background
      backgroundColor: 'hsl(6, 63%, 50%)',
      borderBottomColor: 'hsl(6, 70%, 34%)',
      borderBottomWidth: 3,
    },
    buttonText: {
      fontSize: 30,
      // fontWeight: 'bold',
    //   White text
      color: 'hsl(0, 0%, 100%)',
      fontFamily: 'leaguespartan_bold',
    },
  });
  
  export default EqualsButton;