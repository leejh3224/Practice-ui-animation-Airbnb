import * as React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";

import data from "./lib/getDummyData";

const CAROUSEL_HEIGHT = 300;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDESHOW_DURATION = 3000;

class Carousel extends React.Component<Partial<NavigationInjectedProps>> {
  scrollView: any;
  scrollAnimationTimer: any;

  state = {
    index: 0
  };

  clearTimer = () => {
    clearInterval(this.scrollAnimationTimer);
  };

  componentDidMount = () => {
    let scrollValue = 0;
    this.scrollAnimationTimer = setInterval(() => {
      scrollValue = (scrollValue + SCREEN_WIDTH) % (SCREEN_WIDTH * data.length);
      this.setState(
        prev => ({
          ...prev,
          index: scrollValue / SCREEN_WIDTH
        }),
        () => this.scrollView.scrollTo({ x: scrollValue })
      );
    }, SLIDESHOW_DURATION);
  };

  componentWillUnmount = () => {
    this.clearTimer();
  };

  render() {
    const { index } = this.state;

    const styles = StyleSheet.create({
      container: {
        width: SCREEN_WIDTH,
        height: CAROUSEL_HEIGHT,
        position: "relative"
      },
      button: {
        backgroundColor: "#ffffff80",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        position: "absolute",
        bottom: 16,
        right: 16,
        flexDirection: "row",
        alignItems: "center"
      }
    });

    return (
      <View>
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          scrollEventThrottle={1}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          /** stops slideshow animation when touched */
          onTouchStart={() => this.clearTimer()}
          onScroll={event => {
            const { x: offsetX } = event.nativeEvent.contentOffset;
            this.setState(prev => ({
              ...prev,
              index: Math.floor(offsetX / SCREEN_WIDTH)
            }));
          }}
        >
          {data.map(({ uri }) => {
            return (
              <Image source={{ uri }} style={styles.container} key={uri} />
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation!.navigate("ImageModal", {
              index
            })
          }
          style={styles.button}
        >
          <Text style={{ color: "#262626" }}>Look Around</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Carousel as any);
