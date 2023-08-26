import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DatePick from "../date-picker/DatePick";
import {
  calculateDate,
  formatedDates,
  formatDate,
} from "../../helper/CalculateDate";
import { TouchableOpacity } from "react-native";
import { setDate } from "../../features/booking";
import { useDispatch } from "react-redux";
const DatePicker = () => {
  const dates = formatedDates(calculateDate());
  const [selectedOption, setSelectedOption] = useState(formatDate(dates[0]));
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setDate(selectedOption));
  },[]);

  const checkActivity = (index) => {
    return selectedOption === formatDate(dates[index]);
  };
  
  const selectDate = (index) => {
    setSelectedOption(formatDate(dates[index]));
    dispatch(setDate(formatDate(dates[index])))
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
