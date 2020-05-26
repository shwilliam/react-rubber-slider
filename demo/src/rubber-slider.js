import React, {useEffect} from 'react'
import {SliderInput, SliderTrack, SliderHandle} from '@reach/slider'
import * as d3 from 'd3'

export const RubberSlider = ({
  value = 0,
  onChange,
  width = 200,
  height = 100,
  id = 'rubber-slider',
}) => {
  const points = [
    [0, height / 2],
    [value * width, height / 2],
    [width, height / 2],
  ]

  const onDragEnd = () => {
    points[1][1] = height / 2
    update()
  }
  const draw = () => {
    const svg = d3
      .select(`#${id}-container`)
      .attr('viewBox', [0, 0, width, height])
      .call(
        d3.drag().subject(dragsubject).on('drag', dragged).on('end', onDragEnd),
      )

    svg
      .append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 3)
      .call(update)

    function dragsubject() {
      return d3.event.sourceEvent.target.__data__
    }

    function dragged() {
      d3.event.subject[0] = Math.max(0, Math.min(width, d3.event.x))
      d3.event.subject[1] = Math.max(0, Math.min(height, d3.event.y))
      update()
    }
  }
  function update() {
    const svg = d3.select('svg')
    svg
      .select('path')
      .attr('d', d3.line().curve(d3.curveCatmullRom))
      .attr('class', 'rubber-slider-track')

    const circle = svg.selectAll('g').data([points[1]], d => d)
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
      .merge(circle)
      .transition()
      .duration(500)
      .ease(d3.easeElastic)
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

