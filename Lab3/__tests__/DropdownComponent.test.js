import { render, waitFor, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import { act } from 'react-test-renderer';
import DropdownComponent from '../src/components/Dropdown';
import ClockScreen from '../src/screens/ClockScreen';

// Test to see if DropdownComponent renders correctly
test('renders correctly', () => {
    render(<DropdownComponent />);
}
);

// Test to see if the dropdown menu is displayed when the button is pressed
jest.mock('axios');
describe('ClockScreen', () => {
    test('should display the dropdown menu when the button is pressed', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                datetime: '2021-04-01T12:00:00.000Z',
                timezone: 'America/New_York',
                day_of_year: 91,
                day_of_week: 4,
                week_number: 13,
            },
        });
        // Need to also mock the ip-api call
        axios.get.mockResolvedValueOnce({
            data: {
                city: 'New York',
                regionName: 'New York',
            },
        });
        const { getByText } = render(<ClockScreen />);
        // Wait for screen to render
        await waitFor(() => {
            expect(getByText('5:00')).toBeTruthy();
        }
        );

        await act(async () => {
            fireEvent.press(getByText('More'));
        }
        );
        await waitFor(() => {
            expect(getByText('America/New_York')).toBeTruthy();
            expect(getByText('Day of the Year:')).toBeTruthy();
            expect(getByText('Day of the Week:')).toBeTruthy();
            expect(getByText('Week Number:')).toBeTruthy();
            expect(getByText('91')).toBeTruthy();
            expect(getByText('4')).toBeTruthy();
            expect(getByText('13')).toBeTruthy();
        }
        );
    });
});

// Test to see if the dropdown menu is hidden when the button is pressed again
jest.mock('axios');
describe('ClockScreen', () => {
    test('should hide the dropdown menu when the button is pressed again', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                datetime: '2021-04-01T12:00:00.000Z',
                timezone: 'America/New_York',
                day_of_year: 91,
                day_of_week: 4,
                week_number: 13,
            },
        });
        // Need to also mock the ip-api call
        axios.get.mockResolvedValueOnce({
            data: {
                city: 'New York',
                regionName: 'New York',
            },
        });
        const { getByText } = render(<ClockScreen />);
        // Wait for screen to render
        await waitFor(() => {
            expect(getByText('5:00')).toBeTruthy();
        }
        );

        await act(async () => {
            fireEvent.press(getByText('More'));
        }
        );

        await waitFor(() => {
            expect(getByText('Less')).toBeTruthy();
        }
        );
        await act(async () => {
            fireEvent.press(getByText('Less'));
        }
        );
        await waitFor(() => {
            expect(getByText('More')).toBeTruthy();
        }
        );
    });
});
