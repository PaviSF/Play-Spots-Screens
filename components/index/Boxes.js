import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const iconSize = 50;
const iconInactiveColor = "#717071";
const iconActiveColor = "#FFFFFF";

const BoxExample = () => {
  const [checkboxes, setCheckboxes] = useState(Array(6).fill(false));

  const handleCheckboxClick = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxes(updatedCheckboxes);
  };

  const getIconName = (index, isChecked) => {
    switch (index) {
      case 0:
        return (
          <View>
            <Ionicons
              name="football"
              size={iconSize}
              color={isChecked ? iconActiveColor : iconInactiveColor}
            />
            <Text style={styles.iconLabel}>Football</Text>
          </View>
        );
      case 1:
        return (
          <View>
            <MaterialCommunityIcons
              name="cricket"
              size={iconSize}
              color={isChecked ? iconActiveColor : iconInactiveColor}
            />
            <Text style={styles.iconLabel}>Football</Text>
          </View>
        );
      case 2:
        return (
          <View>
            <MaterialCommunityIcons
              name="dumbbell"
              size={iconSize}
              color={isChecked ? iconActiveColor : iconInactiveColor}
            />
            <Text style={styles.iconLabel}>Football</Text>
          </View>
        );
      case 3:
        return (
          <View>
            <Ionicons
              name="tennisball"
              size={iconSize}
              color={isChecked ? iconActiveColor : iconInactiveColor}
            />
            <Text style={styles.iconLabel}>Football</Text>
          </View>
        );
      case 4:
        return (
          <View>
            <FontAwesome5
              name="volleyball-ball"
              size={iconSize}
              color={isChecked ? iconActiveColor : iconInactiveColor}
            />
            <Text style={styles.iconLabel}>Football</Text>
          </View>
        );
      case 5:
        return (
          <View> 
            <MaterialCommunityIcons
              name="badminton"
              size={iconSize}
              color={isChecked ? iconActiveColor : iconInactiveColor}
            />
            <Text style={styles.iconLabel}>Football</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {checkboxes.map((isChecked, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.box, isChecked && styles.boxSelected]}
          onPress={() => handleCheckboxClick(index)}
        >
          {getIconName(index, isChecked)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#f9f8f9",
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  boxSelected: {
    backgroundColor: "green",
  },
  iconLabel: {
    fontSize: 12,
  },
});

export default BoxExample;
