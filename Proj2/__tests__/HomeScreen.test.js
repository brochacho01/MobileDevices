import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

test('renders correctly', () => {
    render(<HomeScreen />);
    }
);

// Test that the search button is rendered
test('renders search button', () => {
    const { getByTestId } = render(<HomeScreen />);
    const searchButton = getByTestId('search-button');
    expect(searchButton).toBeTruthy();
});

// Test that the search button can be pressed
test('search button is pressed', () => {
    const { getByTestId } = render(<HomeScreen />);
    const button = getByTestId('search-button');
    fireEvent.press(button);
    }
);


// Test that the dictionary api is called when the search button is pressed, and that the word is not null
test('Word not null after api call', () => {
    const { getByTestId } = render(<HomeScreen />);
    const button = getByTestId('search-button');
    fireEvent.press(button);

    //expect word to not be null
    const word = getByTestId('word');
    expect(word).toBeTruthy();
    }
);

// Test that audio is not null after api call
test('audio button is pressed', async () => {

    const { getByTestId } = render(<HomeScreen />);
    const sButton = getByTestId('search-button');
    fireEvent.press(sButton);

    await waitFor(() => {
        const aButton = getByTestId('audio-button');
        expect(aButton).toBeTruthy();
    }, {timeout: 5000});
});


// Test that definition is not null after api call
test('audio button is pressed', async () => {

    const { getByTestId } = render(<HomeScreen />);
    const sButton = getByTestId('search-button');
    fireEvent.press(sButton);

    await waitFor(() => {
        const def = getByTestId('definition');
        expect(def).toBeTruthy();
    }, {timeout: 5000});
});