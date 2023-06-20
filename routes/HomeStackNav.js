import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Portfolio from "../screens/Portfolio";
import Listes from "../screens/Lists";
import Sujets from "../screens/Sujets";
import Signets from "../screens/Signets";
import Moments from "../screens/Moments";

import Drawer from '../routes/DrawerNav';

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                    headerLeft: () => (
                        <MaterialIcons 
                        name="menu" 
                        size={28} 
                        color={'black'}
                        onPress={() => navigation.openDrawer()} 
                        />
                    )
                }}
        >
            <Drawer.Screen name="Home" component={Home} options={{ title: 'Accueil'}}/>
            <Drawer.Screen name="Profil" component={Portfolio} />
            <Drawer.Screen name="Listes" component={Listes} />
            <Drawer.Screen name="Sujets" component={Sujets} />
            <Drawer.Screen name="Signets" component={Signets} />
            <Drawer.Screen name="Moments" component={Moments} />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen;