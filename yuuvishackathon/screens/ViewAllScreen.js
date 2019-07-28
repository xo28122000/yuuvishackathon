import React from "react";

import styles from "../config/styles";
import { View, Text, Button } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
// import { getUserGroup, getGroups } from "../requests";
// import { Video } from "expo-av";
import { Header, SearchBar, Avatar, Badge, Image } from "react-native-elements";

import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
import ListOfIdeas from "../components/ListOfIdeas";

class ViewAllScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
      /* These values are used instead of the shared configuration! */
    };
  };

  state = {
    search: "",
    tags: [
      {
        title: "Saturday",
        tags: ["Carrier Pigeons", "Drone Delivery System"],
        tagsdetail: [
          { name: "Carrier Pigeons", info: "New Sound Regulations - Quiet" },
          {
            name: "Drone Delivery System",
            info: "New Sound Regulations - Noisy"
          }
        ]
      },
      {
        title: "Friday",
        tags: ["Zoo", "Lion", "Tickets"],
        tagsdetail: [
          { name: "Zoo", info: "SF Zoo - L Muni" },
          { name: "Lion", info: "Save - Endangered" },
          { name: "Tickets", info: "Weekends - discount" }
        ]
      },
      {
        title: "Thursday",
        tags: ["Hackathon", "MLH", "Travel"],
        tagsdetail: [
          { name: "Hackathon", info: "some info abt Zoo" },
          { name: "MLH", info: "some info abt MLH" },
          { name: "Travel", info: "some info abt Travel" }
        ]
      },
      {
        title: "Wednesday",
        tags: ["Yuuvis", "Berlin", "API"],
        tagsdetail: [
          { name: "yuuvis", info: "some info abt Yuuvis" },
          { name: "berlin", info: "some info abt Berlin" },
          { name: "API", info: "some info abt API" }
        ]
      },
      {
        title: "Tuesday",
        tags: ["startup", "w2 form", "california pizza", "filing taxes"],
        tagsdetail: [
          { name: "startup", info: "some info abt Zoo" },
          { name: "w2 form", info: "some info abt Zoo" },
          { name: "california pizza", info: "some info abt Zoo" },
          { name: "filing taxes", info: "some info abt Zoo" }
        ]
      },
      {
        title: "Monday",
        tags: ["Carrier Pigeons", "Drone Delivery System"],
        tagsdetail: [
          { name: "Carrier Pigeons", info: "some info abt Zoo" },
          { name: "Drone Delivery System", info: "some info abt Zoo" }
        ]
      },
      {
        title: "Sunday",
        tags: ["Carrier Pigeons", "Drone Delivery System"],
        tagsdetail: [
          { name: "Carrier Pigeons", info: "some info abt Zoo" },
          { name: "Drone Delivery System", info: "some info abt Zoo" }
        ]
      }
    ]
  };
  updateSearch = search => {
    this.setState({ search });
    if (
      search.toLowerCase() === "carrier pigeons" ||
      search.toLowerCase() === "drone delivery system"
    ) {
      this.setState({
        tags: [
          {
            title: "Saturday",
            tags: ["Carrier Pigeons", "Drone Delivery System"],
            tagsdetail: [
              { name: "Carrier Pigeons", info: "New Sound Regulations" },
              { name: "Drone Delivery System", info: "New Sound Regulations" }
            ]
          }
        ]
      });
    } else if (
      search.toLowerCase() === "zoo" ||
      search.toLowerCase() === "lion" ||
      search.toLowerCase() === "tickets"
    ) {
      this.setState({
        tags: [
          {
            title: "Friday",
            tags: ["Zoo", "Lion", "Tickets"],
            tagsdetail: [
              { name: "Zoo", info: "some info abt Zoo" },
              { name: "Lion", info: "some info abt Lion" },
              { name: "Tickets", info: "some info abt Tickets" }
            ]
          }
        ]
      });
    } else {
    }
  };

  //   handleButtonPress = () => {
  //     this.props.navigation.navigate("LoginScreen");
  //   };

  render() {
    const appicon = (
      <Avatar rounded source={require("../assets/AppIcon.png")} />
    );
    return (
      <View style={{ backgroundColor: "#e7e8ee", marginBottom: 20 }}>
        <Header
          leftComponent={appicon}
          centerComponent={
            <Image
              source={require("../assets/AppName2.png")}
              style={{ width: 150, height: 50 }}
              resizeMode="contain"
            />
          }
          rightComponent={
            <View>
              <Avatar rounded source={require("../assets/user.png")} />

              <Badge
                value={3}
                status="error"
                containerStyle={{ position: "absolute", top: -4, right: -4 }}
              />
            </View>
          }
          barStyle="dark-content"
          containerStyle={{ height: "10%", backgroundColor: "#428AF8" }}
        />
        <SearchBar
          lightTheme={true}
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          containerStyle={{ width: "100%" }}
        />

        <ListOfIdeas tags={this.state.tags} />
      </View>
    );
  }
}
export default ViewAllScreen;
