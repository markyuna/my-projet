import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { MaterialIcons } from '@expo/vector-icons';

import BottomTabNav from './BottomTabNav';
import HomeStackNav from './HomeStackNav';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNav}
        options={{
          title: 'Accueil',
          drawerIcon: () => <MaterialIcons name="home" size={24} color="black" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
