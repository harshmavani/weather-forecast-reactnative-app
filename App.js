import * as React from 'react';
// import { StyleSheet, View ,Text,ScrollView} from 'react-native';
import SearchScreen from './components/SearchScreen';
// import { TextInput ,Card, List} from 'react-native-paper';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size }) => {
            let iconName;

            if (route.name === 'Current City') {
              iconName ='thunderstorm';
            } else if (route.name === 'Select City') {
              iconName ='options';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white', 
          inactiveTintColor: 'gray',
          activeBackgroundColor: '#6200ee',
          inactiveBackgroundColor: '#6200ee',
          style: { height: 60 },
          tabStyle : {padding:10},
          labelStyle: { fontSize: 12 },

        }}

      >
        <Tab.Screen name="Current City" component={HomeScreen} />
        <Tab.Screen name="Select City" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
