# \<RubberSlider/\>

![Demo screengrab](https://user-images.githubusercontent.com/38357771/86651082-16ff8480-bf98-11ea-822a-74bf6323b8b7.gif)

## Installation

```shell
$ npm i @shwilliam/react-rubber-slider
$ npm i @reach/slider d3
```

## Usage

```jsx
import React, {useState} from 'react'
import RubberSlider from '@shwilliam/react-rubber-slider'
import '@shwilliam/react-rubber-slider/dist/styles.css'

export const App = () => {
  const [value, setValue] = useState(0.5)

  return <RubberSlider width={250} value={value} onChange={setValue} />
}
```

[![@shwilliam/react-rubber-slider demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gifted-shannon-qed9g?fontsize=14&hidenavigation=1&theme=dark)

## Component API

| Prop         | Type     | Required | Default         |
| ------------ | -------- | -------- | --------------- |
| name         | string   | false    | undefined       |
| id           | string   | false    | 'rubber-slider' |
| value        | number   | false    | 0               |
| onChange     | function | false    | no-op           |
| width        | number   | false    | 200             |
| height       | number   | false    | 100             |
| max          | number   | false    | 100             |
| min          | number   | false    | 0               |
| step         | number   | false    | 1               |
| easeFunction | function | false    | d3.easeElastic  |
| easeDuration | number   | false    | 700             |
| onDragStart  | function | false    | no-op           |
| onDrag       | function | false    | no-op           |
| onDragEnd    | function | false    | no-op           |

## Styling

Override the default slider styles by targeting the following:

```css
.rubber-slider {
}
.rubber-slider-input {
}
.rubber-slider-pseudo-track {
}
.rubber-slider-pseudo-handle {
}
```

## Development

To start local development, simply install npm dependencies (`npm i`) and run `npm run build:watch` to watch ts files in `src/`. Built files can be found in `dist/`.

## Testing

To run existing tests locally, run the command `npm t`, or `npm run test:watch` for watch mode.

## Demo

To run the demo, ensure you have run the build script and have a `dist` dir in your project root. Then run `npm run demo:setup` to copy these to the demo and `npm run demo` to start it locally.

## Contributing

This project is open to and encourages contributions! Feel free to discuss any bug fixes/features in the [issues](https://github.com/shwilliam/react-rubber-slider/issues). If you wish to work on this project:

1. Fork [this project](https://github.com/shwilliam/react-rubber-slider)
2. Create a branch (`git checkout -b new-branch`)
3. Commit your changes (`git commit -am 'add new feature'`)
4. Push to the branch (`git push origin new-branch`)
5. [Submit a pull request!](https://github.com/shwilliam/react-rubber-slider/pull/new/master)
