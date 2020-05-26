import React, {useEffect} from 'react'
import {SliderInput, SliderTrack, SliderHandle} from '@reach/slider'
import * as d3 from 'd3' // TODO: import deps from d3 microlibraries

export const RubberSlider = ({
  value = 0,
  onChange = (value: number): void => {},
  width = 200,
  height = 100,
  id = 'rubber-slider',
  easing = d3.easeElastic,
}) => {
  const points = [
    [0, height / 2],
    [value * width, height / 2],
    [width, height / 2],
  ]

  const onDrag = () => {
    d3.event.subject[0] = Math.max(0, Math.min(width, d3.event.x))
    d3.event.subject[1] = Math.max(0, Math.min(height, d3.event.y))
    update()
  }
  const getDragTarget = () => d3.event.sourceEvent.target.__data__
  const onDragEnd = () => {
    points[1][1] = height / 2
    update()
  }
  const draw = () => {
    const svg = d3
      .select(`#${id}-container`)
      .attr('viewBox', `0, 0, ${width}, ${height}`)
      .call(
        d3
          .drag()
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
    const svg = d3.select('svg')
    svg
      .select('path')
      .transition()
      .duration(500)
      .ease(easing)
      .attr('d', d3.line().curve(d3.curveCatmullRom) as any)

    const circle = svg.selectAll('g').data([points[1]], d => d as string)
    onChange(points[1][0] / width)

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
      .duration(500)
      .ease(easing)
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
      min={0}
      max={1}
      step={0.01}
      className="rubber-slider-input"
    >
      <SliderTrack className="rubber-slider-pseudo-track">
        <svg id={`${id}-container`} className="rubber-slider" aria-hidden />
        <SliderHandle className="rubber-slider-pseudo-handle" />
      </SliderTrack>
    </SliderInput>
  )
}
