const removeAfterSecondComma = (inputString) => {
  const commaIndex1 = inputString.indexOf(",");
  const commaIndex2 = inputString.indexOf(",", commaIndex1 + 1);

  if (commaIndex2 !== -1) {
    return inputString.slice(0, commaIndex2);
  }

  // Return the original string if there are less than two commas
  return inputString;
};

export { removeAfterSecondComma };

