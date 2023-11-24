import { Text } from 'react-native';

// NOTE how to deal with svg files
// use dependency react-native svg , but it seems to not work well with expo so need to install an older version of react-native-svg
// Specify version with npm install packName-svg-versionNumber
// If you want to see what svg image looks like in text editor, open it in browser

const MyText = (props) => {
    return (
        // ... will make passed in props key : value pairs
        <Text {...props} style={[{fontFamily: 'LeagueSpartan-Bold'}, props.style]}>
        {props.children}
        </Text>
    );
}

export default MyText;