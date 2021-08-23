import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import AudioListItem from "./src/components/AudioListItem";
import AudioProvider from "./src/context/AudioProvider";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    // <AudioProvider>
    //   <NavigationContainer>
    //     <AppNavigator />
    //   </NavigationContainer>
    // </AudioProvider>
    <View style={{ marginTop: 50 }}>
      <AudioListItem />
    </View>
  );
}
