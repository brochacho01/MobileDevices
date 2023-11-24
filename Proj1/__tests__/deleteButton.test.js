import {render, fireEvent} from '@testing-library/react-native';
import DeleteButton from '../components/deleteButton';

//test to see if the delete button renders correctly
test('renders correctly', () => {
    render(<DeleteButton />);
    }
);

//test to see if delete button is pressed
test('delete button is pressed', () => {
    const { getByTestId } = render(<DeleteButton />);
    const button = getByTestId('deleteButton');
    fireEvent.press(button);
    }
);

