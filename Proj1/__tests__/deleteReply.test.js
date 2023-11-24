import {render, fireEvent} from '@testing-library/react-native';
import DeleteReply from '../components/deleteReply';

//test to see if the delete button renders correctly
test('renders correctly', () => {
    render(<DeleteReply />);
    }
);

//test to see if delete button is pressed
test('delete button is pressed', () => {
    const { getByTestId } = render(<DeleteReply />);
    const button = getByTestId('deleteButton');
    fireEvent.press(button);
    }
);

