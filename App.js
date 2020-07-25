import 'react-native-gesture-handler';
import React from 'react';
import PlayerOverview from './src/screen/PlayerOverview';
import Players from './src/screen/Players';
import SearchPlayer from './src/screen/SearchPlayer';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { Buffer } from 'buffer';
import {bgGrayLight} from "./src/Enum/colors";
global.Buffer = Buffer;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer theme={Theme}>
        <Drawer.Navigator initialRouteName="Players">
          <Drawer.Screen name="Players" component={PlayersStack} />
          <Drawer.Screen name="Search Player" component={SearchPlayer} />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

const Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#FFFFFF',
        text: '#FFFFFF',
    },
};

function PlayerStack() {
  return (
      <Tab.Navigator initialRouteName="Player Overview">
        <Tab.Screen name="Player Overview" component={PlayerOverview} options={props}/>
      </Tab.Navigator>
  );
}

function PlayersStack() {
  return (
      <Stack.Navigator initialRouteName="Players">
        <Stack.Screen name="Players" component={Players}  options={{
            headerShown: false
        }} />
        <Stack.Screen name="Player" component={PlayerOverview} options={{
            title: '',
            headerStyle: {
                backgroundColor: bgGrayLight
            },
        }}/>
      </Stack.Navigator>
  );
}
