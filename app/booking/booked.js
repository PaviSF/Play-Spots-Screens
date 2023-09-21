import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@assets/booking/booked.png')}
        style={styles.imageStyle}
      />
      <Text style={styles.awesome}>Awesome!</Text>
      <Text style={styles.succesful}>Booking successful</Text>
      <Text style={styles.enjoy}>Enjoy our game & play safe</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 8,
  },
  imageStyle: { height: 170, width: 170 },
  awesome: {fontSize:25,padding:10,color:'#3E3E3E'},
  succesful: {fontSize:16,fontWeight:'500',color:'#45C9A5'},
  enjoy: {fontSize:14,color:'#3E3E3E',fontWeight:'500'}
});
