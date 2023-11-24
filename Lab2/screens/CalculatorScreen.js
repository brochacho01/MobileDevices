import { useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, SafeAreaView } from 'react-native';
import StyledButton from '../components/StyledButton';
import ResetButton from '../components/ResetButton';
import EqualsButton from '../components/EqualsButton';
import DeleteButton from '../components/DeleteButton';

// TODO use safearaview in app.js as wrapper instead of in CalculatorScreen
// TODO do status bar above safeareaview in app.js and then wrap both in a <> </> in app.js
// TODO on result calculation remove trailing zeros

const CalculatorScreen = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState('');
  const [validDecimal, setValidDecimal] = useState(true);
  const [prevArgDecimal, setPrevArgDecimal] = useState(false);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  // triggered when a number is pressed
  const handleNumberPress = (number) => {
    var curUpdate = '';
    // Disallow multiple '.' characters in the same number
    if (number === '.' && !validDecimal) {
      return;
    // Disallow more than 15 characters in the display
    } else if (display.length > 15) {
      return;
    } else if (number === '.') {
      // If there is an operator preceeding the decimal or if there is nothing in memory, prepend a zero
      const lastChar = memory.slice(-1);
      if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || display === 'Error' && display !== '0' || isResultDisplayed) {
        curUpdate += '0';
      }
      setValidDecimal(false);
    }
    // Disallow leading zeros
    // Special case if first nonzero entered is a '.'
    // If error is being displayed, overwrite it
    if (display === '0' && number !== '.' || display === 'Error' || isResultDisplayed) {
      curUpdate += number;
      setDisplay(curUpdate);
      setMemory(number);
    } else {
      curUpdate += number;
      setDisplay(display + curUpdate);
      setMemory(memory + number);
    } 
    setIsResultDisplayed(false);
  };

  // triggered when an operator is pressed
  const handleOperatorPress = (operator) => {
    // If we are displaying Error, we cannot do an operator so return
    if (display === 'Error') {
      return;
    }
    // Design specifies we use the 'x' character for multiplication but eval doesn't accept that so we need to change any 'x' to '*'
    if (operator ==='x') {
      operator = '*';
    }
    
    const lastChar = memory.slice(-1);
    // If last char is a decimal disallow an operator
    if(lastChar === '.'){
      return;
    }
     // If two operators are pressed in a row, we should overwrite the previous operator
    if(lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/'){
      setMemory(memory.slice(0, -1) + operator);
      setDisplay(memory.slice(0, -1) + operator);
      
    } else {
      setMemory(memory + operator);
      setDisplay(display + operator);
    }
    
    // Operator means new number, which means we can have a decimal again
    if (!validDecimal) {
      setPrevArgDecimal(true);
    }
    if(isResultDisplayed){
      setIsResultDisplayed(false);
    }
    setValidDecimal(true);
    
  };

  // triggered when the equal sign is pressed
  // TODO need to clear trailing zeros i.e. 3.000000000 needs to be 3.0
  const handleEqualPress = () => {
    const res = eval(memory);
    if(res === Infinity){
      setDisplay('Error');
      setMemory('');
    } else {
      setDisplay(res + '');
      setMemory(res + '');
    }
    setIsResultDisplayed(true);
  };

  // triggered when the clear button is pressed
  const handleClearPress = () => {
    setDisplay('0');
    setMemory('');
    // Make sure we can have a decimal again
    setPrevArgDecimal(false);
    setValidDecimal(true);
    setIsResultDisplayed(false);
  };

  // triggered when the delete button is pressed
  // Removes the most recently entered
  const handleDeletePress = () => {
    // If the last character is a decimal, we can have a decimal again
    if(display.slice(-1) === '.'){
      setValidDecimal(true);
    }
    // If the last character is an operator, we can't have a decimal again
    if((display.slice(-1) === '+' || display.slice(-1) === '-' || display.slice(-1) === '*' || display.slice(-1) === '/') && prevArgDecimal){
      setValidDecimal(false);
    }
    setDisplay(display.slice(0, -1));
    setMemory(memory.slice(0, -1));
    if(isResultDisplayed){
      setIsResultDisplayed(false);
    }
  }

  return (
    // Safe area view wrapper
    <SafeAreaView style={styles.safeView}>
    <View style={styles.container} testID='calculator-screen'>
      <Text style={styles.title}>calc</Text>
      {/* Display the current calculation */}
      <TextInput style={styles.result} value={display} editable={false} testID='calculator-input' />
      {/* Want a container that holds all the buttons */}
      <View style={styles.rowContainer}>
      <View style={styles.row}>
        <StyledButton text='7' handler={handleNumberPress} />
        <StyledButton text='8' handler={handleNumberPress} />
        <StyledButton text='9' handler={handleNumberPress} />
        <DeleteButton text='DEL' handler={handleDeletePress} />
      </View>
      <View style={styles.row}>
        <StyledButton text='4' handler={handleNumberPress} />
        <StyledButton text='5' handler={handleNumberPress} />
        <StyledButton text='6' handler={handleNumberPress} />
        <StyledButton text='+' handler={handleOperatorPress} />
      </View>
      <View style={styles.row}>
        <StyledButton text='1' handler={handleNumberPress} />
        <StyledButton text='2' handler={handleNumberPress} />
        <StyledButton text='3' handler={handleNumberPress} />
        <StyledButton text='-' handler={handleOperatorPress} />
      </View>
      <View style={styles.row}>
        <StyledButton text='.' handler={handleNumberPress} />
        <StyledButton text='0' handler={handleNumberPress} />
        <StyledButton text='/' handler={handleOperatorPress} />
        <StyledButton text='x' handler={handleOperatorPress} />
      </View>
      <View style={styles.row}>
        {/* Create actual handlers for these */}
        <ResetButton text='RESET' handler={handleClearPress} />
        <EqualsButton text='=' handler={handleEqualPress} />
      </View>
      </View>
      <StatusBar style='dark-content' />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: 'hsl(222, 26%, 31%)',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    width: '80%',
    color: 'hsl(0, 0%, 100%)',
    marginBottom: 15,
    fontFamily: 'leaguespartan_bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(222, 26%, 31%)',
  },
  result: {
    width: '80%',
    height: 80,
    fontSize: 30,
    textAlign: 'right',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'hsl(223, 31%, 20%)',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'hsl(224, 36%, 15%)',
    color: 'hsl(0, 0%, 100%)',
  },
  rowContainer: {
    paddingTop: 10,
    width: '80%',
    height: '55%',
    backgroundColor: 'hsl(223, 31%, 20%)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 15,
  },
});

export default CalculatorScreen;
