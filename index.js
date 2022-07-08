const buttonsContainer = document.querySelector(`section.buttons`);

const screenElement = document.querySelector('section.screen div');

buttonsContainer.addEventListener('click', function(eventObject) {

  console.log(eventObject.target.textContent);

  const currentScreenText = screenElement.textContent;

  screenElement.textContent = currentScreenText + eventObject.target.textContent;
});

