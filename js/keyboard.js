import { keyProperties, unhandleElements } from './keyboard-objects.js';

const keys = Object.keys(keyProperties);
let language = 'En';
let capsLocker = false;
// let shiftLocker = false;

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
    } else {
      event.target.classList.add('active');
    }
  });
  document.addEventListener('mouseup', () => {
    keys.forEach((element) => {
      if (element !== 'CapsLock') document.querySelector(`.${element}`).classList.remove('active');
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

// const shiftHandler = () => {
//   const shiftLeft = document.querySelector('.ShiftLeft');
//   const shiftRight = document.querySelector('.ShiftRight');
//   const alt = document.querySelector('.AltLeft');
//   const symbol = document.querySelector('.KeyQ').innerHTML;
//   const isLowerCase = symbol === symbol.toLowerCase();
//   const shiftKeys = Object.keys(shiftArray);

//   letters.forEach((element) => {
//     const handleElement = document.querySelector(`.${element}`);
//     if ((shiftLeft.classList.contains('active') || shiftRight.classList.contains('active'))
//       && isLowerCase && !alt.classList.contains('active')) {
//       handleElement.innerHTML = handleElement.innerHTML.toUpperCase();
//     } else if ((!shiftLeft.classList.contains('active') || !shiftRight.classList.contains('active'))
//       && !isLowerCase && !alt.classList.contains('active')) {
//       handleElement.innerHTML = handleElement.innerHTML.toLowerCase();
//     }
//   });
//   shiftKeys.forEach((element) => {
//     const key = document.querySelector(`.${element}`);
//     if (language === 'En') {
//       if (shiftLeft.classList.contains('active') || shiftRight.classList.contains('active')) {
//         key.innerHTML = `${shiftArray[element][0]}`;
//       } else if (!shiftLeft.classList.contains('active') || !shiftRight.classList.contains('active')) {
//         key.innerHTML = `${shiftArray[element][2]}`;
//       }
//     } else if (language === 'Ru') {
//       if (shiftLeft.classList.contains('active') || shiftRight.classList.contains('active')) {
//         key.innerHTML = `${shiftArray[element][1]}`;
//       } else if (!shiftLeft.classList.contains('active') || !shiftRight.classList.contains('active')) {
//         const symboLForRu = document.querySelector('.KeyQ').innerHTML;
//         const isLowerCaseForRu = symboLForRu === symboLForRu.toLowerCase();
//         if (isLowerCaseForRu) {
//           key.innerHTML = `${shiftArray[element][3]}`.toLowerCase();
//         } else {
//           key.innerHTML = `${shiftArray[element][3]}`.toUpperCase();
//         }
//       }
//     }
//   });
// };

const keyboardFunction = () => {
  getLocalStorage();
  createBaseStructure();
  initKeys(language === 'En' ? 0 : 1);
  mouseListener();
  keyboardListener();
  setLocalStorage();
};

export default keyboardFunction;
