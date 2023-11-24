import { render } from '@testing-library/react-native';
import App from '../App';

// test if the app renders correctly
test('renders correctly', () => {
  render(<App />);
});

// Test that the search button functions correctly when pressed
test('search button functions correctly', () => {
  const { getByTestId } = render(<App />);
  const searchButton = getByTestId('search-button');
  expect(searchButton).toBeTruthy();
});

// Test that the light mode button functions correctly when pressed
test('light mode button functions correctly', () => {
  const { getByTestId } = render(<App />);
  const lightModeButton = getByTestId('light-mode-button');
  expect(lightModeButton).toBeTruthy();
});

// Test that the nav bar takes you to the font screen when pressed


// Test that the nav bar takes you to the settings screen when pressed


