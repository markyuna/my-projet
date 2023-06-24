import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './routes/DrawerNav';
import Login from './screens/Login';

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} options={{ title: 'Conexion' }}/>
          <Stack.Screen name="Home" component={DrawerNav}/>
        </Stack.Navigator>      
      </NavigationContainer>
    </Provider>
  );
}
