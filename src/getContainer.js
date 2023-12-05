const getContainer = (containerSelectorOrElement) => {
  if (typeof containerSelectorOrElement === 'string') {
    const container = document.querySelector(containerSelectorOrElement);
    if (!container) {
      throw new Error(`Container Selector: "${containerSelectorOrElement}" could not be found in the DOM`);
    }
    return container;
  }

  if (containerSelectorOrElement instanceof HTMLElement) {
    return containerSelectorOrElement;
  }

  throw new Error('Container must be a HTMLElement or a Selector string');
};

module.exports = getContainer;
