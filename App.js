import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from "./src/screens/LandingScreen"
import ImageClickScreen from "./src/screens/ImageClickScreen"
const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Landing" component={LandingScreen}/>
        <Stack.Screen name="Image Screen" component={ImageClickScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
   
  )
  
}

export default App;