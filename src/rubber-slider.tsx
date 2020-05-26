import React, {useEffect} from 'react'
import {SliderInput, SliderTrack, SliderHandle} from '@reach/slider'
import {easeElastic, event, select, line, curveCatmullRom, drag} from 'd3'

export const RubberSlider = ({
  id = 'rubber-slider',
  value = 0,
  onChange = (value: number): void => {},
  width = 200,
  height = 100,
  easeFunction = easeElastic,
  easeDuration = 700,
  max = 100,
  min = 0,
  step = 1,
}) => {
  const points = [
    [0, height / 2],
    [((value - min) / (max - min)) * width, height / 2],
    [width, height / 2],
  ]

  const onDrag = () => {
    event.subject[0] = Math.max(0, Math.min(width, event.x))
    event.subject[1] = Math.max(0, Math.min(height, event.y))
    update()
  }
  const getDragTarget = () => event.sourceEvent.target.__data__
  const onDragEnd = () => {
    points[1][1] = height / 2
    update()
  }
  const draw = () => {
    const svg = select(`#${id}-container`)
      .attr('viewBox', `0, 0, ${width}, ${height}`)
      .call(
        drag()
          .subject(getDragTarget)
          .on('drag', onDrag)
          .on('end', onDragEnd) as any,
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
    // TODO: respect step size
    onChange((points[1][0] / width) * (max - min) + min)

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
      style={{width}}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className="rubber-slider-input"
    >
      <SliderTrack className="rubber-slider-pseudo-track">
        <svg id={`${id}-container`} className="rubber-slider" aria-hidden />
        <SliderHandle className="rubber-slider-pseudo-handle" />
      </SliderTrack>
    </SliderInput>
  )
}
