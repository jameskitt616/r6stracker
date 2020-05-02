import 'react-native-gesture-handler';
import React from 'react';
import Player from './src/screen/Player';
import Players from './src/screen/Players';
import SearchPlayer from './src/screen/SearchPlayer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Players">
          <Stack.Screen name="Players" component={Players} options={{
              headerShown: false
          }} />
          <Stack.Screen name="Player" component={PlayerStack} />
          <Stack.Screen name="SearchPlayer" component={SearchPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

function PlayerStack() {
  return (
      <Tab.Navigator initialRouteName="PlayerOverview">
        <Tab.Screen name="PlayerOverview" component={Player} />
      </Tab.Navigator>
  );
}
