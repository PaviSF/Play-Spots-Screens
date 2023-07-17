import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { deviceWidth } from "../../constants/Dimension";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  event,
} from "react-native-reanimated";

const CustomImageCarousal = ({ data }) => {
  const SIZE = deviceWidth * 0.65;
  const SPACER = (deviceWidth - SIZE) / 2;
  const [newData] = useState([
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ]);

  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      snapToInterval={SIZE}
      decelerationRate={"fast"}
      onScroll={onScroll}
      contentOffset={{ x: SIZE, y: 0 }} // Set the contentOffset to start at the second image
    >
      {newData.map((item, index) => {
        const style = useAnimatedStyle(() => {
          const scale = interpolate(
            x.value,
            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
            [0.7, 1.1, 0.7]
          )
          return{
            transform: [{scale}]
          }
        });
        if (!item.image) {
          return <View style={{ width: SPACER }} key={index} />;
        }
        return (
          <View style={{ width: SIZE, }} key={index}>
            <Animated.View style={[styles.imageContainer,style]}>
              <Image source={item.image} style={styles.image} />
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",

  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 19/9,
  },
});

export default CustomImageCarousal;
