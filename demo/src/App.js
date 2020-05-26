import React, {useState} from 'react'

import RubberSlider from './react-rubber-slider'
import './react-rubber-slider/styles.css'

export const App = () => {
  const [value, setValue] = useState(50)

  return (
    <div className="app">
      <h1 className="title">rubber-slider</h1>
      <RubberSlider
        width={250}
        value={value}
        onChange={setValue}
        min={1}
        max={100}
        onDragStart={(...args) => console.log('drag start', args)}
        onDrag={(...args) => console.log('drag', args)}
        onDragEnd={(...args) => console.log('drag end', args)}
      />
      <p className="rating-value">{value}</p>
    </div>
  )
}
