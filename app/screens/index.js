import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HistoryScreen from './HistoryScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';

import HomeIcon from '../../assets/icons/home.svg';
import MoreInformationIcon from '../../assets/icons/more-horizontal.svg';
import RotateCcwIcon from '../../assets/icons/rotate-ccw.svg';

import color from '../constants/color';
import { View } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

export default function () {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Tab.Navigator
        initialRouteName='History'
        activeColor={color.green}
        inactiveColor={color.white}
        shifting={true}
        barStyle={{
          backgroundColor: color.primary,
          paddingBottom: 10
        }}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          style={{
            backgroundColor: 'red'
          }}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <HomeIcon
                style={{
                  marginBottom: 20,
                  paddingBottom: 10
                }}
              />
            ),
            tabBarColor: `${color.primary}`
          }}
        />
        <Tab.Screen
          name='History'
          component={HistoryScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => <RotateCcwIcon />,
            tabBarColor: `${color.primary}`
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => <MoreInformationIcon />,
            tabBarColor: `${color.primary}`
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
