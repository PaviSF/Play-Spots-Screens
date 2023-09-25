import React, { useEffect, useState } from "react";
import { View, Text, FlatList,ActivityIndicator } from "react-native";
import { getFavourites } from "@helper/FetchData";

const Booking = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      const data = await getFavourites();
      setFavourites(data.favourites);
      setLoading(false); // Set loading to false when data is fetched
    };
    prepare();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={favourites}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.turf_name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
};

export default Booking;
