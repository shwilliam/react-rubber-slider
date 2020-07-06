import {cleanup, fireEvent, render} from '@testing-library/react'
import React, {useState} from 'react'
import RubberSlider from '../index'

afterEach(cleanup)

describe('<RubberSlider />', () => {
  test('handles keyboard events', () => {
    const step = 1
    const min = 0
    const max = 100

    const {getByRole} = render(
      <StatefulRubberSlider step={step} min={min} max={max} />,
    )
    const handle = getByRole('slider')
    const initialValue = getCurrentValue(handle)

    fireEvent.click(handle)

    fireEvent.keyDown(handle, {key: 'ArrowRight', code: 39})
    fireEvent.keyDown(handle, {key: 'ArrowRight', code: 39})

    expect(getCurrentValue(handle)).toEqual(initialValue + step * 2)

    fireEvent.keyDown(handle, {key: 'ArrowLeft', code: 37})
    fireEvent.keyDown(handle, {key: 'ArrowLeft', code: 37})

    expect(getCurrentValue(handle)).toEqual(initialValue)

    fireEvent.keyDown(handle, {key: 'End', code: 35})
    expect(getCurrentValue(handle)).toEqual(max)

    fireEvent.keyDown(handle, {key: 'Home', code: 36})
    expect(getCurrentValue(handle)).toEqual(min)

    fireEvent.keyDown(handle, {key: 'Home', code: 36})
    expect(getCurrentValue(handle)).toEqual(min)

    fireEvent.keyDown(handle, {key: 'PageUp', code: 33})
    fireEvent.keyDown(handle, {key: 'PageUp', code: 33})
    expect(getCurrentValue(handle)).toEqual(min + 10 * step * 2)

    fireEvent.keyDown(handle, {key: 'PageDown', code: 34})
    expect(getCurrentValue(handle)).toEqual(min + 10 * step)
  })
})

const StatefulRubberSlider = ({initialValue = 0, ...props}) => {
  const [value, setValue] = useState(initialValue)
  return <RubberSlider value={value} onChange={setValue} {...props} />
}

const getCurrentValue = (el: HTMLElement) =>
  Number(el.getAttribute('aria-valuenow'))
