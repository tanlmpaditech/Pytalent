const LENGTH_DIGITS = 107;
const MIN_DIGITS = 107;
const random = () => {
  return Math.ceil(Math.random() * LENGTH_DIGITS) % Math.ceil(Math.random() * MIN_DIGITS);
};

export default random;
