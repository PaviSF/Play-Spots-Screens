const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].item_name === target) {
      return true; // Return the index of the target if found
    }
  }
  return false;
};

export { linearSearch };
