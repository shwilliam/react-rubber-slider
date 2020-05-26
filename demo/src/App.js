import React, {useState} from 'react'

import RubberSlider from './react-rubber-slider'
import './react-rubber-slider/styles.css'

export const App = () => {
  const [value, setValue] = useState(0.5)

  return (
    <div className="app">
      <h1 className="title">rubber-slider</h1>
      <RubberSlider width={250} value={value} onChange={setValue} />
      <p className="rating-value">{(value * 100).toFixed(0)}</p>
    </div>
  )
}
