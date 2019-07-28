import React from "react";

import styles from "../config/styles";
import { View, Text, ScrollView } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
// import { getUserGroup, getGroups } from "../requests";
// import { Video } from "expo-av";
import {
  Header,
  SearchBar,
  Card,
  ListItem,
  Button,
  Icon,
  Badge,
  ButtonGroup,
  Overlay
} from "react-native-elements";
import IdeaCardRender from "../components/IdeaCardRender";
import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
// const tags = [
//   {
//     title: "Saturday",
//     tags: ["Carrier Pigeons", "Drone Delivery System"],
//     tagsdetail: [
//       { name: "Carrier Pigeons", info: "New Sound Regulations" },
//       { name: "Drone Delivery System", info: "New Sound Regulations" }
//     ]
//   },
//   {
//     title: "Friday",
//     tags: ["Zoo", "Lion", "Tickets"],
//     tagsdetail: [
//       { name: "Zoo", info: "some info abt Zoo" },
//       { name: "Lion", info: "some info abt Lion" },
//       { name: "Tickets", info: "some info abt Tickets" }
//     ]
//   },
//   {
//     title: "Thursday",
//     tags: ["Hackathon", "MLH", "Travel"],
//     tagsdetail: [
//       { name: "Hackathon", info: "some info abt Zoo" },
//       { name: "MLH", info: "some info abt MLH" },
//       { name: "Travel", info: "some info abt Travel" }
//     ]
//   },
//   {
//     title: "Wednesday",
//     tags: ["Yuuvis", "Berlin", "API"],
//     tagsdetail: [
//       { name: "yuuvis", info: "some info abt Yuuvis" },
//       { name: "berlin", info: "some info abt Berlin" },
//       { name: "API", info: "some info abt API" }
//     ]
//   },
//   {
//     title: "Tuesday",
//     tags: ["startup", "w2 form", "california pizza", "filing taxes"],
//     tagsdetail: [
//       { name: "startup", info: "some info abt Zoo" },
//       { name: "w2 form", info: "some info abt Zoo" },
//       { name: "california pizza", info: "some info abt Zoo" },
//       { name: "filing taxes", info: "some info abt Zoo" }
//     ]
//   },
//   {
//     title: "Monday",
//     tags: ["Carrier Pigeons", "Drone Delivery System"],
//     tagsdetail: [
//       { name: "Carrier Pigeons", info: "some info abt Zoo" },
//       { name: "Drone Delivery System", info: "some info abt Zoo" }
//     ]
//   },
//   {
//     title: "Sunday",
//     tags: ["Carrier Pigeons", "Drone Delivery System"],
//     tagsdetail: [
//       { name: "Carrier Pigeons", info: "some info abt Zoo" },
//       { name: "Drone Delivery System", info: "some info abt Zoo" }
//     ]
//   }
// ];

class ViewAllScreen extends React.Component {
  state = { overlay: false };

