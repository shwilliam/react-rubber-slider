export interface IRubberSliderProps {
  id?: string
  name?: string
  className?: string
  value?: number
  onChange?: (value: number) => void
  width?: number
  height?: number
  max?: number
  min?: number
  step?: number
  easeFunction?: (normalizedTime: number) => number
  easeDuration?: number
  onDragStart?: (position: TSliderPos) => void
  onDrag?: (position: TSliderPos) => void
  onDragEnd?: (position: TSliderPos) => void
  style?: IStyleProp
}

export interface IStyleProp {
  [styleKey: string]: any
}

export type TSliderPos = [TSliderValue, TSliderHorizontalOffset]

export type TSliderValue = number

export type TSliderHorizontalOffset = number
