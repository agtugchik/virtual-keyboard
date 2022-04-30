import keyCodesToRu from './objects-and-arrays.js';

const keys = Object.keys(keyCodesToRu);

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
      key.innerHTML = `${keyCodesToRu[element]}`;
    }

    target.append(key);
  });
};

const mouseListener = (target) => {
  target.addEventListener('mousedown', (event) => {
    event.target.classList.add('active');
  });

  document.addEventListener('mouseup', () => {
    keys.forEach((element) => {
      document.querySelector(`.${element}`).classList.remove('active');
    });
  });
};

const keyboardListener = () => {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'CapsLock') {
      document.querySelector(`.${event.code}`).classList.toggle('active');
    } else {
      if (event.code === 'Tab') event.preventDefault();
      document.querySelector(`.${event.code}`).classList.add('active');
    }
  });
  document.addEventListener('keyup', (event) => {
    if (event.code !== 'CapsLock') {
      document.querySelector(`.${event.code}`).classList.remove('active');
    }
  });
};

const init = () => {
  const container = document.createElement('div');
  const name = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const description = document.createElement('p');

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

  addKeys(keyboard);
  mouseListener(keyboard);
  keyboardListener();
};

export default init;
