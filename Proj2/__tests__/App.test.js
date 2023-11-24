import { render } from '@testing-library/react-native';
import App from '../App';

// test if the app renders correctly
test('renders correctly', () => {
  render(<App />);
});

// Test that the nav bar is rendered
// test('renders nav bar', () => {
//   const { getByTestId } = render(<App />);
//   const navBar = getByTestId('nav-bar');
//   expect(navBar).toBeTruthy();
// }
// );


