import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const HomeStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export const RootStack: React.FC = () => {
  const authContext = useContext(AuthContext);

  return authContext?.auth ? <HomeStack /> : <AuthStack />;
};
