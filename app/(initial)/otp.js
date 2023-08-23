import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const number = { phoneNumber: "+91 7306158986" };

export default function App() {
  const router = useRouter();
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
  const [otp, setOtp] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });

  const verify = () => {
    const finalOtp =
      otp.one + otp.two + otp.three + otp.four + otp.five + otp.six;
    console.log(finalOtp);
    router.push("(initial)/favourites");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Enter OTP</Text>
        <Text style={styles.headingDesc}>
          Enter the verification code to send to
        </Text>
        <Text style={styles.headingDesc}>{number.phoneNumber}</Text>
      </View>
      <View style={styles.otpContainer}>
        <TextInput
          keyboardType={"phone-pad"}
          maxLength={1}
          style={styles.otpBox}
          ref={firstInput}
          onChangeText={(text) => {
            text && secondInput.current.focus();
            setOtp({ ...otp, one: text });
          }}
        />
        <TextInput
          keyboardType={"phone-pad"}
          maxLength={1}
          style={styles.otpBox}
          ref={secondInput}
          onChangeText={(text) => {
            text ? thirdInput.current.focus() : firstInput.current.focus();
            setOtp({ ...otp, two: text });
          }}
        />
        <TextInput
          keyboardType={"phone-pad"}
          maxLength={1}
          style={styles.otpBox}
          ref={thirdInput}
          onChangeText={(text) => {
            text ? fourthInput.current.focus() : secondInput.current.focus();
            setOtp({ ...otp, three: text });
          }}
        />
        <TextInput
          keyboardType={"phone-pad"}
          maxLength={1}
          style={styles.otpBox}
          ref={fourthInput}
          onChangeText={(text) => {
            text ? fifthInput.current.focus() : thirdInput.current.focus();
            setOtp({ ...otp, four: text });
          }}
        />
        <TextInput
          keyboardType={"phone-pad"}
          maxLength={1}
          style={styles.otpBox}
          ref={fifthInput}
          onChangeText={(text) => {
            text ? sixthInput.current.focus() : fourthInput.current.focus();
            setOtp({ ...otp, five: text });
          }}
        />
        <TextInput
          keyboardType={"phone-pad"}
          maxLength={1}
          style={styles.otpBox}
          ref={sixthInput}
          onChangeText={(text) => {
            !text && fifthInput.current.focus();
            setOtp({ ...otp, six: text });
          }}
        />
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={verify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
      <View style={styles.bottomText}>
        <TouchableOpacity>
          <Text style={styles.resendCode}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.changeNumber}>Change Number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 40,
    justifyContent: "center",
  },
  textContainer: {},
  heading: { marginVertical: 10, fontSize: 18, fontWeight: "500" },
  headingDesc: { fontSize: 15, fontWeight: "500" },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    height: 60,
    width: 50,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    textAlign: "center",
    borderWidth: 0.3,
    borderColor: "#707070",
    marginVertical: 20,
  },
  verifyButton: {
    width: "80%",
    borderRadius: 20,
    backgroundColor: "#00BB59",
    alignSelf: "center",
    marginVertical: 15,
  },
  verifyText: {
    padding: 10,
    textAlign: "center",
    color: "#FFFFFF",
  },
  bottomText: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    justifyContent: "center",
  },
  resendCode: { fontSize: 12, color: "#474747", fontWeight: "500", padding: 2 },
  changeNumber: {
    fontSize: 12,
    color: "#777676",
    fontWeight: "500",
    padding: 2,
  },
});
