import { render, fireEvent } from '@testing-library/react-native';
import FontsScreen from '../src/screens/FontsScreen';

test('renders correctly', () => {
    render(<FontsScreen />);
    }
);

test('pressing button changes font', () => {
    const { getByTestId } = render(<FontsScreen />);
    const button = getByTestId('fonts-button');
    fireEvent.press(button);
    }
);


// test that circle button is rendered an can be pressed and changes font
test('font button is rendered and can be pressed', async () => {
    const { getByTestId } = render(<FontsScreen />);
    const button = getByTestId('fonts-button');
    expect(button).toBeTruthy();

    fireEvent.press(button);

    const header = getByTestId('header-fonts');
    expect(header).toBeTruthy();

    let styles = {};
    if(Array.isArray(header.props.style)){
        styles = header.props.style.reduce((acc, cur) => {
            return {...acc, ...cur};
        }, {});
    } else {
        styles = header.props.style;
    }

    expect(styles.fontFamily).toEqual('Inconsolata-Regular');
    
});

// test that circle button is rendered an can be pressed and changes font
test('font button is rendered and can be pressed', async () => {
    const { getByTestId } = render(<FontsScreen />);
    const button = getByTestId('fonts-button2');
    expect(button).toBeTruthy();

    fireEvent.press(button);

    const header = getByTestId('header-fonts');
    expect(header).toBeTruthy();

    let styles = {};
    if(Array.isArray(header.props.style)){
        styles = header.props.style.reduce((acc, cur) => {
            return {...acc, ...cur};
        }, {});
    } else {
        styles = header.props.style;
    }

    expect(styles.fontFamily).toEqual('Inconsolata-Regular');
    
});