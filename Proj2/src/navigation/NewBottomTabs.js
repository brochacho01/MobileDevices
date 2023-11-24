import { TouchableOpacity, Text, View } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

// Define the bottom bar component
const BottomBar = ({ state, descriptors, navigation }) => {
    const { colors } = useThemeColors();
    return (
      // <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.background }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.background }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{ flex: 1, alignItems: 'center', padding: 16 }}
            >
              <Text style={{ color: isFocused ? colors.tabBarActive : colors.tabBarInactive }}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  export default BottomBar;
  