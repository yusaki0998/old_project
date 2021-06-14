/** @format */

export const convertGenderToVietnamese = (gender) => {
  if (gender === "male") return "Nam";
  if (gender === "female") return "Nữ";
  if (gender === "other") return "Khác";
  return "Khác";
};

export const convertRoleToVietnamese = (role) => {
  if (role === "manager") return "Quản lý";
  if (role === "staff") return "Nhân viên";
  return "Please choose";
};
