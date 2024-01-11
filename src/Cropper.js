const EventEmitter = require('events');
const getContainer = require('./getContainer');

class VideomatikCropper {
  constructor(containerSelectorOrElement, options = {}) {
    const {
      __editorURL = 'https://editor.videomatik.com.br',
      video,
      crops,
      aspectRatio,
    } = options;
    const container = getContainer(containerSelectorOrElement);
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.scrolling = 'no';
    iframe.style.border = 'none';
    iframe.allowFullScreen = true;

    const urlParams = new URLSearchParams({
      video,
      aspectRatio,
    });
    iframe.setAttribute('src', `${__editorURL}/cropper/embed?${urlParams.toString()}`);

    container.appendChild(iframe);

    this.editorURL = new URL(__editorURL);
    this.iframe = iframe;
    this.video = video;
    this.crops = crops;
    this.aspectRatio = aspectRatio;

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
        if (!this.crops || !this.crops?.length) {
          // Auto Detect Crops
          this.iframe.contentWindow.postMessage({
            action: 'crops-detect',
            payload: {},
          }, '*');
          return;
        }

        // Preset Crops
        this.iframe.contentWindow.postMessage({
          action: 'crops-set',
          payload: {
            crops: this.crops,
          },
        }, '*');
        break;

      case 'ready':
        this.eventEmitter.emit('ready', data.payload);
        break;

      case 'crop-changed':
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
module.exports = VideomatikCropper;
