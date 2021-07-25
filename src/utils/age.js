/** @format */

export const AGE_THRESHOLD = [
  {
    key: "P",
    label: "phim dành cho mọi lứa tuổi",
  },
  {
    key: "C13",
    label: "phim cấm trẻ em dưới 13 tuổi",
  },
  {
    key: "C16",
    label: "phim không dành cho người dưới 16 tuổi",
  },
  {
    key: "C18",
    label: "phim cấm khán giả dưới 18 tuổi",
  },
];

export const showAgeThreshold = (ageThr) => {
  const item = AGE_THRESHOLD.find((it) => it.key === ageThr);
  return item?.label;
};
