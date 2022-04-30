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
};

init();
