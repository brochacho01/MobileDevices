import {render, fireEvent} from '@testing-library/react-native';
import EditButton from '../components/editButton';

//test to see if the edit button renders correctly
test('renders correctly', () => {
    render(<EditButton />);
    }
);

//test to see if edit button is pressed
test('edit button is pressed', () => {
    const { getByTestId } = render(<EditButton />);
    const button = getByTestId('editButton');
    fireEvent.press(button);
    }
);

