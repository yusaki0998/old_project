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
  return "Vui lòng chọn";
};

export const convertStatusToText = (status) => {
  if (status === "1") return "Phim đang chiếu";
  if (status === "0") return "Phim sắp chiếu";
  return "Vui lòng chọn";
};

export const convertSeatTypeToVietnamese = (seatType) => {
  if (seatType === "vip") return "VIP";
  if (seatType === "normal") return "Thường";
  return "Vui lòng chọn";
};
