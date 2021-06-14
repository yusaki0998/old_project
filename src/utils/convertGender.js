export const convertGenderToVietnamese = (gender) => {
  if (gender === "male") return "Nam";
  if (gender === "female") return "Nữ";
  if (gender === "other") return "Khác";
  return "Khác";
};
