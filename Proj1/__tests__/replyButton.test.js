import {render, fireEvent} from '@testing-library/react-native';
import ReplyButton from '../components/replyButton';

//test to see if the reply button renders correctly
test('renders correctly', () => {
    render(<ReplyButton />);
    }
);

//test to see if reply button is pressed
test('reply button is pressed', () => {
    const { getByTestId } = render(<ReplyButton />);
    const button = getByTestId('replyButton');
    fireEvent.press(button);
    }
);

