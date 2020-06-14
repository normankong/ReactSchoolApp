import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ChineseScreen from '../screens/Chinese';
import EnglishScreen from '../screens/EnglishScreen';
import MathScreen from '../screens/MathScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Chinese';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Chinese"
        component={ChineseScreen}
        options={{
          title: '中文',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-apps" />,
        }}
      />
      <BottomTab.Screen
        name="English"
        component={EnglishScreen}
        options={{
          title: '英文',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />

      <BottomTab.Screen
        name="Maths"
        component={MathScreen}
        options={{
          title: '數學',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-star" />,
        }}
      />
    </BottomTab.Navigator>
    
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'English':
      return '學英文';
    case 'Chinese':
      return '學中文';
    case 'Maths':
      return '學數學';
  }
}
