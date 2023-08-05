import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { deviceWidth } from "../../constants/Dimension";
import { removeAfterSecondComma } from "../../helper/StringManipulation";
const imageBaseLink = "https://d3th8mtd05b6hz.cloudfront.net/turf/";
const defaultImage =
  "https://assets.telegraphindia.com/telegraph/2021/Sep/1630669298_sky-turf.jpg";

export default function HorizontalTurfList({ data }) {
  const [imageErrors, setImageErrors] = useState(
    new Array(data.length).fill(false)
  );

  const handleImageError = (index) => {
    setImageErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <FlatList
      style={{ marginHorizontal: 10 }}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={200}
      renderItem={({ item,index }) => (
        <View style={styles.wholeCard}>
          <Image
            source={{
              uri: imageErrors[index] ? defaultImage : imageBaseLink + item.images[0],
            }}
            resizeMode="contain"
            style={styles.image}
            onError={handleImageError}
          />
          <View style={styles.textContainer}>
            <View style={styles.leftText}>
              <Text style={{ fontWeight: "500",fontSize:12 }}>{item.turf_name}</Text>
              <Text style={{ fontSize: 9 }}>{removeAfterSecondComma(item.location.place)}</Text>
            </View>
            <TouchableOpacity style={styles.rightButtom}>
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../../assets/book.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wholeCard: {
    flex: 1,
    margin: 4,
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 15,
    width: 190,
    height: 200,
  },
  image: { flex: 1, borderRadius: 15 },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  leftText: {width: deviceWidth /3.5},
  rightButtom: {},
});
