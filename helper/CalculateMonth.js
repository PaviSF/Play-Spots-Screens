function formatDate(dateString) {
  const dateParts = dateString.split("/");
  const day = dateParts[2];
  const month = dateParts[1];
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const formattedMonth = monthNames[parseInt(month, 10) - 1];
  const date = `${day} ${formattedMonth}`
  return  date;
}

export { formatDate };
