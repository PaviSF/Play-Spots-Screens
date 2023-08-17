import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DatePick from "../date-picker/DatePick";
import { calculateDate, formatedDates } from "../../helper/CalculateDate";
import { TouchableOpacity } from "react-native";

const DatePicker = () => {
  const dates = formatedDates(calculateDate());
  const [selectedOption, setSelectedOption] = useState(dates[0]);

  const checkActivity = (index) => {
    return (
      selectedOption.weekDay === dates[index].weekDay &&
      selectedOption.month === dates[index].month &&
      selectedOption.date === dates[index].date &&
      selectedOption.year === dates[index].year
    );
  };

  const selectDate = (index) => {
    setSelectedOption(dates[index]);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dateRow}>
        {dates.map((date, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => selectDate(index)}
            >
              <Text
                style={[
                  styles.month,
                  checkActivity(index) ? styles.active : styles.inactive,
                ]}
              >
                {date.month}
              </Text>
              <Text
                style={[
                  styles.date,
                  checkActivity(index) ? styles.active : styles.inactive,
                ]}
              >
                {date.date}
              </Text>
              <Text
                style={[
                  styles.weekDay,
                  checkActivity(index) ? styles.active : styles.inactive,
                ]}
              >
                {date.weekDay}
              </Text>
            </TouchableOpacity>
            {index < 4 && <View style={styles.dividingLine} />}
          </React.Fragment>
        ))}

        {/* <View style={styles.dateContainer}>
          <Text style={styles.month}>{dates[1].month}</Text>
          <Text style={styles.date}>{dates[1].date}</Text>
          <Text style={styles.weekDay}>{dates[1].weekDay}</Text>
        </View>
        <View style={styles.dividingLine} />
        <View style={styles.dateContainer}>
          <Text style={styles.month}>{dates[2].month}</Text>
          <Text style={styles.date}>{dates[2].date}</Text>
          <Text style={styles.weekDay}>{dates[2].weekDay}</Text>
        </View>
        <View style={styles.dividingLine} />
        <View style={styles.dateContainer}>
          <Text style={styles.month}>{dates[3].month}</Text>
          <Text style={styles.date}>{dates[3].date}</Text>
          <Text style={styles.weekDay}>{dates[3].weekDay}</Text>
        </View>
        <View style={styles.dividingLine} />
        <View style={styles.dateContainer}>
          <Text style={styles.month}>{dates[4].month}</Text>
          <Text style={styles.date}>{dates[4].date}</Text>
          <Text style={styles.weekDay}>{dates[4].weekDay}</Text>
        </View> */}
      </View>
      <View style={{ position: "absolute", right: 0, bottom: 15 }}>
        <DatePick />
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  mainContainer: {
    //backgroundColor:'white',
    alignSelf: "center",
    width: "90%",
    height: 75,
    flexDirection: "row",
  },
  dateRow: {
    flex: 0.85,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    justifyContent: "space-around",
  },
  dateContainer: { justifyContent: "center", alignItems: "center" },
  dividingLine: {
    width: 0.5,
    height: "80%",
    backgroundColor: "black",
    alignSelf: "center",
  },
  month: { fontSize: 12, fontWeight: "500" },
  weekDay: { fontSize: 10, fontWeight: "500" },
  date: { fontWeight: "500" },
  active: { color: "green" },
  inactive: { color: "black" },
});
