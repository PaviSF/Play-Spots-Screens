import { View, Text } from "react-native";
import React from "react";
import DatePick  from "../../components/date-picker/DatePick";
import CircularOrbit from "../../components/circular-orbit/CircularOrbit";


const Spot = () => {
  return (
    <View style={{flex:1}}>
      <CircularOrbit/>
    </View>
  );
};

export default Spot;
