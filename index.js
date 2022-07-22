const buttonsContainer = document.querySelector(`section.buttons`);

const screenElement = document.querySelector('section.screen div');

const orderArray = [];

let operatorExists = false;

buttonsContainer.addEventListener('click', function(eventObject) {

  if(eventObject.target.textContent === 'c'){
    screenElement.textContent = '';
    const len = orderArray.length;
    for (let i = 0;i<len;i++){
      orderArray.pop();
    }
    return;
  }

  if(eventObject.target.textContent === '⮨'){
    screenElement.textContent = screenElement.textContent.slice(0, -1);
        const lastIndex = orderArray.length ? orderArray.length-1 : 0;
    const lastValue = orderArray[lastIndex].toString();
    console.log('lastValue',lastValue);
    if (lastValue){
      const newValue = lastValue.slice(0,-1);
      if (!newValue){
        orderArray.pop();
        if (lastIndex === 1){
          operatorExists = false;
        }
      }else{
        orderArray[lastIndex] = parseFloat(newValue);
      }
    }
    console.log('orderArray',orderArray);
    return;
  }
   if(eventObject.target.textContent === '='){
    if(orderArray.length === 3){
      propagateResult(orderArray);
    }
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
        propagateResult(orderArray,eventObject.target.textContent)
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
    case 'x':
      return dataArray[0] * dataArray[2];
    case '%':
      return (dataArray[0] * dataArray[2])/100;
  }
}
function propagateResult(dataArray,operator){
  const calculationResult = calculate (dataArray);
  screenElement.textContent = operator ? calculationResult + operator : calculationResult;
  dataArray[0] = calculationResult;
  if (operator){
    dataArray[1] = operator;
  } else {
    dataArray.pop();
  }
    dataArray.pop();
}
