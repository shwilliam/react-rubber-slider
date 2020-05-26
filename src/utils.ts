import {event} from 'd3'

export const getNormalizedOffset = (value: number, max: number) =>
  value < max / 2 ? 1 - value / (max / 2) : (-1 * (value - max / 2)) / (max / 2)

export const getSteppedValue = (value: number, step: number) =>
  value - (value % step)

export const getEventCoords = (width: number, height: number) => [
  Math.max(0, Math.min(width, event.x)),
  Math.max(0, Math.min(height, event.y)),
]

export const getDragTarget = () => event.sourceEvent.target.__data__

export const getValueFromPos = (
  pos: number,
  posMax: number,
  min: number,
  max: number,
) => (pos / posMax) * (max - min) + min

export const getPosFromValue = (
  value: number,
  maxPos: number,
  min: number,
  max: number,
) => ((value - min) / (max - min)) * maxPos
