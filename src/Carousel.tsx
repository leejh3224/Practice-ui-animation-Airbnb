import * as React from "react";
import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";

const CAROUSEL_HEIGHT = 300;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDESHOW_DURATION = 3000;

const images = [
  {
    uri: "https://s-ec.bstatic.com/images/hotel/max1024x768/561/56121629.jpg"
  },
  {
    uri: "https://q-xx.bstatic.com/images/hotel/max1024x768/107/107439149.jpg"
  },
  {
    uri:
      "https://ac-q.static.booking.cn/images/hotel/max1024x768/691/6910894.jpg"
  },
  {
    uri: "https://q-xx.bstatic.com/images/hotel/max1024x768/890/89074608.jpg"
  },
  {
    uri: "https://q-xx.bstatic.com/images/hotel/max1024x768/699/69903300.jpg"
  }
];

class Carousel extends React.Component {
  scrollView: any;
  scrollAnimationTimer: any;

  componentDidMount = () => {
    let scrollValue = 0;
    this.scrollAnimationTimer = setInterval(() => {
      scrollValue =
        (scrollValue + SCREEN_WIDTH) % (SCREEN_WIDTH * images.length);
      this.scrollView.scrollTo({ x: scrollValue });
    }, SLIDESHOW_DURATION);
  };

  componentWillUnmount = () => {
    clearInterval(this.scrollAnimationTimer);
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        width: SCREEN_WIDTH,
        height: CAROUSEL_HEIGHT
      }
    });

    return (
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        scrollEventThrottle={1}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        /** stops slideshow animation when touched */
        onTouchStart={() => clearInterval(this.scrollAnimationTimer)}
        onTouchEnd={() => {
          console.log("open detail view");
        }}
      >
        {images.map(image => (
          <Image source={image} style={styles.container} key={image.uri} />
        ))}
      </ScrollView>
    );
  }
}

export default Carousel;
