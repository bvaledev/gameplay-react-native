import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {ApointmentDetails} from '../screens/ApointmentDetails';
import {ApointmentCreate} from '../screens/ApointmentCreate';
import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator();


export function AppRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >
        <Screen 
          name="Home" 
          component={Home} 
        />
        <Screen 
          name="ApointmentDetails" 
          component={ApointmentDetails} 
        />
        <Screen 
          name="ApointmentCreate" 
          component={ApointmentCreate} 
        />
    </Navigator>
  );
}