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
  // Convert provided times to minutes since midnight
  const startMinutes =
    parseInt(start_time.substring(0, 2)) * 60 +
    parseInt(start_time.substring(3));
  const endMinutes =
    parseInt(end_time.substring(0, 2)) * 60 + parseInt(end_time.substring(3));

  const filteredTimes = [];

  for (const time of timeArray) {
    // Convert time to minutes since midnight
    const timeMinutes =
      parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3));

    if (timeMinutes >= startMinutes && timeMinutes <= endMinutes) {
      filteredTimes.push(time);
    }
  }
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
      return (
        time >= timestampToIST(booking.start_time) &&
        time < timestampToIST(booking.end_time)
      );
    });

    const unavailabilityStatus = unavailability.some((unavail) => {
      return (
        time >= timestampToIST(unavail.start_time) &&
        time < timestampToIST(unavail.end_time)
      );
    });

    availabilityStatusArray.push({
      time,
      booking: bookingStatus,
      unavailable: unavailabilityStatus,
    });
  }
  return availabilityStatusArray;
};

const markBookedTimes = (
  timeSlots,
  unfilteredBookings,
  unfilteredUnavailablity
) => {
  const bookings = unfilteredBookings.map((booking) => [
    Number(timestampToIST(booking.start_time).replace(":", "")),
    Number(timestampToIST(booking.end_time).replace(":", "")),
  ]);

  const unavailability = unfilteredUnavailablity.map((unavailable) => [
    Number(timestampToIST(unavailable.start_time).replace(":", "")),
    Number(timestampToIST(unavailable.end_time).replace(":", "")),
  ]);

  return timeSlots.map((unFilteredTime) => {
    const time = Number(unFilteredTime.replace(":", ""));
    const isBooked = bookings.some((booking) => {
      const [startTime, endTime] = booking;
      return time >= startTime && time < endTime;
    });

    const isUnavailable = unavailability.some((unvailable) => {
      const [startTime, endTime] = unvailable;
      return time >= startTime && time < endTime;
    });

    return {
      time: unFilteredTime,
      booking: isBooked,
      unavailable: isUnavailable,
    };
  });
};

const discardAfterUnavailableTimes = (
  timeSlots,
  unfilteredBookings,
  unfilteredUnavailablity
) => {
  const bookings = unfilteredBookings.map((booking) => [
    Number(timestampToIST(booking.start_time).replace(":", "")),
    Number(timestampToIST(booking.end_time).replace(":", "")),
  ]);

  const unavailability = unfilteredUnavailablity.map((unavailable) => [
    Number(timestampToIST(unavailable.start_time).replace(":", "")),
    Number(timestampToIST(unavailable.end_time).replace(":", "")),
  ]);

  return timeSlots.map((unFilteredTime) => {
    const time = Number(unFilteredTime.replace(":", ""));
    const isBooked = bookings.some((booking) => {
      const [startTime, endTime] = booking;
      return time > startTime && time <= endTime;
    });

    const isUnavailable = unavailability.some((unvailable) => {
      const [startTime, endTime] = unvailable;
      return time > startTime && time <= endTime;
    });

    return {
      time: unFilteredTime,
      booking: isBooked,
      unavailable: isUnavailable,
    };
  });
};

const timeAfterSelected = (timeArray, givenTime) => {
  const index = timeArray.indexOf(givenTime);

  // Check if the given time exists in the array
  if (index !== -1) {
    // Create a new array with elements after the given time
    return (newArray = timeArray.slice(index + 1));
  }
};

const findSlotDetailsById = (slotId, slotArray) => {
  const foundSlot = slotArray.find((slot) => slot.slot_id.$oid === slotId);
  return foundSlot || null;
};

const findSportDetailsById = (sportId, sportArray) => {
  const foundSport = sportArray.find((slot) => slot.item_id.$oid === sportId);
  return foundSport || null;
};

const startTimeArray = (timeArray, limit, thirtieth) => {
  let modifiedArray = [];
  for (let i = 0; i < timeArray.length; i++) {
    if ((limit && thirtieth) || (!limit && !thirtieth)) {
      modifiedArray.push(timeArray[i]);
    } else {
      if (
        (limit ? !timeArray[i].includes(":30") : false) ||
        (thirtieth ? timeArray[i].includes(":30") : false)
      ) {
        modifiedArray.push(timeArray[i]);
      } 
    }
  }
  return modifiedArray;
};

const endTimeArray = (timeArray, limit, thirtieth, allow_half, pickedTime) => {
  const modifiedEndArray = [];
  let newArray = [];
  const index = timeArray.indexOf(pickedTime);
  console.log(index)
  if (index !== -1) {
    newArray = timeArray.splice(index + 1);
    console.log(newArray)
  }
  for (let i = 0; i < newArray.length; i++) {
    if (
      ((limit ? !newArray[i].includes(":30") : true) ||
        (thirtieth ? newArray[i].includes(":30") : true)) &&
      (!allow_half
        ? newArray[i].includes(":30") === pickedTime.includes(":30")
        : true)
    ) {
      modifiedEndArray.push(newArray[i]);
    }
  }
  console.log(modifiedEndArray);
  return modifiedEndArray;
};

const alteringAccordingToMinimumBookingTime = (
  times,
  startTime,
  minBookableTime
) => {
  const bookableTimes = [];

  // Convert startTime to minutes since midnight
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const startMinutes = startHour * 60 + startMinute;

  for (const time of times) {
    const [hour, minute] = time.split(":").map(Number);
    const minutes = hour * 60 + minute;

    // Check if the time slot is within the bookable window
    if (minutes >= startMinutes && startMinutes + minBookableTime <= minutes) {
      bookableTimes.push(time);
    }
  }

  return bookableTimes;
};

export {
  linearSearch,
  filterTimeArray,
  generateAvailabilityStatusArray,
  markBookedTimes,
  alteringAccordingToMinimumBookingTime,
  discardAfterUnavailableTimes,
  timeAfterSelected,
  findSlotDetailsById,
  findSportDetailsById,
  startTimeArray,
  endTimeArray,
};
