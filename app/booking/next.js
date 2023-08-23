import {
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StyleSheet,
  } from 'react-native';
  
  import { useState } from 'react';
  import { LinearGradient } from 'expo-linear-gradient';
  
  import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
  const iconSize = 20;
  const iconColor = '#008A3B';
  
  export default function App() {
    const [payAdvance, setPayAdvance] = useState(true);
    const router = useRouter();
    const advancePayment = () => {
      setPayAdvance(true);
    };
    const fullPayment = () => {
      setPayAdvance(false);
    };
    return (
      <SafeAreaView style={styles.container}>
        {/*Turf Image Banner*/}
        <View>
          <Image
            style={styles.bannerImage}
            source={require('../../assets/booking/banner.png')}
          />
          <Text style={styles.turfName}>Match Box The Stadium Turf</Text>
          <Text style={styles.turfLocation}>
            East Nadakkav Calicut Kerala India
          </Text>
        </View>
  
        {/*Turf Description*/}
        <View style={styles.turfDescriptionContainer}>
          <View style={styles.turfDesc}>
            <Ionicons name="football" size={iconSize} color={iconColor} />
            <Text style={styles.descText}>7*7 in Football</Text>
          </View>
          <View style={styles.turfDesc}>
            <Ionicons name="calendar" size={iconSize} color={iconColor} />
            <Text style={styles.descText}>05 Aug Sat</Text>
          </View>
          <View style={styles.turfDesc}>
            <AntDesign
              name="clockcircleo"
              size={iconSize - 3}
              color={iconColor}
            />
            <Text style={styles.descText}>12:00 pm - 1:00 pm</Text>
          </View>
        </View>
  
        {/*Toggle Switch*/}
        <View style={styles.toggleSwitchContainer}>
          <TouchableOpacity
            style={
              payAdvance ? styles.toggleSwitchActive : styles.toggleSwitchInactive
            }
            onPress={advancePayment}>
            <Text style={styles.toggleSwitchText}>Pay Advance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              payAdvance ? styles.toggleSwitchInactive : styles.toggleSwitchActive
            }
            onPress={fullPayment}>
            <Text style={styles.toggleSwitchText}>Pay Full Amount</Text>
          </TouchableOpacity>
        </View>
  
        {/*Coins and Couponds Container*/}
        <View style={styles.coinCouponContainer}>
          <View style={styles.playCoinsContainer}>
            <Text style={styles.playCoinsHeading}>Pay Using Play Coins</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                style={{ flex: 0.4, height: 100, width: 110 }}
                source={require('../../assets/booking/wallet.png')}
              />
              <View style={{ flex: 0.6 }}>
                <View
                  style={{
                    flex: 0.8,
                    paddingBottom:8,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight:'600',color:'#008A3B' }}>20</Text>
                  <Text style={{ fontSize: 11, fontWeight: '500' }}>
                    Available Balance
                  </Text>
                </View>
                <Text
                  style={{
                    flex:0.3,
                    fontSize: 9,
                    fontWeight: '500',
                    color: '#3FA56A',
                  }}>
                  Save extra ₹20 using 20 playcoins
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.couponContainer}>
            <TouchableOpacity style={styles.dashedContainer}>
              <Text style={styles.couponText}>APPLY COUPON</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.pricingContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceBlackText}>Slot Price:</Text>
            <Text style={styles.priceBlackText}>₹999</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceOrangeText}>Offer Discount:</Text>
            <Text style={styles.priceOrangeText}>₹0.00</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceBlackText}>Final Amount:</Text>
            <Text style={styles.priceBlackText}>₹999</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceOrangeText}>Playcoin Applied:</Text>
            <Text style={styles.priceOrangeText}>₹20</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.finalPriceText}>Payable at venue</Text>
            <Text style={styles.finalPriceText}>{payAdvance?`₹879.00`:`₹979.00`}</Text>
          </View>
        </View>
  
        <TouchableOpacity
          onPress={() => router.push('booking/booked')}
          style={styles.paymentButtonContainer}>
          <LinearGradient
            colors={['#609966', '#539165']}
            style={styles.paymentButton}
            start={[0, 0]}
            end={[1, 0]}>
            <Text style={styles.paymentButtonText}>Continue Payment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 15,
    },
    banner: {},
    bannerImage: { height: 150, width: '100%', borderRadius: 12 },
    turfName: { fontSize: 20, marginLeft: 5, fontWeight: '600' },
    turfLocation: {
      fontSize: 15,
      marginLeft: 5,
      fontWeight: '500',
      color: 'grey',
    },
    turfDescriptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 5,
      marginVertical: 10,
      backgroundColor: '#F6F6F6',
      borderRadius: 12,
    },
    turfDesc: { flexDirection: 'row', alignItems: 'center' },
    descText: {
      fontSize: 11,
      fontWeight: '500',
      color: '#3B3B3B',
      marginLeft: 2,
    },
    toggleSwitchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingVertical: 5,
      paddingHorizontal: 40,
    },
    toggleSwitchActive: {
      borderWidth: 1.5,
      borderRadius: 17,
      borderColor: '#008A3B',
      paddingVertical: 5,
      paddingHorizontal: 12,
    },
    toggleSwitchInactive: { paddingVertical: 5, paddingHorizontal: 12 },
    toggleSwitchText: { fontWeight: '500' },
    coinCouponContainer: {
      width: '100%',
      height: 140,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    playCoinsContainer: {
      flex: 0.49,
      backgroundColor: '#F3F3F3',
      borderRadius: 12,
      elevation: 3,
      padding: 10,
    },
    playCoinsHeading: {
      fontWeight: '700',
      color: '#008A3B',
    },
    pricingContainer: {
      backgroundColor: '#F6F6F6',
      borderRadius: 10,
      padding: 15,
      height: 166,
      width: '100%',
    },
    priceRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priceBlackText: { fontSize: 17, color: '#3B3B3B', padding: 2 },
    priceOrangeText: { fontSize: 17, color: '#FC8721', padding: 2 },
    finalPriceText: {
      fontSize: 17,
      fontWeight: '600',
      color: '#3B3B3B',
      padding: 2,
    },
    couponContainer: {
      flex: 0.49,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dashedContainer: { borderWidth: 1, borderStyle: 'dashed' },
    couponText: {
      paddingVertical: 10,
      paddingHorizontal: 4,
      fontSize: 14,
      fontWeight: '600',
      color: '#008A3B',
    },
    paymentButtonContainer: { width: '80%', alignSelf: 'center', padding: 20 },
    paymentButton: { borderRadius: 5, padding: 10 },
    paymentButtonText: { color: 'white', fontSize: 14, textAlign: 'center' },
  });
  