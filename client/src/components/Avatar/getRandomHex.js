export function getRandomHexNumber() {
  const hexDigits = "0123456789ABCDEF";
  let hexNumber = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexDigits.length);
    hexNumber += hexDigits[randomIndex];
  }
  return hexNumber;
}

export function getRandomSkinToneHex() {
  const skinTones = [
    "#FCE0C7", "#F8D9C1", "#F5CBA7", // Light Skin Tones
    "#E0A984", "#D29B76", "#C48763", // Medium Skin Tones
    "#8C583C", "#774D3A", "#633D2E"  // Dark Skin Tones
  ];

  const randomIndex = Math.floor(Math.random() * skinTones.length);
  return skinTones[randomIndex];
}
