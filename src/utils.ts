export const getNormalizedOffset = (value: number, max: number) =>
  value < max / 2 ? 1 - value / (max / 2) : (-1 * (value - max / 2)) / (max / 2)
