import React from "react";

import styles from "../config/styles";
import { View, Text, TextInput } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
import { Button } from "react-native-elements";

class RecordScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: "",

      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };

  state = {};
  handleButtonPress = () => {
    this.props.navigation.navigate("RecordScreen");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 50,
            margin: 20
          }}
        >
          Login
        </Text>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "chevron-left" }}
        />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "chevron-left" }}
        />
      </View>
    );
  }
}
export default RecordScreen;
