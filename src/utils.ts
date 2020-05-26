export const getNormalizedOffset = (value: number, max: number) =>
  value < max / 2 ? 1 - value / (max / 2) : (-1 * (value - max / 2)) / (max / 2)

export const getSteppedValue = (value: number, step: number) =>
  value - (value % step)
