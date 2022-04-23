const BASE_64_CHARACTERS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-.~";

const generate4DigitRandomNumber = (): number => {
  const randomNumber = Math.random() * (1 - 999) + 1;

  return Math.floor(randomNumber);
};

const decimalToBase66 = (number: number) => {
  let digits = "";
  let finished = false;
  let currentQuotient = number;

  while (!finished) {
    digits += BASE_64_CHARACTERS[currentQuotient % 66];
    currentQuotient = Math.floor(currentQuotient / 66);

    if (currentQuotient === 0) {
      finished = true;
    }
  }

  return digits;
};

export const generateRandomBase66String = () => {
  const randomTsNumber = `${Date.now()}${generate4DigitRandomNumber()}`;

  return decimalToBase66(parseInt(randomTsNumber));
};
