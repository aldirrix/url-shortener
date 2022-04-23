const BASE_66_CHARACTERS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-.~";
const MAX_7_DIGIT_IN_BASE_64_BASE_10_NUMBER = 5455160701055; // equals ~~~~~~~ in our custom base 66

const generateRandomInteger = (max = Number.MAX_SAFE_INTEGER) => {
  const randomNumber = Math.random() * max;

  return Math.floor(randomNumber);
};

const decimalToBase66 = (number: number) => {
  let digits = "";
  let currentQuotient = number;

  do {
    digits += BASE_66_CHARACTERS[currentQuotient % 66];
    currentQuotient = Math.floor(currentQuotient / 66);
  } while (currentQuotient !== 0);

  return digits;
};

export const generateRandomBase66String = () => {
  const randomNumber = generateRandomInteger(
    MAX_7_DIGIT_IN_BASE_64_BASE_10_NUMBER
  );

  return decimalToBase66(randomNumber);
};
