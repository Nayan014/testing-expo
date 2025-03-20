import { View, Text, Image, TextInput, StyleSheet, Button } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const authContext = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
        }}
        width={110}
        height={100}
      />
      <View style={{ width: "80%", marginTop: 40 }}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Please Enter Email"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Please Enter Password"
          style={[styles.input, { marginTop: 14, marginBottom: 18 }]}
          secureTextEntry
        />

        <Button title="Login" onPress={() => authContext?.setAuth(true)} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
