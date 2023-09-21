import { useRouter } from "expo-router";
import {
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  BackHandler
} from "react-native";
// import auth from "@react-native-firebase/auth";
import { useState, useRef, useEffect } from "react";
import { sendOtp } from "@helper/FetchData";
import { notifyMessage } from "@helper/NotificationUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

const primaryFontColor = "#3B3B3B";

export default function Login() {
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
  // const storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("LOGGED-IN", value);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  const storeData = async (status) => {
    try {
      const value = {LOGGED_IN : status}
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('LOGGED_IN', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getInstallationId = async ()=>{
    try {
      const value = await AsyncStorage.getItem('ud_id');
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (e) {
      // error reading value
    }
  
  }

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // verification code (OTP - One-Time-Passcode)
  // const [code, setCode] = useState("");

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // setConfirm(confirmation);
    if (phoneNumber.length === 10) {
      const otp = await sendOtp(phoneNumber);
      console.log(otp);
      setConfirm(otp);
    } else {
      notifyMessage("Enter a valid phone number");
    }
    //router.push('favourites')
  }

  async function confirmCode() {
    try {
      const finalOtp =
        otp.one + otp.two + otp.three + otp.four + otp.five + otp.six;
      if (confirm.otp === parseInt(finalOtp)) {
        if (requestUserPermission()) {
          await storeData(true);
          messaging()
            .getToken()
            .then((token) => console.log(token));
          router.push("(initial)/favourites");
        }
      }
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  const verify = () => {
    const finalOtp =
      otp.one + otp.two + otp.three + otp.four + otp.five + otp.six;
  };

  if (!confirm) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@assets/initial/playspots.png")}
            style={styles.logo}
          />
          <Text style={styles.logoDesc}>Welcome to playspots</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            maxLength={10}
            keyboardType="number-pad"
            placeholderTextColor={"#3B3B3B"}
            style={styles.number}
            onChangeText={setPhoneNumber}
            placeholder={"Your mobile number"}
          />
        </View>
        <View style={styles.bothButtonsContainer}>
          <TouchableOpacity style={styles.button} onPress={getInstallationId}>
            <Text style={styles.buttonText}>Sign up with phone number</Text>
          </TouchableOpacity>
          <Text style={styles.or}>OR</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => signInWithPhoneNumber(phoneNumber)}
          >
            <Image
              style={styles.googleIcon}
              source={require("@assets/initial/google.png")}
            />
            <Text style={styles.buttonText}>Sign in with google</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.container, { padding: 40 }]}>
      <View>
        <Text style={styles.heading}>Enter OTP</Text>
        <Text style={styles.headingDesc}>
          Enter the verification code to send to
        </Text>
        <Text style={styles.headingDesc}>+91 7306158986</Text>
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
      <TouchableOpacity style={styles.verifyButton} onPress={confirmCode}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
      <View style={styles.bottomText}>
        <TouchableOpacity>
          <Text style={styles.resendCode}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setConfirm(null)}>
          <Text style={styles.changeNumber}>Change Number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 8,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 110,
    width: 250,
    margin: 10,
  },
  logoDesc: { fontSize: 15, fontWeight: "500" },
  phoneContainer: {
    flexDirection: "row",
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderRadius: 34,
    width: "75%",
    alignSelf: "center",
    backgroundColor: "#ECECEC",
    marginVertical: 40,
  },
  countryCode: {
    padding: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  number: {
    flex: 1,
    color: primaryFontColor,
    fontWeight: "500",
  },
  bothButtonsContainer: {
    alignItems: "center",
  },
  or: {
    fontSize: 10,
    fontWeight: "600",
    padding: 10,
    color: primaryFontColor,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 34,
    width: "70%",
    padding: 10,
  },
  buttonText: {
    fontWeight: "500",
    color: primaryFontColor,
  },
  googleIcon: {
    marginRight: 5,
    height: 20,
    width: 20,
  },
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
