import { render, waitFor, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import { act } from 'react-test-renderer';
import ClockScreen from '../src/screens/ClockScreen';

// Test to see if ClockScreen renders correctly
test('renders correctly', () => {
    render(<ClockScreen />);
}
);

// Test to see if the time is displayed correctly
jest.mock('axios');
describe('ClockScreen', () => {
    test('Should display the time', async () => {
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
        await waitFor(() => {
            expect(getByText('5:00')).toBeTruthy();
        }
        );
    });
});

// Test to see if the location is displayed correctly
jest.mock('axios');
describe('ClockScreen', () => {
    test('Should display the location', async () => {
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
        await waitFor(() => {
            expect(getByText('In New York, NY')).toBeTruthy();
        }
        );
    });
}
);

// Test to see if the greeting message properly displays
jest.mock('axios');
describe('ClockScreen', () => {
    test('Should display the greeting message', async () => {
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
        await waitFor(() => {
            expect(getByText('GOOD MORNING, IT\'S CURRENTLY')).toBeTruthy();
        });
    });
});

// Test to see if the greeting message updates with the time
jest.mock('axios');
describe('ClockScreen', () => {
    test('Should update the greeting mesage on large time change', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                datetime: '2021-04-01T24:00:00.000Z',
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
        await waitFor(() => {
            expect(getByText('GOOD AFTERNOON, IT\'S CURRENTLY')).toBeTruthy();
        });
    });
});