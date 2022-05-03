import { keyCodesToRu, keyCodesToEn, letters } from './objects-and-arrays.js';

const container = document.createElement('div');
const name = document.createElement('h1');
const textarea = document.createElement('textarea');
const keyboard = document.createElement('div');
const description = document.createElement('p');
const keys = Object.keys(keyCodesToEn);
let capsLocker = false;
let shiftLocker = false;
let language = 'Ru';

const createBasestructure = () => {
  container.classList.add('container');
  document.body.append(container);

  name.classList.add('title');
  name.innerHTML = 'Virtual Keyboard';
  container.append(name);

  textarea.classList.add('textarea');
  container.append(textarea);

  keyboard.classList.add('keyboard');
  container.append(keyboard);

  description.classList.add('description');
  description.innerHTML = 'The keyboard was created in the windows operating system'
    + '<br>Keys to switch layout: left shift + left alt';
  container.append(description);
};

const addKeys = (target) => {
  keys.forEach((element) => {
    const key = document.createElement('div');
    key.classList.add(`${element}`, 'key');
    if (element === 'ArrowUp' || element === 'ArrowLeft'
      || element === 'ArrowDown' || element === 'ArrowRight'
      || element === 'ControlLeft' || element === 'ControlRight'
      || element === 'MetaLeft') {
      if (element === 'ArrowUp') key.innerHTML = '&#8593;';
      if (element === 'ArrowLeft') key.innerHTML = '&#8592;';
      if (element === 'ArrowDown') key.innerHTML = '&#8595;';
      if (element === 'ArrowRight') key.innerHTML = '&#8594;';
      if (element === 'ControlLeft' || element === 'ControlRight') key.innerHTML = 'Ctrl';
      if (element === 'MetaLeft') key.innerHTML = 'Win';
    } else {
      key.innerHTML = `${language === 'En' ? keyCodesToEn[element] : keyCodesToRu[element]}`;
    }

    target.append(key);
  });
};

const capsLockHandler = () => {
  const capsLock = document.querySelector('.CapsLock');
  letters.forEach((element) => {
    const handleElement = document.querySelector(`.${element}`);
    if (capsLock.classList.contains('active')) {
      handleElement.innerHTML = handleElement.innerHTML.toUpperCase();
    } else {
      handleElement.innerHTML = handleElement.innerHTML.toLowerCase();
    }
  });
};

const shiftHandler = () => {
  const shift = document.querySelector('.ShiftLeft');
  const alt = document.querySelector('.AltLeft');
  const symbol = document.querySelector('.KeyQ').innerHTML;
  const isLowerCase = symbol === symbol.toLowerCase();

  console.log(symbol);
  console.log(symbol.toLocaleLowerCase());
  console.log(isLowerCase);

  letters.forEach((element) => {
    const handleElement = document.querySelector(`.${element}`);
    if (shift.classList.contains('active') && isLowerCase && !alt.classList.contains('active')) {
      handleElement.innerHTML = handleElement.innerHTML.toUpperCase();
    } else if (shift.classList.contains('active') && !isLowerCase
      && !alt.classList.contains('active')) {
      handleElement.innerHTML = handleElement.innerHTML.toLowerCase();
    }
  });
};

const switchLanguages = () => {
  const condition = document.querySelector('.ShiftLeft').classList.contains('active')
    && document.querySelector('.AltLeft').classList.contains('active');
  if (condition) {
    if (language === 'En') language = 'Ru';
    else language = 'En';
  }
  keys.forEach((element) => {
    const key = document.querySelector(`.${element}`);
    if (element === 'ArrowUp' || element === 'ArrowLeft'
      || element === 'ArrowDown' || element === 'ArrowRight'
      || element === 'ControlLeft' || element === 'ControlRight'
      || element === 'MetaLeft') {
      if (element === 'ArrowUp') key.innerHTML = '&#8593;';
      if (element === 'ArrowLeft') key.innerHTML = '&#8592;';
      if (element === 'ArrowDown') key.innerHTML = '&#8595;';
      if (element === 'ArrowRight') key.innerHTML = '&#8594;';
      if (element === 'ControlLeft' || element === 'ControlRight') key.innerHTML = 'Ctrl';
      if (element === 'MetaLeft') key.innerHTML = 'Win';
    } else {
      key.innerHTML = `${language === 'En'
        ? keyCodesToEn[element] : keyCodesToRu[element]}`;
    }
    capsLockHandler();
  });
};

const mouseListener = (target) => {
  target.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('CapsLock')) {
      event.target.classList.toggle('active');
      capsLockHandler();
    } else {
      event.target.classList.add('active');
      shiftHandler();
    }
  });

  document.addEventListener('mouseup', () => {
    keys.forEach((element) => {
      if (element !== 'CapsLock') {
        document.querySelector(`.${element}`).classList.remove('active');
        shiftHandler();
      }
    });
  });
};

const keyboardListener = () => {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'CapsLock' && !capsLocker) {
      capsLocker = true;
      document.querySelector(`.${event.code}`).classList.toggle('active');
      capsLockHandler();
    } else if (event.code !== 'CapsLock') {
      if ((event.code === 'Tab'
        || event.code === 'AltLeft'
        || event.code === 'AltRight')) event.preventDefault();
      if (document.querySelector(`.${event.code}`)) {
        document.querySelector(`.${event.code}`).classList.add('active');
        if (!shiftLocker) {
          shiftLocker = true;
          shiftHandler();
        }
      }
    }
  });
  document.addEventListener('keyup', (event) => {
    const condition = document.querySelector('.ShiftLeft').classList.contains('active')
      && document.querySelector('.AltLeft').classList.contains('active');
    if (condition) switchLanguages();
    if (event.code === 'CapsLock') {
      capsLocker = false;
    } else if (document.querySelector(`.${event.code}`)) {
      if (shiftLocker) {
        shiftLocker = false;
        shiftHandler();
      }
      document.querySelector(`.${event.code}`).classList.remove('active');
    }
  });
};

const getLocalStorage = () => {
  if (localStorage.getItem('languge')) language = localStorage.getItem('languge');
  else language = 'Ru';
};

const setLocalStorage = () => {
  const setLanguage = () => {
    localStorage.setItem('languge', language);
  };
  window.addEventListener('beforeunload', setLanguage);
};

const init = () => {
  getLocalStorage();
  createBasestructure();
  addKeys(keyboard);
  mouseListener(keyboard);
  keyboardListener();
  setLocalStorage();
};

export default init;
