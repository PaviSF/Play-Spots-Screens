//React imports
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

//Expo imports
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";

//Internal imports
import { removeAfterSecondComma } from "@helper/StringManipulation";
import { linearSearch } from "@helper/DataSorting";
import { deviceWidth } from "@constants/Dimension";
import { Link, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setTurfDetails } from "@features/booking";
import { getFavourites, toggleFavourites } from "../../helper/FetchData";

const defaultImage =
  "https://5.imimg.com/data5/SELLER/Default/2022/12/GT/XH/CW/2451824/cricket-turf.jpg";

const CardView = ({ ratings, item }) => {
  const [like, setLike] = useState(false);
  const [favouritesData, setFavouritesData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Roboto: require("@assets/fonts/RobotoCondensed-Light.ttf"),
  });
  const completeImage =
    "https://d3th8mtd05b6hz.cloudfront.net/turf/" + item.images[0];

  function searchById(array, idToFind) {
    for (const item of array) {
      if (item._id === idToFind) {
        return true; // Found the id
      }
    }
    return false; // ID not found
  }

  const clickFavourite = async () => {
    setLike(!like);
    //const data = await toggleFavourites(item._id);
    let flag = true
    while(flag) {
      const data = await toggleFavourites(item._id);
      flag = data.message === "success" ? false : true;
    }
    //data.message === "success" ? setLike(!like) : null;
  }

  const sendToBookingPage = () => {
    const newItem = {
      turf_id: item._id,
      sport_id: item.sports,
      slot_id: item.slot_details,
      currency: item.turf_currency_symbol,
      turf_name: item.turf_name,
      turf_locality: item.location.locality,
      pay_at_venue: item.pay_at_venue,
      allow_half_hour: item.allow_half_hour,
      from_thirtieth_minute: item.from_thirtieth_minute,
      limit_round: item.limit_round,
    };

    // console.log(newItem);

    dispatch(setTurfDetails(newItem));
    router.push("/booking");
  };

  useEffect(() => {
    const prepare = async () => {
      const data = await getFavourites();
      searchById(data.favourites,item._id) && setLike(true)
      // console.log(data.favourites);
      setFavouritesData(data.favourites);
    };
    prepare();
  }, []);
  return (
    <View style={{ justifyContent: "center" }}>
      <View style={styles.cardContainer}>
        {/* Square Image with Curved Corners */}
        <TouchableOpacity
          style={styles.imageLayout}
          onPress={sendToBookingPage}
        >
          <Image
            source={{ uri: completeImage }}
            style={styles.image}
            defaultSource={require("@assets/247181.jpg")}
            resizeMode="cover" // Resize the image to cover the container
          />
        </TouchableOpacity>
        {/* <Link href={{ pathname: "/booking", params: newItem}} asChild>
        </Link> */}

        {/* Text container */}
        <View style={styles.textContainer}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 15,
                    fontFamily: "Roboto",
                    paddingBottom: 2,
                  }}
                >
                  {item.turf_name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "grey",
                      width: deviceWidth / 2,
                      fontSize: 12,
                      fontWeight: "500",
                      paddingBottom: 2,
                    }}
                  >
                    {removeAfterSecondComma(item.location.place)}
                  </Text>
                </View>

                {/* Different sports at a venue */}
                <View style={{ flexDirection: "row", paddingBottom: 2 }}>
                  {linearSearch(item.sports, "Cricket") ? (
                    <MaterialIcons
                      name="sports-cricket"
                      size={20}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Football") ? (
                    <Ionicons
                      name="football"
                      size={20}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Badminton") ? (
                    <MaterialCommunityIcons
                      name="badminton"
                      size={20}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Volleyball") ? (
                    <FontAwesome5
                      name="volleyball-ball"
                      size={17}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Tennis") ? (
                    <Ionicons
                      name="tennisball"
                      size={19}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Gym") ? (
                    <MaterialCommunityIcons
                      name="dumbbell"
                      size={20}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                </View>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 10 }}>Slots starting from</Text>
                <Text
                  style={{ fontSize: 13, color: "green", fontWeight: "700" }}
                >
                  {` Rs ${item.lowest_price}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Like And Rating Container */}
        <View style={styles.likeAndStarContainer}>
          <TouchableOpacity
            onPress={clickFavourite}
          >
            <AntDesign
              name={like ? "heart" : "hearto"}
              size={24}
              color="green"
              style={{ marginLeft: 20 }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <FontAwesome
              name={ratings > 0 ? "star" : "star-o"}
              size={20}
              color="#FFC400"
            />
            <FontAwesome
              name={ratings > 1 ? "star" : "star-o"}
              size={20}
              color="#FFC400"
            />
            <FontAwesome
              name={ratings > 2 ? "star" : "star-o"}
              size={20}
              color="#FFC400"
            />
            <FontAwesome
              name={ratings > 3 ? "star" : "star-o"}
              size={20}
              color="#FFC400"
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: "85%",
          alignSelf: "center",
          height: 0.5,
          backgroundColor: "black",
          marginBottom: 15,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 5,
    marginTop: 5,
  },
  imageContainer: {
    overflow: "hidden",
  },
  imageLayout: {
    flex: 0.3,
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  textContainer: {
    flex: 0.5,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  icon: {
    height: 30,
    width: 30,
    padding: 2,
  },
  likeAndStarContainer: {
    flex: 0.3,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default CardView;
