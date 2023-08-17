const removeAfterSecondComma = (inputString) => {
  const commaIndex1 = inputString.indexOf(",");
  const commaIndex2 = inputString.indexOf(",", commaIndex1 + 1);

  if (commaIndex2 !== -1) {
    return inputString.slice(0, commaIndex2);
  }

  // Return the original string if there are less than two commas
  return inputString;
};

const removeAfterFirstComma = (inputString) => {
  const parts = inputString.split(",");

  return parts[0];
};

const findMiddleWord = (inputString) => {
  const words = inputString.split(" ");

  if (words.length !== 3) {
    return "Invalid input, please provide a 3-worded string.";
  }

  return words[1];
};

const findFinalWord = (inputString) => {
  const words = inputString.split(" ");
  if (words[2].length === 1) {
    words[2] = "0" + words[2];
  }
  return words[2];
};

export {
  removeAfterSecondComma,
  removeAfterFirstComma,
  findMiddleWord,
  findFinalWord,
};
