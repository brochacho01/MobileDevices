import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TEMP from './../components/themed/TEMP';

//import GitHubProfile from './../screens/GitHubProfile';
//import Settings from './../screens/Settings';

import { useThemeColors } from './../hooks/useThemeColors';

const TabBarIcon = ({ color, size, name }) => (
  <Ionicons name={name} size={size} color={color} />
);

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { colors } = useThemeColors();

  return (
    <Tab.Navigator
      initialRouteName='TEMP1'
      screenOptions={{
        tabBarInactiveTintColor: colors.textMidContrast,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name='TEMP2'
        component={TEMP}
        options={{
          title: 'Home',
          tabBarIcon: (props) => (
            <TabBarIcon name='book-outline' {...props} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='TEMP3'
        component={TEMP}
        options={{
          title: 'Settings',
          tabBarIcon: (props) => (
            <TabBarIcon name='settings-outline' {...props} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;