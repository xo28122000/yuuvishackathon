import React from "react";

import styles from "../config/styles";
import { View, Text, Button } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
// import { getUserGroup, getGroups } from "../requests";
// import { Video } from "expo-av";
import { Header, SearchBar } from "react-native-elements";

import NavigationBar from "../components/NavigationBar";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
      /* These values are used instead of the shared configuration! */
    };
  };

  state = {
    search: ""
  };

  handleButtonPress = () => {
    this.props.navigation.navigate("LoginScreen");
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar />
        <SearchBar
          lightTheme
          onChangeText={this.updateSearch}
          icon={{ type: "font-awesome", name: "search" }}
          placeholder="Type Here..."
        />
        <View style={{ flex: 1 }}>
          <Button
            style={{ flex: 3, backgroundColor: "steelblue" }}
            title="Record"
          />
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 50,
            margin: 20
          }}
        >
          HomeScreen
        </Text>
        <Button title="go to another screen" onPress={this.handleButtonPress} />
      </View>
    );
  }
}
export default HomeScreen;
