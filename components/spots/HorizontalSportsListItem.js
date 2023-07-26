import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import React, { useState } from "react";

const _spacing = 5;

const _colors = {
  active: `grey`,
  inactive: `#FCD25900`,
};

const HorizontalSportsListItem = ({ item }) => {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity onPress={() => setSelected(!selected)} style={{}}>
      <View style={styles.category}>
        <Text
          style={{
            color: selected ? "black" : "#818080",
            fontWeight: "700",
            marginHorizontal: 15,
          }}
        >
          {item.sport}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    marginRight: _spacing ,
    padding: _spacing ,
    borderWidth: 1,
    borderColor: _colors.active,
    borderRadius: 8,
  },
});

export default HorizontalSportsListItem;
