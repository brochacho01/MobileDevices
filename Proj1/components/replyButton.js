import React, { useState } from 'react';
import { View, Pressable, TextInput, StyleSheet, Text } from 'react-native';
import ReplySVG from './replySVG';

const ReplyButton = ({addReply, idx, setReply, commentUser, setAtUsername}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  // When the reply button is pressed, the inputVisible state is toggled
  const handleButtonPress = () => {
    if (inputVisible && inputText === '') {
        setInputVisible(false);
        return;
    }
    setInputVisible(true);
  };

  // When the text input is changed, the inputText state is updated
  const handleInputChange = (text) => {
    setInputText(text);
    let atUsername = '@'+commentUser
    setAtUsername(atUsername);
    setReply(text);
  };

  // When the text input is blurred, the inputVisible state is toggled and the inputText state is reset
  const handleInputBlur = () => {
    if (inputText !== '') {
        addReply(idx);
        setInputText('');
        setInputVisible(false);
        return;
    }
    setInputVisible(false);
  };

  // Reply button that when pressed will cause a text input to appear that allows a user to reply to a comment
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Pressable testID={'replyButton'} onPress={handleButtonPress} style={styles.button}>
          {({ pressed }) => (
            <View style={[styles.buttonContainer, pressed && styles.buttonPressed]}>
              <View style={styles.svgContainer}>
                <ReplySVG />
              </View>
              <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>Reply</Text>
            </View>
          )}
        </Pressable>
        {inputVisible && (
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus={true}
            placeholder="Enter text here"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
  },
  button: {
    borderRadius: 6,
    overflow: 'hidden',
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  svgContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'hsl(0, 0%, 100%)',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'hsl(238, 40%, 52%)',
    fontSize: 16,
  },
  buttonTextPressed: {
    opacity: 0.5,
  },
  buttonPressed: {
    backgroundColor: 'hsl(0, 0%, 100%)',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '50%',
    height: 40,
  },
});

export default ReplyButton;
