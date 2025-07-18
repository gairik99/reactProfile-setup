import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./context/userContext";
import UserInputScreen from "./screens/UserInputScreen";
import PhotoUpload from "./screens/PhotoUpload";
import Completion from "./screens/Completion";

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="UserInput"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#e53f0dd6",
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="UserInput"
              component={UserInputScreen}
              options={{ title: "Basic Info" }}
            />
            <Stack.Screen
              name="PhotoUpload"
              component={PhotoUpload}
              options={{ title: "Photo Upload" }}
            />
            <Stack.Screen
              name="Completion"
              component={Completion}
              options={{ title: "Conformation Screen" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </>
  );
}
