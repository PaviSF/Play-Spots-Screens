import { timestampToIST } from "./CalculateDate";

const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].item_name === target) {
      return true; // Return the index of the target if found
    }
  }
  return false;
};

const filterTimeArray = (timeArray, start_time, end_time) => {
  console.log(start_time);
  console.log(end_time);
  // Convert provided times to minutes since midnight
  const startMinutes =
    parseInt(start_time.substring(0, 2)) * 60 +
    parseInt(start_time.substring(3));
  const endMinutes =
    parseInt(end_time.substring(0, 2)) * 60 +
    parseInt(end_time.substring(3));

  const filteredTimes = [];

  for (const time of timeArray) {
    // Convert time to minutes since midnight
    const timeMinutes =
      parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3));

    if (timeMinutes >= startMinutes && timeMinutes <= endMinutes) {
      filteredTimes.push(time);
    }
  }
  console.log(filteredTimes);
  return filteredTimes;
};

const generateAvailabilityStatusArray = (
  timeArray,
  bookings,
  unavailability
) => {
  const availabilityStatusArray = [];

  if (!Array.isArray(bookings) || !Array.isArray(unavailability)) {
    // Handle the case where bookings or unavailability are not arrays
    return availabilityStatusArray;
  }

  for (const time of timeArray) {
    const bookingStatus = bookings.some((booking) => {
      
      return time >= timestampToIST(booking.start_time) && time < timestampToIST(booking.end_time);
    });

    const unavailabilityStatus = unavailability.some((unavail) => {
      console.log("hello"+timestampToIST(unavail.start_time))

      return time >= timestampToIST(unavail.start_time) && time < timestampToIST(unavail.end_time);
    });

    availabilityStatusArray.push({
      time,
      booking: bookingStatus,
      unavailable: unavailabilityStatus,
    });
  }

  return availabilityStatusArray;
};

export { linearSearch, filterTimeArray, generateAvailabilityStatusArray };
