import { keyProperties, unhandleElements } from './keyboard-objects.js';

const keys = Object.keys(keyProperties);
let language = 'En';
let capsLocker = false;
let shiftLocker = false;

const createBaseStructure = () => {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const description = document.createElement('p');
  container.classList.add('container');
  document.body.append(container);
  title.classList.add('title');
  title.innerHTML = 'Virtual Keyboard';
  container.append(title);
  textarea.classList.add('textarea');
  container.append(textarea);
  keyboard.classList.add('keyboard');
  container.append(keyboard);
  description.classList.add('description');
  description.innerHTML = 'The keyboard was created in the windows operating system'
    + '<br>Keys to switch layout: left ctrl + left alt';
  container.append(description);
};

const initKeys = (langIndex) => {
  const keyboard = document.querySelector('.keyboard');
  keys.forEach((element) => {
    const key = document.createElement('div');
    key.classList.add(`${element}`, 'key');
    key.innerHTML = `${keyProperties[element][langIndex]}`;
    keyboard.append(key);
  });
};

const switchSymbols = (langIndex) => {
  keys.forEach((element) => {
    const key = document.querySelector(`.${element}`);
    key.innerHTML = keyProperties[element][langIndex];
  });
};

const capsLockHandler = () => {
  const capsLock = document.querySelector('.CapsLock');

  keys.forEach((element) => {
    if (!unhandleElements.includes(element)) {
      const key = document.querySelector(`.${element}`);
      if (capsLock.classList.contains('active')) {
        key.innerHTML = key.innerHTML.toUpperCase();
      } else {
        key.innerHTML = key.innerHTML.toLowerCase();
      }
    }
  });
};

const shiftHandler = () => {
  const condition = document.querySelector('.ShiftLeft').classList.contains('active')
    || document.querySelector('.ShiftRight').classList.contains('active');
  const capsLock = document.querySelector('.CapsLock');

  const noneCapsLockToUpper = () => {
    keys.forEach((element) => {
      if (!unhandleElements.includes(element)) {
        const key = document.querySelector(`.${element}`);
        if (!capsLock.classList.contains('active')) {
          key.innerHTML = key.innerHTML.toUpperCase();
        }
      }
    });
  };

  const capsLockToUpper = () => {
    keys.forEach((element) => {
      if (!unhandleElements.includes(element)) {
        const key = document.querySelector(`.${element}`);
        if (capsLock.classList.contains('active')) {
          key.innerHTML = key.innerHTML.toUpperCase();
        }
      }
    });
  };

  if (condition && language === 'En') {
    switchSymbols(2);
    noneCapsLockToUpper();
  } else if (!condition && language === 'En') {
    switchSymbols(0);
    capsLockToUpper();
  } else if (condition && language === 'Ru') {
    switchSymbols(3);
    noneCapsLockToUpper();
  } else if (!condition && language === 'Ru') {
    switchSymbols(1);
    capsLockToUpper();
  }
};

const switchLanguages = () => {
  const condition = document.querySelector('.ControlLeft').classList.contains('active')
    && document.querySelector('.AltLeft').classList.contains('active');
  if (condition && language === 'En') {
    language = 'Ru';
    switchSymbols(1);
  } else if (condition && language === 'Ru') {
    language = 'En';
    switchSymbols(0);
  }
  capsLockHandler();
};

const mouseListener = () => {
  document.querySelector('.keyboard').addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('CapsLock')) {
      event.target.classList.toggle('active');
      capsLockHandler();
    } else if (event.target.classList.contains('ShiftLeft')
      || event.target.classList.contains('ShiftRight')) {
      event.target.classList.add('active');
      shiftHandler();
    } else {
      event.target.classList.add('active');
    }
  });
  document.addEventListener('mouseup', () => {
    if (document.querySelector('.ShiftLeft').classList.contains('active') && !shiftLocker) {
      document.querySelector('.ShiftLeft').classList.remove('active');
      shiftHandler();
    }
    if (document.querySelector('.ShiftRight').classList.contains('active') && !shiftLocker) {
      document.querySelector('.ShiftRight').classList.remove('active');
      shiftHandler();
    }
    keys.forEach((element) => {
      if (element !== 'CapsLock' && element !== 'ShiftRight' && element !== 'ShiftLeft') {
        document.querySelector(`.${element}`).classList.remove('active');
      }
    });
  });
};

const keyboardListener = () => {
  document.addEventListener('keydown', (event) => {
    if (document.querySelector(`.${event.code}`)) {
      if (event.code === 'CapsLock' && !capsLocker) {
        capsLocker = true;
        document.querySelector(`.${event.code}`).classList.toggle('active');
        capsLockHandler();
      } else if ((event.code === 'ShiftRight' || event.code === 'ShiftLeft') && !shiftLocker) {
        shiftLocker = true;
        document.querySelector(`.${event.code}`).classList.add('active');
        shiftHandler();
      } else {
        if ((event.code === 'Tab'
          || event.code === 'AltLeft'
          || event.code === 'AltRight')) {
          event.preventDefault();
        }
        document.querySelector(`.${event.code}`).classList.add('active');
      }
    }
  });
  document.addEventListener('keyup', (event) => {
    switchLanguages();
    if (document.querySelector(`.${event.code}`)) {
      if (event.code === 'CapsLock') {
        capsLocker = false;
      } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        shiftLocker = false;
        document.querySelector(`.${event.code}`).classList.remove('active');
        shiftHandler();
      } else {
        document.querySelector(`.${event.code}`).classList.remove('active');
      }
    }
  });
};

const getLocalStorage = () => {
  if (localStorage.getItem('languge')) language = localStorage.getItem('languge');
  else language = 'En';
};

const setLocalStorage = () => {
  const setLanguage = () => {
    localStorage.setItem('languge', language);
  };
  window.addEventListener('beforeunload', setLanguage);
};

const keyboardFunction = () => {
  getLocalStorage();
  createBaseStructure();
  initKeys(language === 'En' ? 0 : 1);
  mouseListener();
  keyboardListener();
  setLocalStorage();
};

export default keyboardFunction;
