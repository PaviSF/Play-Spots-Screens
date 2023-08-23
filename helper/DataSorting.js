const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].item_name === target) {
      return true; // Return the index of the target if found
    }
  }
  return false;
};



const filterTimeArray = (timeArray, timing) => {
  // Convert provided times to minutes since midnight
  const startMinutes = parseInt(timing.start_time.substring(0, 2)) * 60 + parseInt(timing.start_time.substring(3));
  const endMinutes = parseInt(timing.end_time.substring(0, 2)) * 60 + parseInt(timing.end_time.substring(3));

  const filteredTimes = [];

  for (const time of timeArray) {
    // Convert time to minutes since midnight
    const timeMinutes = parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3));

    if (timeMinutes >= startMinutes && timeMinutes <= endMinutes) {
      filteredTimes.push(time);
    }
  }

  return filteredTimes;
}

const generateAvailabilityStatusArray = (timeArray, bookings, unavailability) => {
  const availabilityStatusArray = [];

  if (!Array.isArray(bookings) || !Array.isArray(unavailability)) {
    // Handle the case where bookings or unavailability are not arrays
    return availabilityStatusArray;
  }

  for (const time of timeArray) {
    const bookingStatus = bookings.some((booking) => {
      return time >= booking.start_time && time < booking.end_time;
    });

    const unavailabilityStatus = unavailability.some((unavail) => {
      return time >= unavail.start_time && time < unavail.end_time;
    });

    availabilityStatusArray.push({
      time,
      booking: bookingStatus,
      unavailable: unavailabilityStatus,
    });
  }

  return availabilityStatusArray;
};






export { linearSearch,filterTimeArray, generateAvailabilityStatusArray };
