import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './routes/DrawerNav';
import store from './redux/store';
import { Provider } from 'react-redux';
import Login from './screens/Login';
import ProfileInfos from './screens/ProfileInfos';


const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ProfilInfos" component={ProfileInfos}/>
          <Stack.Screen name="Home" component={DrawerNav}/>

        </Stack.Navigator>      
      </NavigationContainer>
    </Provider>
  );
}
