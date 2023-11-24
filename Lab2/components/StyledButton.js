import { Text, Pressable, StyleSheet } from 'react-native';

const StyledButton = ({text, handler}) => {
  return (
    <Pressable style={styles.button} onPress={() => handler(text)}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'hsl(224, 28%, 35%)',
    backgroundColor: 'hsl(0, 0%, 100%)',
    // Use bottom border width and bottom border color
    borderBottomColor: 'hsl(224, 28%, 35%)',
    borderBottomWidth: 3,
  },
  buttonText: {
    fontSize: 30,
    color: 'hsl(221, 14%, 31%)',
    fontFamily: 'leaguespartan_bold',
  },
});

export default StyledButton;
