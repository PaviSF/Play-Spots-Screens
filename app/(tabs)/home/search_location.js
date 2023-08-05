import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React from "react";

const SearchLocation = () => {
  const onSearchError = React.useCallback((error) => {
    console.log(error);
  }, []);

  const onPlaceSelected = React.useCallback((place) => {
    console.log(place);
  }, []);
  return (
    <View style={{ justifyContent: "center", flex:1,}}>
      <GooglePlacesAutocomplete
        //apiKey={API_KEY}
        placeholder="search"
        debounce={400}
        styles={{container: {width: '90%',alignSelf:'center',marginTop: 30}}}

        //requestConfig={{ countries: ["US"] }}
        // onPlaceSelected={onPlaceSelected}
        // onSearchError={onSearchError}
      />
    </View>
  );
};

export default SearchLocation;

const styles = StyleSheet.create({});
