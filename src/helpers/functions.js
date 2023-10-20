export const addItemArray = (array, item) => {
  const newArray = copy(array);
  newArray.push(item);
  return newArray;
};

export const replacleItemArray = (array, item) => {
  const newArray = copy(array);
  const index = newArray.findIndex((x) => x._id === item._id);
  if (index >= 0) {
    newArray[index] = item;
  }
  return newArray;
};

export const copy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
