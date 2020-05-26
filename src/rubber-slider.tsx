import React, {useEffect} from 'react'
import {SliderHandle, SliderInput, SliderTrack} from '@reach/slider'
import {curveCatmullRom, drag, easeElastic, event, line, select} from 'd3'
import {getNormalizedOffset, getSteppedValue} from './utils'
import {IRubberSliderProps, TSliderPos} from './rubber-slider.d'

export const RubberSlider: React.FC<IRubberSliderProps> = ({
  id = 'rubber-slider',
  className = '',
  value = 0,
  onChange = (value: number): void => {},
  width = 200,
  height = 100,
  max = 100,
  min = 0,
  step = 1,
  easeFunction = easeElastic,
  easeDuration = 700,
  onDragStart = (pos: TSliderPos): void => {},
  onDrag = (pos: TSliderPos): void => {},
  onDragEnd = (pos: TSliderPos): void => {},
  style = {},
}) => {
  const points = [
    [0, height / 2],
    [((value - min) / (max - min)) * width, height / 2],
    [width, height / 2],
  ]

  const handleDrag = () => {
    const x = Math.max(0, Math.min(width, event.x))
    const y = Math.max(0, Math.min(height, event.y))
    const value = (points[1][0] / width) * (max - min) + min

    event.subject[0] = x
    event.subject[1] = y
    onDrag([getSteppedValue(value, step), getNormalizedOffset(y, height)])
    update()
  }
  const getDragTarget = () => event.sourceEvent.target.__data__
  const handleDragStart = () => {
    const y = Math.max(0, Math.min(height, event.y))
    const value = (points[1][0] / width) * (max - min) + min

    onDragStart([getSteppedValue(value, step), getNormalizedOffset(y, height)])
  }
  const handleDragEnd = () => {
    const y = Math.max(0, Math.min(height, event.y))
    const value = (points[1][0] / width) * (max - min) + min

    onDragEnd([getSteppedValue(value, step), getNormalizedOffset(y, height)])

    points[1][1] = height / 2
    update()
  }
  const draw = () => {
    const svg = select(`#${id}-container`)
      .attr('viewBox', `0, 0, ${width}, ${height}`)
      .call(
        drag()
          .subject(getDragTarget)
          .on('start', handleDragStart)
          .on('drag', handleDrag)
          .on('end', handleDragEnd) as any,
      )

    svg
      .append('path')
      .datum(points)
      .attr('class', 'rubber-slider-track')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 3)
      .call(update)
  }
  const update = () => {
    const svg = select('svg')
    svg
      .select('path')
      .transition()
      .duration(easeDuration)
      .ease(easeFunction)
      .attr('d', line().curve(curveCatmullRom) as any)

    const circle = svg.selectAll('g').data([points[1]], d => d as string)
    onChange(getSteppedValue((points[1][0] / width) * (max - min) + min, step))

    circle
      .enter()
      .append('g')
      .call(g => {
        g.append('circle')
          .attr('r', 20)
          .attr('stroke-width', 3)
          .attr('fill', 'none')
          .attr('class', 'rubber-slider-handle')
      })
      .merge(circle as any)
      .transition()
      .duration(easeDuration)
      .ease(easeFunction)
      .attr('transform', d => `translate(${d})`)
  }

  useEffect(() => {
    draw()
    update()
  }, [])

  return (
    <SliderInput
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className={`rubber-slider-input ${className}`}
      style={{...style, width}}
    >
      <SliderTrack className="rubber-slider-pseudo-track">
        <svg id={`${id}-container`} className="rubber-slider" aria-hidden />
        <SliderHandle className="rubber-slider-pseudo-handle" />
      </SliderTrack>
    </SliderInput>
  )
}
