import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React from "react";

const SearchLocation = () => {
  return (
    <View style={{ justifyContent: "center", flex:1,}}>
      <GooglePlacesAutocomplete
        //apiKey={API_KEY}
        placeholder="search"
        debounce={400}
        styles={{container: {width: '90%',alignSelf:'center',marginTop: 30}}}
      />
    </View>
  );
};

export default SearchLocation;

const styles = StyleSheet.create({});
