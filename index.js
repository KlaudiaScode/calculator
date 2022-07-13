const buttonsContainer = document.querySelector(`section.buttons`);

const screenElement = document.querySelector('section.screen div');

const orderArray = [];

const operatorExists = false;

buttonsContainer.addEventListener('click', function(eventObject) {

  console.log(eventObject.target.textContent);

  const currentScreenText = screenElement.textContent;

  screenElement.textContent = currentScreenText + eventObject.target.textContent;

  const parsedValue = parseInt(eventObject.target.textContent,10);
  console.log(parsedValue);

  if (!isNaN(parsedValue)){
    if(!operatorExists){
      orderArray[0] = parseFloat(currentScreenText + eventObject.target.textContent);
    }
  }
console.log(orderArray);

});