  //   handleButtonPress = () => {
  //     this.props.navigation.navigate("LoginScreen");
  //   };
  //   updateIndex = selectedIndex => {
  //     this.setState({ overlay: true });
  //     console.log(this.state.overlay);
  //     // this.setState({ selectedIndex });
  //   };
  //   closeoverlay = () => {
  //     this.setState({ overlay: false });
  //     console.log(this.state.overlay);
  //   };
  render() {
    const cardstodisplay = this.props.tags.map(tag => (
      <IdeaCardRender
        key={tag.title}
        title={tag.title}
        tags={tag.tags}
        tagsdetail={tag.tagsdetail}
      />
    ));
    return (
      <ScrollView onPress={this.updateIndex}>
        {/* <Overlay isVisible={this.state.overlay}>
          <View style={styles.form}>
            <Text
              style={{
                margin: 5,
                alignSelf: "center",
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              Saturday
            </Text>
            <Text
              style={{
                margin: 5,
                alignSelf: "center",
                fontSize: 30,
                fontWeight: "bold"
              }}
            >
              {"    "}
            </Text>
            <Card
              containerStyle={{
                backgroundColor: "#c7e1f6",
                margin: 20,
                padding: 10
              }}
              title="Carrier Pigeons "
            >
              <Text> New Sound Regulations</Text>
            </Card>
            <Card
              containerStyle={{
                backgroundColor: "#c7e1f6",
                margin: 20,
                padding: 10
              }}
              title="Drone delivery service "
            >
              <Text> New Sound Regulations</Text>
            </Card>
            <Text
              style={{
                margin: 5,
                alignSelf: "center",
                fontSize: 30,
                fontWeight: "bold"
              }}
            >
              {"    "}
            </Text>
            <Button
              Style={{ backgroundColor: "#f6ffed", margin: 20 }}
              title="Back"
              onPress={this.closeoverlay}
            />
          </View>
        </Overlay> */}
        {/* <IdeaCardRender
          title="Sunday"
          tags={["tag1", "tag2", "tag3"]}
          tagsdetail={[
            { name: "tag1", info: "some info abt tag1" },
            { name: "tag2", info: "some info abt tag2" },
            { name: "tag3", info: "some info abt tag3" }
          ]}
        /> */}
        {/* <Card
          containerStyle={{ backgroundColor: "#c7e1f6" }}
          title="Saturday "
          onPress={this.updateIndex}
        >
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#ffedf6" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["See All Ideas of the day!"]}
            containerStyle={{ height: 40 }}
          />
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#f6ffed" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["Carrier Pigeons", "Drone Delivery System"]}
            containerStyle={{ height: 100 }}
          />
        </Card>
        <Card
          containerStyle={{ backgroundColor: "#c7e1f6" }}
          title="Friday "
          onPress={this.updateIndex}
        >
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#ffedf6" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["See All Ideas of the day!"]}
            containerStyle={{ height: 40 }}
          />
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#f6ffed" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["Zoo", "Lion", "Tickets"]}
            containerStyle={{ height: 100 }}
          />
        </Card> */}
        {cardstodisplay}
        {/* <Card containerStyle={{ backgroundColor: "#c7e1f6" }} title="Thursday ">
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#ffedf6" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["See All Ideas of the day!"]}
            containerStyle={{ height: 40 }}
          />
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#f6ffed" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["Hackathon", "MLH", "Travel"]}
            containerStyle={{ height: 100 }}
          />
        </Card>
        <Card
          containerStyle={{ backgroundColor: "#c7e1f6" }}
          title="Wednesdday "
        >
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#ffedf6" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["See All Ideas of the day!"]}
            containerStyle={{ height: 40 }}
          />
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#f6ffed" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["yuuvis", "berlin", "api"]}
            containerStyle={{ height: 100 }}
          />
        </Card>
        <Card containerStyle={{ backgroundColor: "#c7e1f6" }} title="Tuesday ">
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#ffedf6" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["See All Ideas of the day!"]}
            containerStyle={{ height: 40 }}
          />
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#f6ffed" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["startup", "w2 form", "california pizza", "filing taxes"]}
            containerStyle={{ height: 100 }}
          />
        </Card>
        <Card containerStyle={{ backgroundColor: "#c7e1f6" }} title="Monday ">
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#ffedf6" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["See All Ideas of the day!"]}
            containerStyle={{ height: 40 }}
          />
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#f6ffed" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["startup", "w2 form", "california pizza", "filing taxes"]}
            containerStyle={{ height: 100 }}
          />
        </Card>
        <Card containerStyle={{ backgroundColor: "#c7e1f6" }} title="Sunday ">
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#ffedf6" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["See All Ideas of the day!"]}
            containerStyle={{ height: 40 }}
          />
          <ButtonGroup
            buttonStyle={{ backgroundColor: "#f6ffed" }}
            onPress={this.updateIndex}
            // selectedIndex={selectedIndex}
            buttons={["startup", "w2 form", "california pizza", "filing taxes"]}
            containerStyle={{ height: 100 }}
          />
        </Card> */}
      </ScrollView>
    );
  }
}
export default ViewAllScreen;
