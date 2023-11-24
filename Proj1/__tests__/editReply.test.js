import {render, fireEvent} from '@testing-library/react-native';
import EditReply from '../components/editReply';

//test to see if the edit button renders correctly
test('renders correctly', () => {
    render(<EditReply />);
    }
);

//test to see if edit button is pressed
test('edit button is pressed', () => {
    const { getByTestId } = render(<EditReply />);
    const button = getByTestId('editButton');
    fireEvent.press(button);
    }
);

