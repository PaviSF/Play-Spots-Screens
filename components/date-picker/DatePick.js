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
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { setNote } from "../../features/notes";
import { useDispatch } from "react-redux";

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
    dispatch(setNote(noteAndDate))
  },[noteAndDate]);

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
            <FontAwesome name="calendar-plus-o" size={28} color="black" />
          </TouchableOpacity>

          {/* Create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
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
                      backgroundColor: "#080516",
                      textHeaderColor: "#469ab6",
                      textDefaultColor: "#FFFFFF",
                      selectedTextColor: "#FFF",
                      mainColor: "#469ab6",
                      textSecondaryColor: "#FFFFFF",
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                  />
                ) : (
                  <TextInput
                    numberOfLines={5}
                    style={{ color: "white" }}
                    onChangeText={(note) => setNotes(note)}
                  />
                )}

                <TouchableOpacity
                  onPress={dateLayout ? handleOnPressNext : handleCloseModal}
                >
                  <Text style={{ color: "white" }}>
                    {dateLayout ? "Next" : "Done"}
                  </Text>
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
    backgroundColor: "#080516",
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
});

export default DatePick;
