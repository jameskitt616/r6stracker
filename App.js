import 'react-native-gesture-handler';
import React from 'react';
import PlayerOverview from './src/screen/PlayerOverview';
import PlayerList from './src/screen/PlayerList';
import SearchPlayer from './src/screen/SearchPlayer';
import Settings from './src/screen/Settings';
import Leaderboard from "./src/screen/Leaderboard";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { Buffer } from 'buffer';
import {bgGrayLight} from "./src/Enum/colors";
global.Buffer = Buffer;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <NavigationContainer theme={Theme}>
        <Drawer.Navigator initialRouteName="PlayerList"   drawerStyle={{
            paddingTop: 30,
        }}>
          <Drawer.Screen name="Home" component={PlayersStack} />
          <Drawer.Screen name="Leaderboard" component={Leaderboard} />
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
      <Stack.Navigator initialRouteName="PlayerList">
        <Stack.Screen name="Home" component={PlayerList} options={{
            headerShown: false
        }} />
        <Stack.Screen name="Search player" component={SearchPlayer} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="Player" component={PlayerOverview} options={{
            headerStyle: {
                backgroundColor: bgGrayLight
            },
        }}/>
      </Stack.Navigator>
  );
}
