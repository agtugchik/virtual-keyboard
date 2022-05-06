class KeyboardKeys {
  constructor() {
    this.Backquote = ['`', 'ё', '~', 'ё'];
    this.Digit1 = ['1', '1', '!', '!'];
    this.Digit2 = ['2', '2', '@', '"'];
    this.Digit3 = ['3', '3', '#', '№'];
    this.Digit4 = ['4', '4', '$', ';'];
    this.Digit5 = ['5', '5', '%', '%'];
    this.Digit6 = ['6', '6', '^', ':'];
    this.Digit7 = ['7', '7', '&', '?'];
    this.Digit8 = ['8', '8', '*', '*'];
    this.Digit9 = ['9', '9', '(', '('];
    this.Digit0 = ['0', '0', ')', ')'];
    this.Minus = ['-', '-', '_', '_'];
    this.Equal = ['=', '=', '+', '+'];
    this.Backspace = ['Backspace', 'Backspace', 'Backspace', 'Backspace'];
    this.Tab = ['Tab', 'Tab', 'Tab', 'Tab'];
    this.KeyQ = ['q', 'й', 'q', 'й'];
    this.KeyW = ['w', 'ц', 'w', 'ц'];
    this.KeyE = ['e', 'у', 'e', 'у'];
    this.KeyR = ['r', 'к', 'r', 'к'];
    this.KeyT = ['t', 'е', 't', 'е'];
    this.KeyY = ['y', 'н', 'y', 'н'];
    this.KeyU = ['u', 'г', 'u', 'г'];
    this.KeyI = ['i', 'ш', 'i', 'ш'];
    this.KeyO = ['o', 'щ', 'o', 'щ'];
    this.KeyP = ['p', 'з', 'p', 'з'];
    this.BracketLeft = ['[', 'х', '[', 'х'];
    this.BracketRight = [']', 'ъ', ']', ';'];
    this.Backslash = ['\\', '\\', '|', '/'];
    this.Delete = ['Delete', 'Delete', 'Delee', 'Delete'];
    this.CapsLock = ['CapsLock', 'CapsLock', 'CapsLock', 'СapsLock'];
    this.KeyA = ['a', 'ф', 'a', 'ф'];
    this.KeyS = ['s', 'ы', 's', 'ы'];
    this.KeyD = ['d', 'в', 'd', 'в'];
    this.KeyF = ['f', 'а', 'f', 'а'];
    this.KeyG = ['g', 'п', 'g', 'п'];
    this.KeyH = ['h', 'р', 'h', 'р'];
    this.KeyJ = ['j', 'о', 'j', 'о'];
    this.KeyK = ['k', 'л', 'k', 'л'];
    this.KeyL = ['l', 'д', 'l', 'д'];
    this.Semicolon = [';', 'ж', ':', 'ж'];
    this.Quote = ["'", 'э', '"', 'э'];
    this.Enter = ['Enter', 'Enter', 'Enter', 'Enter'];
    this.ShiftLeft = ['Shift', 'Shift', 'Shift', 'Shift'];
    this.KeyZ = ['z', 'я', 'z', 'я'];
    this.KeyX = ['x', 'ч', 'x', 'ч'];
    this.KeyC = ['c', 'с', 'c', 'с'];
    this.KeyV = ['v', 'м', 'v', 'м'];
    this.KeyB = ['b', 'и', 'b', 'и'];
    this.KeyN = ['n', 'т', 'n', 'т'];
    this.KeyM = ['m', 'ь', 'm', 'ь'];
    this.Comma = [',', 'б', '<', 'б'];
    this.Period = ['.', 'ю', '>', 'ю'];
    this.Slash = ['/', '.', '?', ','];
    this.ArrowUp = ['&#8593;', '&#8593;', '&#8593;', '&#8593;'];
    this.ShiftRight = ['Shift', 'Shift', 'Shift', 'Shift'];
    this.ControlLeft = ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'];
    this.MetaLeft = ['Win', 'Win', 'Win', 'Win'];
    this.AltLeft = ['Alt', 'Alt', 'Alt', 'Alt'];
    this.Space = [' ', ' ', ' ', ' '];
    this.AltRight = ['Alt', 'Alt', 'Alt', 'Alt'];
    this.ArrowLeft = ['&#8592;', '&#8592;', '&#8592;', '&#8592;'];
    this.ArrowDown = ['&#8595;', '&#8595;', '&#8595;', '&#8595;'];
    this.ArrowRight = ['&#8594;', '&#8594;', '&#8594;', '&#8594;'];
    this.ControlRight = ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'];
  }
}

