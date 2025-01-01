import features from '../../../../feature-manager';
import { hasCode, isPublicRepo } from '../../../../helpers/get-repo-info';
import sleep from '../../../../helpers/sleep';
import elementReady from 'element-ready';
import $ from 'jquery';
import { getAnnotate } from './service';
import iconSvgPath from './icon-svg-path';
const featureId = features.getFeatureID(import.meta.url);
const addNoteButton = async (): Promise<void | false> => {
  const textareaElement = (await elementReady('#read-only-cursor-text-area')) as HTMLTextAreaElement;
  if (!textareaElement) {
    return false;
  }
  const hasNoteButton = await elementReady('span[aria-label="Auto code comment"]', { waitForChildren: false });
  if (hasNoteButton) {
    return false;
  }
  const rawButtonElement = await elementReady('span[aria-label="Download raw file"]', { waitForChildren: false });
  if (!rawButtonElement) {
    // if the selector failed to find the Insights tab
    return false;
  }
  const noteButton = rawButtonElement.cloneNode(true) as HTMLAnchorElement;
  noteButton.setAttribute('aria-label', 'Auto code comment');
  noteButton.setAttribute('id', featureId);
  const buttonElement = $('button', noteButton);
  if (!buttonElement) {
    return false;
  }
  await sleep(10);
  buttonElement.attr('style', 'border-radius: 6px !important;');
  buttonElement.attr('aria-label', featureId);
  buttonElement.attr('data-testid', featureId);
  buttonElement.removeAttr('data-hotkey');
  buttonElement.on('click', () => {
    getAnnotate();
  });
  const buttonSvgElement = buttonElement.find('svg');
  buttonSvgElement.attr('class', 'octicon octicon-note');
  buttonSvgElement.attr('viewBox', '0 0 1024 1024');
  buttonSvgElement.html(iconSvgPath);
  const buttonContainer = document.createElement('div');
  buttonContainer.appendChild(noteButton);
  buttonContainer.className = 'ButtonGroup-sc-1gxhls1-0 cpVEZe ';
  if (!rawButtonElement.parentElement) {
    return false;
  }
  rawButtonElement.parentElement.before(buttonContainer);
};

const init = async (): Promise<void> => {
  const selector = '#hypercrx-oss-gpt';
  await elementReady(selector);
  const isHave = $(selector).length > 0;
  if (!isHave) {
    return;
  }
  await addNoteButton();
};

const restore = async () => {};

function observeDomChanges() {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        init();
        break;
      }
    }
  });

  const boxElement = document.querySelector('.Box-sc-g0xbh4-0.gZWyZE');
  const mainElement = document.querySelector('main .Box-sc-g0xbh4-0.fywjmm');
  if (mainElement) {
    observer.observe(mainElement, { childList: true, subtree: true });
  }
  if (boxElement) {
    observer.observe(boxElement, { childList: true, subtree: true });
  }
}

features.add(featureId, {
  asLongAs: [hasCode, isPublicRepo],
  awaitDomReady: true,
  init: async () => {
    await init();
    observeDomChanges();
  },
  restore,
});
