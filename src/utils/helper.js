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

export const dayInWeeks = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ Nhật",
];

export const getCurrentWeekNum = () => {
  const currentdate = new Date();
  const dates = [];
  const currentDay = currentdate.getDay();
  if (currentDay === 0) {
    dates.push(currentdate);
    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentdate.getDate() + i);
      dates.push(nextDate);
    }
  } else {
    for (let i = currentDay; i > 1; i--) {
      const prevDate = new Date();
      prevDate.setDate(currentdate.getDate() - i + 1);
      dates.push(prevDate);
    }
    dates.push(currentdate);
    for (let i = 1; i <= 7 - currentDay; i++) {
      const prevDate = new Date();
      prevDate.setDate(currentdate.getDate() + i);
      dates.push(prevDate);
    }
  }

  const oneJan = new Date(currentdate.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (currentdate - oneJan) / (24 * 60 * 60 * 1000)
  );
  const currentWeekNum =
    Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7) - 1;
  return {
    currentWeekNum,
    dates,
  };
};

export const parseCategories = (allCategories) => {
  const categories = [];
  allCategories.forEach((cate) => {
    if (!categories.includes(cate)) {
      categories.push(cate);
    }
  });
  return categories;
};