const unhandleElements = [
  'Tab',
  'CapsLock',
  'ShiftLeft',
  'ControlLeft',
  'MetaLeft',
  'AltLeft',
  'AltRight',
  'ControlRight',
  'ShiftRight',
  'Enter',
  'Delete',
  'Backspace',
];

const keyProperties = new KeyboardKeys();
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

const capsLockHandler = () => {
  const capsLock = document.querySelector('.CapsLock');
  const shifts = document.querySelector('.ShiftLeft').classList.contains('active')
    || document.querySelector('.ShiftRight').classList.contains('active');

  keys.forEach((element) => {
    if (!unhandleElements.includes(element)) {
      const key = document.querySelector(`.${element}`);
      if (capsLock.classList.contains('active')) {
        key.innerHTML = key.innerHTML.toUpperCase();
      } else if (!shifts) {
        key.innerHTML = key.innerHTML.toLowerCase();
      }
    }
  });
  shiftHandler();
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

const textareaMouseListener = (event) => {
  const textarea = document.querySelector('textarea');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (event.target.classList[0] === 'Backspace') {
    const textareaText = textarea.value.substring(0, start > 0 ? start - 1 : start)
      + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = start > 0 ? end - 1 : end;
  }
  if (event.target.classList[0] === 'Delete') {
    const textareaText = textarea.value.substring(0, start) + textarea.value.substring(end + 1);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end;
  }
  if (event.target.classList[0] === 'Enter') {
    const enterSymbol = '\n';
    const textareaText = textarea.value.substring(0, start)
      + enterSymbol + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end + 1;
  }
  if (event.target.classList[0] === 'Tab') {
    const tabSymbol = '\t';
    const textareaText = textarea.value.substring(0, start)
      + tabSymbol + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end + 1;
  }
  if (keys.includes(event.target.classList[0])
    && !unhandleElements.includes(event.target.classList[0])) {
    const textareaText = textarea.value.substring(0, start)
      + event.target.textContent + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = (start === end) ? (end + 1) : end;
  }
};

const textareaKeyboardListener = (event) => {
  const textarea = document.querySelector('textarea');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const target = document.querySelector(`.${event.code}`);
  event.preventDefault();
  if (event.code === 'Backspace') {
    const textareaText = textarea.value.substring(0, start > 0 ? start - 1 : start)
      + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = start > 0 ? end - 1 : end;
  }
  if (event.code === 'Delete') {
    const textareaText = textarea.value.substring(0, start) + textarea.value.substring(end + 1);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end;
  }
  if (event.code === 'Enter') {
    const enterSymbol = '\n';
    const textareaText = textarea.value.substring(0, start)
      + enterSymbol + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end + 1;
  }
  if (event.code === 'Tab') {
    const tabSymbol = '\t';
    const textareaText = textarea.value.substring(0, start)
      + tabSymbol + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end + 1;
  }
  if (keys.includes(event.code)
    && !unhandleElements.includes(event.code)) {
    const textareaText = textarea.value.substring(0, start)
      + target.textContent + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = (start === end) ? (end + 1) : end;
  }
};

const mouseListener = () => {
  document.querySelector('.keyboard').addEventListener('mousedown', (event) => {
    textareaMouseListener(event);
    if (event.target.classList.contains('CapsLock')) {
      event.target.classList.toggle('active');
      capsLockHandler();
    } else if (event.target.classList.contains('ShiftLeft') && !shiftLocker) {
      event.target.classList.add('active');
      shiftHandler();
    } else if (event.target.classList.contains('ShiftRight') && !shiftLocker) {
      event.target.classList.add('active');
      shiftHandler();
    } else if (!event.target.classList.contains('ShiftRight')
      && !event.target.classList.contains('ShiftLeft')) {
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
    textareaKeyboardListener(event);
    if (document.querySelector(`.${event.code}`)) {
      if (event.code === 'CapsLock' && !capsLocker) {
        capsLocker = true;
        document.querySelector(`.${event.code}`).classList.toggle('active');
        capsLockHandler();
      } else if (event.code === 'ShiftLeft' && !shiftLocker) {
        shiftLocker = true;
        document.querySelector(`.${event.code}`).classList.add('active');
        shiftHandler();
      } else if (event.code === 'ShiftRight' && !shiftLocker) {
        shiftLocker = true;
        document.querySelector(`.${event.code}`).classList.add('active');
        shiftHandler();
      } else if (event.code !== 'ShiftLeft' && event.code !== 'ShiftRight') {
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
        document.querySelector('.ShiftRight').classList.remove('active');
        document.querySelector('.ShiftLeft').classList.remove('active');
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

keyboardFunction();
