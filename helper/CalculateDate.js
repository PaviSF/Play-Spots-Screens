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
  // Create a new Date object and adjust for the IST time zone offset
  const date = new Date(timestamp * 1000 + 5.5 * 60 * 60 * 1000);

  // Get the individual components of the date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export { calculateDate, formatedDates, formatDate, timestampToIST };
