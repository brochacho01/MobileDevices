import { render, waitFor, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import { act } from 'react-test-renderer';
import QuoteComponent from '../src/components/QuoteComponent';

// Test to see if the QuoteComponent renders correctly
test('renders correctly', () => {
    render(<QuoteComponent />);
}
);


// Test to see if the default quote is displayed if the api call fails
jest.mock('axios');

describe('QuoteComponent', () => {
  test('should handle error on api.quotable call', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    const { getByText } = render(<QuoteComponent />);

    await waitFor(() => {
      expect(getByText('Not all those who wander are lost.')).toBeTruthy();
      expect(getByText('- J.R.R. Tolkien')).toBeTruthy();
    });
  });
});

// Test to see if a quote will be displayed upon successful api call
jest.mock('axios');
describe('QuoteComponent', () => {
  test('should handle success on api.quotable call', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        content: 'This is a test quote',
        author: 'Test Author',
      },
    });
    // Render quote component and have it check mock api call
    const { getByText } = render(<QuoteComponent />);
    // Wait for the api call to be made
    await waitFor(() => {
      expect(getByText('This is a test quote')).toBeTruthy();
      expect(getByText('- Test Author')).toBeTruthy();
    }
    );
  });
});

// Test to see if the quote will change when the button is pressed
jest.mock('axios');
describe('QuoteComponent', () => {
  test('should handle success on api.quotable call', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        content: 'This is a test quote',
        author: 'Test Author',
      },
    });
    // Render quote component and have it check mock api call
    const { getByText, getByTestId } = render(<QuoteComponent />);
    // Wait for the api call to be made
    await waitFor(() => {
      expect(getByText('This is a test quote')).toBeTruthy();
      expect(getByText('- Test Author')).toBeTruthy();
    }
    );
    // Mock a new quote
    axios.get.mockResolvedValueOnce({
      data: {
        content: 'This is a new test quote',
        author: 'New Test Author',
      },
    });
    // Press the button to get a new quote
    await act(async () => {
      fireEvent.press(getByTestId('refresh-button'));
    }
    );
    // Wait for the api call to be made
    await waitFor(() => {
      expect(getByText('This is a new test quote')).toBeTruthy();
      expect(getByText('- New Test Author')).toBeTruthy();
    }
    );
  });
});
  