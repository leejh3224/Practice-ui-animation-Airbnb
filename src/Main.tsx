import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Constants } from "expo";
import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { NavigationScreenProps } from "react-navigation";

import Carousel from "./Carousel";

/** ui constants */
const NAV_BAR_HEIGHT = 60;
const CAROUSEL_HEIGHT = 300;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const {
  cond,
  and,
  lessThan,
  sub,
  lessOrEq,
  greaterOrEq,
  diffClamp,
  interpolate,
  multiply,
  Extrapolate,
  Value
} = Animated;
class App extends React.Component<NavigationScreenProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    const animatedNavBarTranslateY = navigation.getParam("translateY");
    const animatedTitleOpacity = navigation.getParam("opacity");
    const styles = StyleSheet.create({
      headerContainer: {
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: STATUS_BAR_HEIGHT,
        left: 0,
        right: 0,
        height: NAV_BAR_HEIGHT,
        paddingHorizontal: 16
      }
    });

    return {
      header: (
        <SafeAreaView>
          <Animated.View
            style={[
              styles.headerContainer,
              {
                transform: [
                  {
                    translateY: animatedNavBarTranslateY
                      ? animatedNavBarTranslateY
                      : 0
                  }
                ]
              }
            ]}
          >
            <Animated.View
              style={{
                opacity: animatedTitleOpacity ? animatedTitleOpacity : 1
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="white"
              />
            </Animated.View>
            <Animated.View
              style={[
                { flexDirection: "row" },
                { opacity: animatedTitleOpacity ? animatedTitleOpacity : 1 }
              ]}
            >
              <MaterialCommunityIcons
                name="share-variant"
                size={28}
                color="white"
                style={{ marginRight: 32 }}
              />
              <MaterialCommunityIcons
                name="heart-outline"
                size={28}
                color="white"
              />
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      )
    };
  };

  scrollY = new Value(0);
  animatedNavBarTranslateY: Animated.Node<number>;
  animatedTitleOpacity: Animated.Node<number>;

  constructor(props: any) {
    super(props);

    const threshold = CAROUSEL_HEIGHT - (NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT);

    /**
     * respond to current value of scrollY
     *
     * y < threshold: 0
     * threshold <= y <= threshold + NAVBAR_HEIGHT: y - threshold
     * threshold + NAVBAR_HEIGHT < y: NAVBAR_HEIGHT
     *
     * Collapsible Header is activated when scrollY passes threshold
     */
    this.animatedNavBarTranslateY = multiply(
      // you can make nested `cond` like this
      diffClamp(
        cond(
          lessThan(this.scrollY, threshold),
          0,
          cond(
            and(
              greaterOrEq(this.scrollY, threshold),
              lessOrEq(this.scrollY, threshold + NAV_BAR_HEIGHT)
            ),
            sub(this.scrollY, threshold),
            NAV_BAR_HEIGHT
          )
        ),
        0,
        NAV_BAR_HEIGHT
      ),
      -1
    );

    this.animatedTitleOpacity = interpolate(this.animatedNavBarTranslateY, {
      inputRange: [-NAV_BAR_HEIGHT, 0],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP
    });

    props.navigation.setParams({
      translateY: this.animatedNavBarTranslateY,
      opacity: this.animatedTitleOpacity
    });
  }

  render() {
    return (
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: this.scrollY
                }
              }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
      >
        <View>
          <Carousel />
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              bibendum velit quis sem tristique, sit amet sollicitudin sem
              accumsan. Nullam accumsan, est non vulputate pharetra, magna est
              scelerisque magna, non faucibus ligula nibh eget enim. Aenean
              commodo viverra rutrum. Praesent iaculis volutpat dui, ut aliquet
              metus porta ac. Quisque magna ante, malesuada sed placerat eget,
              finibus id ante. Nam ultricies finibus enim. Praesent sed arcu
              vitae tellus gravida varius sit amet id purus. Aliquam
              condimentum, augue nec dictum feugiat, mauris sem luctus ex, at
              vestibulum nibh sapien rutrum mi. Cras et suscipit nunc. Maecenas
              quis dui hendrerit, congue elit nec, fermentum ipsum. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Quisque ut ante eu nisl Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Donec bibendum velit quis sem
              tristique, sit amet sollicitudin sem accumsan. Nullam accumsan,
              est non vulputate pharetra, magna est scelerisque magna, non
              faucibus ligula nibh eget enim. Aenean commodo viverra rutrum.
              Praesent iaculis volutpat dui, ut aliquet metus porta ac. Quisque
              magna ante, malesuada sed placerat eget, finibus id ante. Nam
              ultricies finibus enim. Praesent sed arcu vitae tellus gravida
              varius sit amet id purus. Aliquam condimentum, augue nec dictum
              feugiat, mauris sem luctus ex, at vestibulum nibh sapien rutrum
              mi. Cras et suscipit nunc. Maecenas quis dui hendrerit, congue
              elit nec, fermentum ipsum. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Quisque ut
              ante eu nisl
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    );
  }
}

export default App;
