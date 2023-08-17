const calculateDate = () => {
  const currentDate = new Date();
  const nextFourDays = [];
  const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };

  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    const updatedDate = date.toLocaleDateString("en-US", options);
    nextFourDays.push(updatedDate);
  }
  console.log(nextFourDays)
  return nextFourDays;
};

const formatedDates = (dates) => {
  const dateObjects = [];
  
  dates.forEach(dateString => {
    const parts = dateString.split(', ');
    const weekDay = parts[0].toUpperCase();
    const [month, date] = parts[1].split(' ');
  
    const yearStartIndex = dateString.lastIndexOf(' ') + 1;
    const year = dateString.substring(yearStartIndex);
  
    dateObjects.push({
      weekDay,
      month,
      date: parseInt(date),
      year: parseInt(year)
    });
  });
  return dateObjects
  }

export { calculateDate, formatedDates };
