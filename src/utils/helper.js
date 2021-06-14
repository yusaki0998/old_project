/** @format */

export const checkCondition = (condition, rightVal, falseVal) => {
  if (condition) {
    return rightVal;
  }
  return falseVal || "";
};
