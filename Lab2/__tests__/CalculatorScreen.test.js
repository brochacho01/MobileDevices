import { render, fireEvent } from '@testing-library/react-native';
import CalculatorScreen from '../screens/CalculatorScreen';

describe('CalculatorScreen', () => {
  // test rendering
  it('should render the calculator screen', () => {
    const { getByTestId } = render(<CalculatorScreen />);
    const calculatorScreen = getByTestId('calculator-screen');
    expect(calculatorScreen).toBeDefined();
  });

  // test number input
  it('should add numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('3'));

    expect(calculatorInput.props.value).toBe('123');
  });

  // test addition
  it('should add two numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('5');
  });

  // test subtraction
  it('should subtract two numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('5'));
    fireEvent.press(getByText('-'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('3');
  });

  // test multiplication
  it('should multiply two numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    // Your design specified changing '*' to 'x' but that causes it to fail test as it cannot find button
    // Are we allowed to change the character being looked for or how do we resolve this?
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('x'));
    fireEvent.press(getByText('4'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('12');
  });

  // test division
  it('should divide two numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('4');
  });

  // test complex calculation
  it('should perform a complex calculation', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('12');
  });

  // test a user error case: neighboring operators
  // When an operator was the last thing pressed we need to overwrite previous operator
  it('should catch some user errors', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('x'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('64');
  });

  // you need to add more tests on possible user errors
  it('should not have multiple leading zeros', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('0'));

    expect(calculatorInput.props.value).toBe('0');
  });

  // Should not have zeros appear later
  it('should not have zeros appear later', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('x'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('24');
  });

  // Should not have multiple decimal points in a number
  it('should not have multiple decimal points', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));

    expect(calculatorInput.props.value).toBe('1.2');
  });

  // Should be able to have multiple numbers with decimal points
  it('should be able to have multiple numbers with decimal points', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('4'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('4.6');
  });

  // Deleting a decimal point should make decimal allow for reenty of decimal point
  it('should allow for reentry of decimal point', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('DEL'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));

    expect(calculatorInput.props.value).toBe('1.2');
  });

  // Clearing the input should allow for reentry of decimal point
  it('should allow for reentry of decimal point', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('RESET'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));

    expect(calculatorInput.props.value).toBe('0.2');
  });

  // TODO currently if first nonzero entered is a decimal point it will be displayed as '0.', if I enter a '.' after an operator should I prepend a '0'?
  // It should prepend a zero to a decimal point with no leading number
  it('should prepend a zero to a decimal point with no leading number', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));

    expect(calculatorInput.props.value).toBe('0.2');
  });

  // Should not be able to enter an operator after a decimal point
  it('should not be able to enter an operator after a decimal point', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('2'));

    expect(calculatorInput.props.value).toBe('1.2');
  });

  // Should not be able to have more than 15 characters on screen
  it('should not be able to have more than 15 characters on screen', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('4'));
    fireEvent.press(getByText('5'));
    fireEvent.press(getByText('6'));
    fireEvent.press(getByText('7'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('9'));
    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('4'));
    fireEvent.press(getByText('5'));
    fireEvent.press(getByText('6'));
    fireEvent.press(getByText('7'));
    
    expect(calculatorInput.props.value).toBe('1234567890123456');
  });

  // Division by zero should return 'Error'
  it('should return error when dividing by zero', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('Error');
  });

  // If we display error, overwrite it with a new number
  it('should overwrite error with a new number', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('='));
    fireEvent.press(getByText('1'));

    expect(calculatorInput.props.value).toBe('1');
  });

  // If we display error, cannot enter a new operator
  it('should not be able to enter a new operator after error', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('='));
    fireEvent.press(getByText('+'));

    expect(calculatorInput.props.value).toBe('Error');
  });

  // If we display error, can enter a new decimal point to overwrite error but must be prepended with a zero
  it('should be able to enter a new decimal point after error', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('='));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));

    expect(calculatorInput.props.value).toBe('0.2');
  });

  // If result is displayed, pressing a number should clear the result and start a new calculation
  it('should clear the result and start a new calculation when pressing a number', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));
    fireEvent.press(getByText('4'));

    expect(calculatorInput.props.value).toBe('4');
  });

  // If result is displayed, pressing an operator should not clear the screen and use the result in the next calculation
  it('should not clear the result and use the result in the next calculation when pressing an operator', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('3'));

    expect(calculatorInput.props.value).toBe('3+3');
  });

  // If result is displayed, entering a decimal point should clear the result, prepend a zero and start a new calculation
  it('should clear the result, prepend a zero and start a new calculation when pressing a decimal point', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('3'));

    expect(calculatorInput.props.value).toBe('0.3');
  });
});
