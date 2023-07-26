import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { setNote } from "../../features/notes";
import { useDispatch } from "react-redux";
import { deviceWidth } from "../../constants/Dimension";

const DatePick = () => {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [dateLayout, setDateLayout] = useState(true);
  const [notes, setNotes] = useState("");
  const [noteAndDate, setNoteAndDate] = useState({ note: [], date: [] });
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNote(noteAndDate));
  }, [noteAndDate]);


  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleOnPressNext = () => {
    setDateLayout(!dateLayout);
  };

  const setToSendNote = () => {
    const updatedState = {
      ...noteAndDate,
      note: [...noteAndDate.note, notes],
      date: [...noteAndDate.date, selectedStartDate],
    };
    setNoteAndDate(updatedState);
  };

  const handleCloseModal = () => {
    handleOnPressNext();
    handleOnPressStartDate();
    console.log(selectedStartDate);
    //dispatch(setNote(noteAndDate))
    setToSendNote();
  };
  return (
    <SafeAreaView style={{}}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
        <View>
          <TouchableOpacity onPress={handleOnPressStartDate}>
            <FontAwesome name="calendar-plus-o" size={28} color="#02b44f" />
          </TouchableOpacity>

          {/* Create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
            onRequestClose={handleOnPressStartDate}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {dateLayout ? (
                  <DatePicker
                    mode="calendar"
                    minimumDate={startDate}
                    selected={startedDate}
                    onDateChanged={handleChangeStartDate}
                    onSelectedChange={(date) => setSelectedStartDate(date)}
                    options={{
                      backgroundColor: "#3C6255",
                      textHeaderColor: "#AEEEB4",
                      textDefaultColor: "#FFFFFF",
                      selectedTextColor: "#FFF",
                      mainColor: "#AEEEB4",
                      textSecondaryColor: "#FFFFFF",
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                  />
                ) : (
                  <View style={styles.notesContainer}>
                    <TextInput
                      placeholder="Add your reminder"
                      placeholderTextColor={"#cbdccb"}
                      numberOfLines={3}
                      style={styles.notes}
                      onChangeText={(note) => setNotes(note)}
                    />
                  </View>
                )}

                <TouchableOpacity
                  onPress={dateLayout ? handleOnPressNext : handleCloseModal}
                >
                  {dateLayout ? (
                    <MaterialIcons
                      name="navigate-next"
                      size={30}
                      color="white"
                    />
                  ) : (
                    <Ionicons
                      name="checkmark-done-circle-sharp"
                      size={30}
                      color="white"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#3C6255",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  notesContainer: {
    borderRadius: 5,
    borderWidth: 2,
    width: deviceWidth / 1.3,
    borderColor: "white",
    margin: 20,

  },
  notes: {
    color: "white",
    paddingHorizontal: 10
  },
});

export default DatePick;
