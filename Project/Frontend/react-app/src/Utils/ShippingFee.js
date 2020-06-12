export const GetShippingFee = (distance) => {
  if (distance < 0) {
    return -1;
  }
  if (distance <= 2) {
    return 0;
  }
  else if (distance > 2 && distance <= 5) {
    return (distance - 2) * 3000;
  }
  else if (distance > 5 && distance <= 10) {
    return 3 * 3000 + (distance - 5) * 5000;
  }
  else {
    return 3 * 3000 + 5 * 5000 + (distance - 10) * 10000;
  }
};