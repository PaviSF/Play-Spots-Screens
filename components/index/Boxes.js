import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const iconSize = 50;
const inactiveColor = { icon: "#717071", label: "black" };
const activeColor = { icon: "#FFFFFF", label: "#FFFFFF" };

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
              color={isChecked ? activeColor.icon : inactiveColor.icon}
            />
            <Text
              style={[
                styles.iconLabel,
                { color: isChecked ? activeColor.label : inactiveColor.label },
              ]}
            >
              Football
            </Text>
          </View>
        );
      case 1:
        return (
          <View>
            <MaterialCommunityIcons
              name="cricket"
              size={iconSize}
              color={isChecked ? activeColor.icon : inactiveColor.icon}
            />
            <Text
              style={[
                styles.iconLabel,
                { color: isChecked ? activeColor.label : inactiveColor.label },
              ]}
            >
              Cricket
            </Text>
          </View>
        );
      case 2:
        return (
          <View>
            <MaterialCommunityIcons
              name="dumbbell"
              size={iconSize}
              color={isChecked ? activeColor.icon : inactiveColor.icon}
            />
            <Text
              style={[
                styles.iconLabel,
                { color: isChecked ? activeColor.label : inactiveColor.label },
              ]}
            >
                Gym
            </Text>
          </View>
        );
      case 3:
        return (
          <View>
            <Ionicons
              name="tennisball"
              size={iconSize}
              color={isChecked ? activeColor.icon : inactiveColor.icon}
            />
            <Text
              style={[
                styles.iconLabel,
                { color: isChecked ? activeColor.label : inactiveColor.label },
              ]}
            >
              Tennis
            </Text>
          </View>
        );
      case 4:
        return (
          <View>
            <FontAwesome5
              name="volleyball-ball"
              size={iconSize}
              color={isChecked ? activeColor.icon : inactiveColor.icon}
            />
            <Text
              style={[
                styles.iconLabel,
                { color: isChecked ? activeColor.label : inactiveColor.label },
              ]}
            >
              Volleyball
            </Text>
          </View>
        );
      case 5:
        return (
          <View>
            <MaterialCommunityIcons
              name="badminton"
              size={iconSize}
              color={isChecked ? activeColor.icon : inactiveColor.icon}
            />
            <Text
              style={[
                styles.iconLabel,
                { color: isChecked ? activeColor.label : inactiveColor.label },
              ]}
            >
              Badminton
            </Text>
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
    backgroundColor: "#579565",
  },
  iconLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
});

export default BoxExample;
