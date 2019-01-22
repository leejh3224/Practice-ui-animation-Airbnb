import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ViewPagerAndroid
} from "react-native";
import { NavigationEvents, NavigationScreenProps } from "react-navigation";

import data from "./lib/getDummyData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

class ImageModal extends React.Component<
  NavigationScreenProps,
  { index: number }
> {
  static navigationOptions = {
    header: null
  };

  scrollView: any;

  constructor(props: any) {
    super(props);

    this.state = {
      index: props.navigation.getParam("index", 0)
    };
  }

  render() {
    const { index } = this.state;

    const contents = data.map(({ uri, description }, i) => {
      return (
        <View key={uri}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              source={{
                uri
              }}
              style={{
                width: SCREEN_WIDTH,
                height: 300,
                alignSelf: "center"
              }}
            />
          </View>
          <View style={{ margin: 16, flexDirection: "row" }}>
            <Text style={{ fontSize: 24, color: "white", marginRight: 24 }}>
              {i + 1}/{data.length}
            </Text>
            <Text style={{ fontSize: 24, color: "white" }}>{description}</Text>
          </View>
        </View>
      );
    });

    return (
      <SafeAreaView>
        <NavigationEvents
          /** will update index state every time modal pops up */
          onWillFocus={() =>
            this.setState(prev => ({
              ...prev,
              index: this.props.navigation.getParam("index", 0)
            }))
          }
        />
        <View
          style={{
            backgroundColor: "black",
            height: "100%"
          }}
        >
          <View
            style={{
              marginTop: 32,
              marginBottom: 16,
              marginHorizontal: 16,
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <MaterialCommunityIcons
              name="close"
              size={32}
              color="white"
              onPress={() => this.props.navigation.goBack()}
            />
            <MaterialCommunityIcons
              name="share-variant"
              size={32}
              color="white"
            />
          </View>
          {/*
           * [ScrollView is missing initial scroll position for Android](https://www.google.com/search?q=scroll+view+content+offset+android&oq=scroll+view+content+offset+android&aqs=chrome..69i57.5957j0j4&sourceid=chrome&ie=UTF-8)
           * `contentOffset` property of ScrollView is not supported in Android (works only on iOS).
           * You can use `ViewPagerAndroid` instead with `initialPage` property
           */
          Platform.OS === "android" ? (
            <ViewPagerAndroid style={{ flex: 1 }} initialPage={index}>
              {contents}
            </ViewPagerAndroid>
          ) : (
            <ScrollView
              ref={ref => (this.scrollView = ref)}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentOffset={{ x: index * SCREEN_WIDTH, y: 0 }}
            >
              {contents}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default ImageModal;
