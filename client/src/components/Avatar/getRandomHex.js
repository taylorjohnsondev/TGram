export function getRandomHexNumber() {
  const hexDigits = "0123456789ABCDEF";
  let hexNumber = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexDigits.length);
    hexNumber += hexDigits[randomIndex];
  }
  return hexNumber;
}
