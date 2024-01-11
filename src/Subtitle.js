const EventEmitter = require('events');
const getContainer = require('./getContainer');

class VideomatikSubtitle {
  constructor(containerSelectorOrElement, options = {}) {
    const {
      __editorURL = 'https://editor.videomatik.com.br',
      video,
      subtitles,
    } = options;
    const container = getContainer(containerSelectorOrElement);
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.scrolling = 'yes';
    iframe.style.border = 'none';
    iframe.allowFullScreen = true;

    const urlParams = new URLSearchParams({
      video,
    });
    iframe.setAttribute('src', `${__editorURL}/subtitle/embed?${urlParams.toString()}`);

    container.appendChild(iframe);

    this.editorURL = new URL(__editorURL);
    this.iframe = iframe;
    this.video = video;
    this.subtitles = subtitles;

    this.eventEmitter = new EventEmitter();

    window.addEventListener('message', this.onMessage);
  }

  onMessage = (event) => {
    const { data } = event;
    if (event.origin !== this.editorURL.origin) {
      return;
    }

    // eslint-disable-next-line default-case
    switch (data.action) {
      case 'mounted':
        if (this.subtitles?.style) {
          // Preset Style
          this.iframe.contentWindow.postMessage({
            action: 'styles-set',
            payload: {
              style: this.subtitles.style,
            },
          }, '*');
        }

        if (!this.subtitles || !this.subtitles?.transcription.length) {
          // Auto Detect Transcription
          this.iframe.contentWindow.postMessage({
            action: 'subtitles-transcribe',
            payload: {},
          }, '*');
          return;
        }

        // Preset Subtitles
        this.iframe.contentWindow.postMessage({
          action: 'subtitles-set',
          payload: {
            transcription: this.subtitles.transcription,
          },
        }, '*');

        break;

      case 'ready':
        this.eventEmitter.emit('ready', data.payload);
        break;

      case 'subtitle-changed':
        this.eventEmitter.emit('change', data.payload);
        break;
    }
  };

  on = (eventName, callback) => {
    this.eventEmitter.on(eventName, callback);
  };

  off = (eventName, callback) => {
    this.eventEmitter.off(eventName, callback);
  };

  destroy() {
    window.removeEventListener('message', this.onMessage);
    this.iframe.remove();
  }
}
module.exports = VideomatikSubtitle;
