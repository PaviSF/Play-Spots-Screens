import { useRouter } from 'expo-router';
import {
    TextInput,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
  } from 'react-native';
  
  const primaryFontColor = '#3B3B3B';
  
  export default function Login() {
    const router = useRouter();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/initial/playspots.png')} style={styles.logo} />
          <Text style={styles.logoDesc}>Welcome to playspots</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            maxLength={10}
            keyboardType="number-pad"
            placeholderTextColor={'#3B3B3B'}
            style={styles.number}
            placeholder={'Your mobile number'}
          />
        </View>
        <View style={styles.bothButtonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign up with phone number</Text>
          </TouchableOpacity>
          <Text style={styles.or}>OR</Text>
          <TouchableOpacity style={styles.button} onPress={()=>router.push('(initial)/otp')}>
            <Image
              style={styles.googleIcon}
              source={require('../../assets/initial/google.png')}
            />
            <Text style={styles.buttonText}>Sign in with google</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      padding: 8,
    },
    logoContainer: {
      alignItems: 'center',
    },
    logo: {
      height: 110,
      width: 250,
      margin: 10,
    },
    logoDesc: { fontSize: 15, fontWeight: '500' },
    phoneContainer: {
      flexDirection: 'row',
      borderColor: '#CFCFCF',
      borderWidth: 1,
      borderRadius: 34,
      width: '75%',
      alignSelf: 'center',
      backgroundColor: '#ECECEC',
      marginVertical: 40,
    },
    countryCode: {
      padding: 10,
      fontSize: 14,
      fontWeight: '500',
    },
    number: {
      flex:1,
      color: primaryFontColor,
      fontWeight: '500',
    },
    bothButtonsContainer: {
      alignItems: 'center',
    },
    or: {
      fontSize: 10,
      fontWeight: '600',
      padding: 10,
      color: primaryFontColor,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#707070',
      borderWidth: 1,
      borderRadius: 34,
      width: '70%',
      padding: 10,
    },
    buttonText: {
      fontWeight: '500',
      color: primaryFontColor,
    },
    googleIcon: {
      marginRight: 5,
      height:20,
      width: 20
    },
  });
  