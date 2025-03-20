import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/navigation/root-navigation";
import AuthProvider from "./src/context/Auth";

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
