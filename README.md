# Videomatik Editor SDK

This module provides access to Videomatik's Editor to be able to make some
operations for videomatik through a video editor.

## Installation

```bash
npm install --save @videomatik/editor
```

# Clipper

## Usage

Considering you have the follow div on your HTML:

```html
<div id="video-clipper"></div>
```

You can create a video clipper using the following code:

```javascript
import { Clipper } from '@videomatik/editor'

const clipper = new Clipper('#video-clipper', {
  video: 'https://storage.videomatik.com.br/videomatik-sheet/a426c1ce128.mp4',
  clips: [
    {start: 10, end: 20, selected: true},
    {start: 40, end: 60, selected: false},
    {start: 80, end: 120, selected: true},
  ],
})
```

This will create a new video clipper using the preset video and clips in the timeline

## Events

You can listen to events and check when the editor's state was updated with the
following methods:

```javascript
clipper.on('ready', () => {
  console.log('The player was successfully mounted and finished loading')
})

clipper.on('change', ({ clips }) => {
  console.log('User has changed the clips to:', clips)
})
```

# Cropper

## Usage

Considering you have the follow div on your HTML:

```html
<div id="video-cropper"></div>
```

You can create a video cropper using the following code:

```javascript
import { Cropper } from '@videomatik/editor'

const cropper = new Cropper('#video-cropper', {
  video: 'https://storage.videomatik.com.br/videomatik-sheet/a426c1ce128.mp4',
  crops: [],
})
```

This will create a new video cropper using the preset video and clips in the timeline

## Events

You can listen to events and check when the editor's state was updated with the
following methods:

```javascript
cropper.on('ready', ({ crops }) => {
  console.log('The player was successfully mounted and finished loading, the default crops are:', crops)
})

cropper.on('change', ({ crops }) => {
  console.log('User has changed the crops to:', crops)
})
```

## Developing

To develop and test this library, you can run:

```bash
npm run dev
```

This will setup building, auto-rebuilding the library once you any code is changed

```bash
npm run server
```

This will run a server and display the project at: `http://localhost:8080/demos/`

If you wish to test the library, refer to the `index.html` page and change it
to what you want to test.

You can use `__editorURL` special parameter to change the intended editor
iframe URL to the one on your dev server

# Support

Please read the API documentation available on [Videomatik's website](https://videomatik.com.br) or contact the developers through our Discord server (invite link available at our website).
