/** @format */

export const checkCondition = (condition, rightVal, falseVal) => {
  if (condition) {
    return rightVal;
  }
  return falseVal || "";
};

export const convertTime = (time) => {
  if (!time) {
    return "";
  }
  time = time.toString();
  if (time.length === 4) {
    return `${time.substr(0, 2)}h${time.substr(2, 4)}`;
  }
  if (time.length === 3) {
    return `${time.substr(0, 1)}h${time.substr(1, 3)}`;
  }
  return "";
};

export const convertStrToTime = (time) => {
  if (!time) {
    return "";
  }
  time = time.toString();
  if (time.length === 4) {
    return `${time.substr(0, 2)}:${time.substr(2, 4)}`;
  }
  if (time.length === 3) {
    return `0${time.substr(0, 1)}:${time.substr(1, 3)}`;
  }
  return "";
};

export const justContainNumber = (value) => {
  const regex = /^[0-9]*$/;
  return value.match(regex);
};

export const getBirhDate = (date) => {
  const subDate = date?.toString()?.substr(0, 10);
  const dateField = subDate?.split("-");
  return [
    parseInt(dateField?.[0], 10).toString(),
    parseInt(dateField?.[1], 10).toString(),
    parseInt(dateField?.[2], 10).toString(),
  ];
};
