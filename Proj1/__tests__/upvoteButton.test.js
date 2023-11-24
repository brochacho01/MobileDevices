import {render, fireEvent} from '@testing-library/react-native';
import UpvoteButton from '../components/upvoteButton';

//test to see if the upvote button renders correctly
test('renders correctly', () => {
    render(<UpvoteButton />);
    }
);

//test to see if upvote button is pressed
test('upvote button is pressed', () => {
    const { getByTestId } = render(<UpvoteButton />);
    const button = getByTestId('upvoteButton');
    fireEvent.press(button);
    }
);
