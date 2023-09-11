import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { getCoins } from "../../helper/FetchData";
import { convertToDayMonthWeekDay } from "../../helper/CalculateDate";
import {
  findSlotDetailsById,
  findSportDetailsById,
} from "../../helper/DataSorting";
const iconSize = 20;
const iconColor = "#008A3B";

export default function FinalBooking() {
  const [payMethod, setPayMethod] = useState("at-venue");
  const { slotId, sportId } = useLocalSearchParams();
  //const [coins, setCoins] = useState(0);
  const [points, setPoints] = useState({
    coins: {
      beforeReduction: 0,
      afterReduction: 0,
    },
    min_bookable_percentage_notes: "",
    max_coins_limit: 0,
  });
  const [loading, setLoading] = useState(true);
  const [finalPrice, setFinalPrice] = useState({
    beforeCoins: 0,
    afterCoins: 0,
  });
  const [playCoinsApplied, setPlayCoinsApplied] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState({
    atVenue: 0,
    advance: 0,
  });
  const bookingData = useSelector((state) => state.booking.value);
  const slotDetails = findSlotDetailsById(
    slotId,
    bookingData.turf_details.slot_id
  );
  const sportDetails = findSportDetailsById(
    sportId,
    bookingData.turf_details.sport_id
  );
  const router = useRouter();
  const advancePayment = () => {
    const price = playCoinsApplied
      ? finalPrice.afterCoins
      : finalPrice.beforeCoins;
    const advance = calculateTheAdvance(price);
    setAdvanceAmount({
      atVenue: price - advance,
      advance,
    });
    setPayMethod("advance");
  };
  const fullPayment = () => {
    setPayMethod("full-amount");
  };

  const payAtVenue = () => {
    setPayMethod("at-venue");
  };

  const calculateTheAdvance = (price) => {
    return slotDetails.advance_payment === 2
      ? slotDetails.advance_payment_value
      : slotDetails.advance_payment === 1
      ? (slotDetails.advance_payment_value / 100) * price
      : 0;
  };

  const calculatePossibleCoinsApplicable = (
    priceWithoutCoins,
    availablePoints
  ) => {
    const maximumCoinsApplicable = priceWithoutCoins / 10;

    const possibleCoins = availablePoints - maximumCoinsApplicable;

    return possibleCoins > 0 ? maximumCoinsApplicable : availablePoints;
  };

  const clickCoins = () => {
    if (payMethod === "advance") {
      advancePayment();
    }
    setPlayCoinsApplied(!playCoinsApplied);
  };

  const renderSport = (sport) => {
    const sportSize = 24; // Change this size as needed
    const sportColor = "green"; // Change this color as needed

    if (sport.toLowerCase() === "football") {
      return (
        <Ionicons
          name="football"
          size={sportSize}
          color={sportColor}
          style={{ padding: 5 }}
        />
      );
    } else if (sport.toLowerCase() === "cricket") {
      return (
        <MaterialIcons
          name="sports-cricket"
          size={sportSize}
          color={sportColor}
          style={{ padding: 2 }}
        />
      );
    } else if (sport.toLowerCase() === "badminton") {
      return (
        <MaterialCommunityIcons
          name="badminton"
          size={sportSize}
          color={sportColor}
          style={{ padding: 2 }}
        />
      );
    } else if (sport.toLowerCase() === "gym") {
      return (
        <MaterialCommunityIcons
          name="dumbbell"
          size={sportSize}
          color={sportColor}
          style={{ padding: 2 }}
        />
      );
    } else if (sport.toLowerCase() === "tennis") {
      return (
        <Ionicons
          name="tennisball"
          size={sportSize}
          color={sportColor}
          style={{ padding: 2 }}
        />
      );
    } else if (sport.toLowerCase() === "volleyball") {
      return (
        <FontAwesome5
          name="volleyball-ball"
          size={sportSize - 5}
          color={sportColor}
          style={{ padding: 2 }}
        />
      );
    } else {
      return null; // Return null for unknown sports or handle it differently
    }
  };

  useEffect(() => {
    const fetchCoinsFromApi = async () => {
      const data = await getCoins();
      const alterData = {
        coin: { beforeReduction: data.points, afterReduction: 0 },
        min_bookable_percentage_notes: data.min_bookable_percentage_notes,
        max_coins_limit: data.max_coins_limit,
      };
      return alterData;
    };
    const fetchData = async () => {
      const priceWithoutCoins =
        bookingData.pricing.price - bookingData.pricing.offer;
      const availablePoints = await fetchCoinsFromApi(); // Wait for the data
      const allowedCoins = calculatePossibleCoinsApplicable(
        priceWithoutCoins,
        availablePoints.coin.beforeReduction
      );
      const finalData = {
        beforeCoins: priceWithoutCoins,
        afterCoins: priceWithoutCoins - allowedCoins,
      };
      const finalCoinsData = {
        ...availablePoints,
        coins: {
          ...availablePoints.coin,
          afterReduction: availablePoints.coin.beforeReduction - allowedCoins,
        },
      };
      setFinalPrice(finalData);
      setPoints(finalCoinsData);
      setLoading(false);
    };

    fetchData(); // Call the fetchData function
  }, []);


  // useEffect(() => {
  //   const allowedCoins = calculatePossibleCoinsApplicable();
  //   if (playCoinsApplied) {
  //     setFinalPrice(
  //       bookingData.pricing.price - bookingData.pricing.offer - allowedCoins
  //     );
  //     console.log(
  //       bookingData.pricing.price,
  //       bookingData.pricing.offer,
  //       allowedCoins
  //     );
  //   } else {
  //     setFinalPrice(bookingData.pricing.price - bookingData.pricing.offer);
  //   }
  // }, [playCoinsApplied]);

  return loading ? (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ActivityIndicator color={"green"} size={40} style={{ flex: 1 }} />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      {/*Turf Image Banner*/}
      <View>
        <Image
          style={styles.bannerImage}
          source={require("../../assets/booking/banner.png")}
        />
        <Text style={styles.turfName}>
          {bookingData.turf_details.turf_name}
        </Text>
        <Text style={styles.turfLocation}>
          {bookingData.turf_details.turf_locality}
        </Text>
      </View>

      {/*Turf Description*/}
      <View style={styles.turfDescriptionContainer}>
        <View style={styles.turfDesc}>
          {renderSport(sportDetails.item_name)}
          <Text
            style={styles.descText}
          >{`${slotDetails.slot_name} in ${sportDetails.item_name}`}</Text>
        </View>
        <View style={styles.turfDesc}>
          <Ionicons name="calendar" size={iconSize} color={iconColor} />
          <Text style={styles.descText}>
            {convertToDayMonthWeekDay(bookingData.date)}
          </Text>
        </View>
        <View style={styles.turfDesc}>
          <AntDesign
            name="clockcircleo"
            size={iconSize - 3}
            color={iconColor}
          />
          <Text
            style={styles.descText}
          >{`${bookingData.start_time} - ${bookingData.end_time}`}</Text>
        </View>
      </View>

      {/*Toggle Switch*/}
      <View style={styles.toggleSwitchContainer}>
        <TouchableOpacity
          style={
            payMethod === "advance"
              ? styles.toggleSwitchActive
              : styles.toggleSwitchInactive
          }
          onPress={advancePayment}
        >
          <Text style={styles.toggleSwitchText}>Pay Advance</Text>
        </TouchableOpacity>
        {bookingData.turf_details.only_advance_payment ? null : (
          <TouchableOpacity
            style={
              payMethod === "full-amount"
                ? styles.toggleSwitchActive
                : styles.toggleSwitchInactive
            }
            onPress={fullPayment}
          >
            <Text style={styles.toggleSwitchText}>Pay Full Amount</Text>
          </TouchableOpacity>
        )}
        {bookingData.turf_details.pay_at_venue &&
        !bookingData.turf_details.only_advance_payment ? (
          <TouchableOpacity
            style={
              payMethod === "at-venue"
                ? styles.toggleSwitchActive
                : styles.toggleSwitchInactive
            }
            onPress={payAtVenue}
          >
            <Text style={styles.toggleSwitchText}>Pay At Venue</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/*Coins and Coupons Container*/}
      <View style={styles.coinCouponContainer}>
        <View style={styles.playCoinsContainer}>
          <Text style={styles.playCoinsHeading}>Pay Using Play Coins</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={{ flex: 0.4, height: 100, width: 110 }}
              source={require("../../assets/booking/wallet.png")}
            />
            <View style={{ flex: 0.6 }}>
              <TouchableOpacity
                onPress={clickCoins}
                style={{
                  flex: 0.8,
                  paddingBottom: 8,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "#008A3B" }}
                >
                  {playCoinsApplied
                    ? points.coins.afterReduction
                    : points.coins.beforeReduction}
                </Text>
                <Text style={{ fontSize: 11, fontWeight: "500" }}>
                  Available Balance
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  flex: 0.3,
                  fontSize: 9,
                  fontWeight: "500",
                  color: "#3FA56A",
                }}
              >
                {points.min_bookable_percentage_notes}
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
          <Text
            style={styles.priceBlackText}
          >{`${bookingData.turf_details.currency}${bookingData.pricing.price}`}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceOrangeText}>Offer Discount:</Text>
          <Text
            style={styles.priceOrangeText}
          >{`${bookingData.turf_details.currency}${bookingData.pricing.offer}`}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceBlackText}>Final Amount:</Text>
          <Text style={styles.priceBlackText}>{`${
            bookingData.turf_details.currency
          }${bookingData.pricing.price - bookingData.pricing.offer}`}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceOrangeText}>Playcoin Applied:</Text>
          <Text style={styles.priceOrangeText}>{`${
            bookingData.turf_details.currency
          }${
            !playCoinsApplied
              ? 0
              : points.coins.beforeReduction - points.coins.afterReduction
          }`}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.finalPriceText}>Payable at venue</Text>
          <Text style={styles.finalPriceText}>
            {`${bookingData.turf_details.currency}${
              payMethod === "advance"
                ? advanceAmount.atVenue
                : playCoinsApplied
                ? finalPrice.afterCoins
                : finalPrice.beforeCoins
            }`}
          </Text>
          {console.log(playCoinsApplied)}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("booking/booked")}
        style={styles.paymentButtonContainer}
      >
        <LinearGradient
          colors={["#609966", "#539165"]}
          style={styles.paymentButton}
          start={[0, 0]}
          end={[1, 0]}
        >
          {payMethod === "advance" ? (
            <Text
              style={styles.paymentButtonText}
            >{`Pay ${bookingData.turf_details.currency}${advanceAmount.advance} Advance`}</Text>
          ) : null}
          {payMethod === "full-amount" ? (
            <Text style={styles.paymentButtonText}>Continue Payment</Text>
          ) : null}
          {payMethod === "at-venue" ? (
            <Text style={styles.paymentButtonText}>Confirm Booking</Text>
          ) : null}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
  },
  banner: {},
  bannerImage: { height: 150, width: "100%", borderRadius: 12 },
  turfName: { fontSize: 20, marginLeft: 5, fontWeight: "600" },
  turfLocation: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "500",
    color: "grey",
  },
  turfDescriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    marginVertical: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
  },
  turfDesc: { flexDirection: "row", alignItems: "center" },
  descText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#3B3B3B",
    marginLeft: 2,
  },
  toggleSwitchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 5,
  },
  toggleSwitchActive: {
    borderWidth: 1.5,
    borderRadius: 17,
    borderColor: "#008A3B",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  toggleSwitchInactive: { paddingVertical: 5, paddingHorizontal: 12 },
  toggleSwitchText: { fontWeight: "500" },
  coinCouponContainer: {
    width: "100%",
    height: 140,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  playCoinsContainer: {
    flex: 0.49,
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    elevation: 3,
    padding: 10,
  },
  playCoinsHeading: {
    fontWeight: "700",
    color: "#008A3B",
  },
  pricingContainer: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 15,
    height: 166,
    width: "100%",
  },
  priceRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceBlackText: { fontSize: 17, color: "#3B3B3B", padding: 2 },
  priceOrangeText: { fontSize: 17, color: "#FC8721", padding: 2 },
  finalPriceText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3B3B3B",
    padding: 2,
  },
  couponContainer: {
    flex: 0.49,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dashedContainer: { borderWidth: 1, borderStyle: "dashed" },
  couponText: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#008A3B",
  },
  paymentButtonContainer: { width: "80%", alignSelf: "center", padding: 20 },
  paymentButton: { borderRadius: 5, padding: 10 },
  paymentButtonText: { color: "white", fontSize: 14, textAlign: "center" },
});
