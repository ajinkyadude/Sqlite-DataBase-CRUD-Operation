import { View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from "./Components/HomeScreen";
import FormScreen from "./Components/FormScreen";
import UpdateScreen from "./Components/UpdateScreen";

const Stack=createNativeStackNavigator();

function App(){
  return(
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="FormScreen" component={FormScreen} />
            
            <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
   )
}

export default App;