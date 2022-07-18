const buttonsContainer = document.querySelector(`section.buttons`);

const screenElement = document.querySelector('section.screen div');

const orderArray = [];

let operatorExists = false;

buttonsContainer.addEventListener('click', function(eventObject) {

  if(eventObject.target.textContent === 'c'){
    screenElement.textContent = '';
    return;
  }
  const currentScreenText = screenElement.textContent;

  screenElement.textContent = currentScreenText + eventObject.target.textContent;

  const parsedValue = parseInt(eventObject.target.textContent,10);
  console.log(parsedValue);

  const parsedValueIsNumber = !isNaN(parsedValue)
  if (parsedValueIsNumber){
    if(!operatorExists){
      orderArray[0] = parseFloat(currentScreenText + eventObject.target.textContent);
    } else {
       orderArray[2] = parseFloat( (orderArray[2] ? orderArray[2] : '') + eventObject.target.textContent);
    }
  } else {
     if (!operatorExists){
       orderArray.push(eventObject.target.textContent);
       operatorExists = true;
     } else {
        // tu będziemy liczyć
        const calculationResult = calculate (orderArray);
        screenElement.textContent = calculationResult + eventObject.target.textContent;
        orderArray[0] = calculationResult;
        orderArray[1] = eventObject.target.textContent;
        orderArray[2] = '';
     }
  }
  console.log(Array.from(orderArray));
});

function calculate(dataArray){
  if(dataArray.length !== 3) {
    return;
  }

  switch(dataArray[1]){
    case '+':
      return dataArray[0] + dataArray[2];
    case '-':
      return dataArray[0] - dataArray[2];
    case '/':
      return dataArray[0] / dataArray[2];
    case '*':
      return dataArray[0] * dataArray[2];
  }
}



