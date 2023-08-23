const calculateDate = () => {
  const currentDate = new Date();
  const nextFourDays = [];
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    const updatedDate = date.toLocaleDateString("en-US", options);
    nextFourDays.push(updatedDate);
  }
  console.log(nextFourDays);
  return nextFourDays;
};

const formatedDates = (dates) => {
  const dateObjects = [];

  dates.forEach((dateString) => {
    const parts = dateString.split(", ");
    const weekDay = parts[0].toUpperCase();
    const [month, date] = parts[1].split(" ");

    const yearStartIndex = dateString.lastIndexOf(" ") + 1;
    const year = dateString.substring(yearStartIndex);

    dateObjects.push({
      weekDay,
      month,
      date: parseInt(date),
      year: parseInt(year),
    });
  });

  console.log(dateObjects);
  return dateObjects;
};

const formatDate = (dateObj) => {
  const { year, month, date } = dateObj;

  // Create a map to convert month abbreviations to numeric values
  const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  // Add leading zero to date if needed
  const formattedDate = date < 10 ? `0${date}` : date.toString();

  // Use the month map to get the numeric month value
  const formattedMonth = monthMap[month];

  // Get the current day
  const today = new Date();
  const day = today.getDate();

  // Add leading zero to day if needed
  const formattedDay = day < 10 ? `0${day}` : day.toString();

  // Create the final formatted date string
  const formattedDateString = `${year}-${formattedMonth}-${formattedDate}`;

  return formattedDateString;
};

const timestampToIST = (timestamp) => {
  // Create a Date object from the timestamp (in milliseconds)
  const date = new Date(timestamp);

  // Define options for formatting the date and time
  const options = {
    timeZone: 'Asia/Kolkata', // Set the time zone to IST
    weekday: 'long', // Full weekday name (e.g., "Monday")
    year: 'numeric', // Full year (e.g., "2023")
    month: 'long', // Full month name (e.g., "August")
    day: 'numeric', // Day of the month (e.g., "22")
    hour: '2-digit', // Hours in 12-hour format (e.g., "01")
    minute: '2-digit', // Minutes (e.g., "30")
    second: '2-digit', // Seconds (e.g., "45")
    hour12: true, // Use 12-hour format (true) or 24-hour format (false)
  };

  // Format the date and time to IST
  const istDate = date.toLocaleString('en-IN', options);

  return istDate;
}



export { calculateDate, formatedDates, formatDate, timestampToIST };
