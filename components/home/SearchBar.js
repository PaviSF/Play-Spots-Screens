import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { setFilteredData } from "../../features/booking";

const SearchBar = ({ data }) => {
  const [searchText, setSearchText] = useState("");
 // const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const fetchData = async (value) => {
    const result = await data.filter((turf) => {
      return (
        value &&
        turf.turf_name &&
        turf.turf_name.toLowerCase().includes(value.toLowerCase())
      );
    });
    dispatch(setFilteredData(result))
    console.log(result);
    //setFilteredData(result);
  };

  const handleChange = (text) => {
    setSearchText(text);
    console.log(text)
    fetchData(text);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search venues, events, sports"
        placeholderTextColor={"#707170"}
        onChangeText={(text) => handleChange(text)}
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  searchContainer: {
    position: "relative", // This container will hold both searchBar and searchResults
  },
  searchBar: {
    padding: 8,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    color: "black",
    margin: 20,
  },
  searchResults: {
    position: "absolute",
    top: 66,
    zIndex: 999,
    backgroundColor: "white", // Add a background color to make it more visible
  },
});
