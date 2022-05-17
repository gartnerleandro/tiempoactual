export function getWindDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export function getKmFromMts(mts) {
  return `${(mts / 1000).toFixed()}`;
}

export function getKmPerHours(mts) {
  return `${(mts * 3.6).toFixed()}`;
}
