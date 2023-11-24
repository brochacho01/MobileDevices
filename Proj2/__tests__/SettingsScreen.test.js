import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SettingsScreen from '../src/screens/SettingsScreen';
import CircleButton from '../src/components/themed/CircleButton';

test('renders correctly', () => {
    render(<SettingsScreen />);
    }
);

// test background color
test('test background color', async () => {
    const { getByTestId } = render(<SettingsScreen />);
    const header = getByTestId('header');
    expect(header).toBeTruthy();

    let styles = {};
    if(Array.isArray(header.props.style)){
        styles = header.props.style.reduce((acc, cur) => {
            return {...acc, ...cur};
        }, {});
    } else {
        styles = header.props.style;
    }
        
    expect(styles.backgroundColor).toEqual('#f6f8ff');
}
);

// test that circle button is rendered an can be pressed and changes background color
test('circle button is rendered and can be pressed', async () => {
    const { getByTestId } = render(<CircleButton />);
    const button = getByTestId('circle-button');
    expect(button).toBeTruthy();

    fireEvent.press(button);

    const header = getByTestId('header-circle');
    expect(header).toBeTruthy();

    let styles = {};
    if(Array.isArray(header.props.style)){
        styles = header.props.style.reduce((acc, cur) => {
            return {...acc, ...cur};
        }, {});
    } else {
        styles = header.props.style;
    }

    expect(styles.backgroundColor).toEqual('#f6f8ff');
    
});