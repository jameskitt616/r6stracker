import 'react-native-gesture-handler';
import React from 'react';
import PlayerOverview from './src/screen/PlayerOverview';
import Home from './src/screen/Home';
import SearchPlayer from './src/screen/SearchPlayer';
import Settings from './src/screen/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { Buffer } from 'buffer';
import {bgGrayLight} from "./src/Enum/colors";
import {View} from "react-native";
global.Buffer = Buffer;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//TODO: check if needed
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer theme={Theme}>
        <Drawer.Navigator initialRouteName="Home"   drawerStyle={{
            paddingTop: 30,
        }}>
          <Drawer.Screen name="Home" component={PlayersStack} />
          <Drawer.Screen name="Settings" component={Settings} />
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

function PlayersStack() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{
            headerShown: false
        }} />
        <Stack.Screen name="Search player" component={SearchPlayer} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="Player" component={PlayerOverview} options={{
            title: '',
            headerStyle: {
                backgroundColor: bgGrayLight
            },
        }}/>
      </Stack.Navigator>
  );
}
