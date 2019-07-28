import React, { Component } from "react";
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
class IdeaCardRender extends Component {
  state = { overlay: false };
  updateIndex = selectedIndex => {
    this.setState({ overlay: true });
    console.log(this.state.overlay);
    // this.setState({ selectedIndex });
  };
  closeoverlay = () => {
    this.setState({ overlay: false });
    console.log(this.state.overlay);
  };
  render() {
    const overlaycards = this.props.tagsdetail.map(tagdetail => (
      <Card
        containerStyle={{
          backgroundColor: "#c7e1f6",
          margin: 20,
          padding: 10
        }}
        title={tagdetail.name}
      >
        <Text> {tagdetail.info}</Text>
      </Card>
    ));
    return (
      <View>
        <Overlay isVisible={this.state.overlay}>
          <View style={styles.form}>
            <Text
              style={{
                margin: 5,
                alignSelf: "center",
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              {this.props.title}
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
            <ScrollView>{overlaycards}</ScrollView>
            {/* <Card
              containerStyle={{
                backgroundColor: "#c7e1f6",
                margin: 20,
                padding: 10
              }}
              title="Carrier Pigeons fake "
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
            </Card> */}
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
        </Overlay>
        <Card
          containerStyle={{ backgroundColor: "#c7e1f6" }}
          title={this.props.title}
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
            buttons={this.props.tags}
            containerStyle={{ height: 100 }}
          />
        </Card>
      </View>
    );
  }
}

export default IdeaCardRender;
