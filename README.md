# Videomatik Editor SDK

This module provides access to Videomatik's Editor to be able to make some
operations for videomatik through a video editor.

## Installation

```bash
npm install --save @videomatik/editor
```

## Usage (Clipper)

Considering you have the follow div on your HTML:

```html
<div id="video-clipper"></div>
```

You can create a video clipper using the following code:

```javascript
import { Clipper } from '@videomatik/editor'

const clipper = new VideomatikEditor('#video-clipper', {
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

# Support

Please read the API documentation available on [Videomatik's website](https://videomatik.com.br) or contact the developers through our Discord server (invite link available at our website).
