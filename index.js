//uchwyt do elementu section w którym są wszystkie przyciski
const buttonsContainer = document.querySelector('section.buttons');
//uchwyt do diva w którym wyświetlają się obliczenia
const screenElement = document.querySelector('section.screen div');
//tablica przechowująca aktualne działanie: [pierwsza liczba, operator, druga liczba]
const orderArray = [];
// operator ustawiony na false
let operatorExists = false;
// ułamek dzieciętny usatwiony na false
let numberIsDecimal = false;
//metoda nasłuchiwania na zdarzenie (kliknięcia na przycisk)
buttonsContainer.addEventListener('click', function(eventObject) {
//jeśli klikniętym przyciskiem jest "c" to
  if(eventObject.target.textContent === 'c'){
    //na ekranie kalkulatora ma wyświetlić się pusty string
    screenElement.textContent = '';
    //zmienna len przechowuje długość tablicy 
    const len = orderArray.length;
    //pętla (początkowo zmienna “i” przyjmuje wartość 0, instrukcja sprawdza kolejno czy wartość zmiennej “i” 
    //jest mniejsza niż długość tablicy i zwiększa o 1 wartość zmiennej “i”
    for (let i = 0;i<len;i++){
    //po wykonaniu pętli usuwa ostatni element tablicy
      orderArray.pop();
    }
    //operator nie istnieje
    operatorExists = false;
    return;
  }
//jeśli klikniętym przyciskiem jest strzałka to
  if(eventObject.target.textContent === '⮨'){
//na ekranie kalkulatora ma pojawić się to co wpisano do tej pory z usuniętym ostatni wpisanym elementem 
    screenElement.textContent = screenElement.textContent.slice(0, -1);
    //ostatni indeks jest wyliczony z długość tablicy pomniejszonej o jeden (indeksy liczymy od 0, a długość od 1)
    //lub jeśli nie ma długości tablicy to podstawiamy zero (adres do pierwszego elementu tablicy)
    const lastIndex = orderArray.length ? orderArray.length-1 : 0;
    //ostatnia wartość przechowuje wartość tablicy ukrytą pod ostatnim indeksem zamienioną na string
    const lastValue = orderArray[lastIndex].toString();
    console.log('lastValue',lastValue);
    //jeśli istnieje ostatnia wartość to
    if (lastValue){
      //nowa wrtość zawiera ostanią wartość pomniejszoną o ostatni element 
      const newValue = lastValue.slice(0,-1);
      //jeśli nie istnieje nowa wartość to 
      if (!newValue){
        //usuwa ostatni element tablicy
        orderArray.pop();
        //jeśli ostatni indeks równa się 1 to
        if (lastIndex === 1){
          //operatora nie ma
          operatorExists = false;
        }
      //w każdym innym przypadku (jeśli newValue istnieje)
      }else{
        //w przeciwnym razie ostatni indeks zawiera przetworzoną nową wartość na liczbę zmiennoprzecinkową 
        orderArray[lastIndex] = parseFloat(newValue);
      }
    }
    //jeśli nie ma operatora zakończ działanie funkcji
    operatorExists = false;
    return;
  }
  //jeśli klikniętym przyciskiem jest znak równości to
  if(eventObject.target.textContent === '='){
    //jeśli długość tablicy jest równa 3 to 
    if(orderArray.length === 3){
      //na elementach tablicy wykonuje się funkcja
      propagateResult(orderArray);
    }
    //jeśli nie ma opertora zakończ działanie funkcji
    operatorExists = false;
    return;
  }
  
  // obecnie wyświetlany tekst zawiera 
  const currentScreenText = screenElement.textContent;
  //jeśli klikniętym przyciskiem jest kropka to 
  if(eventObject.target.textContent === '.'){
    //jeśli liczba nie jest ułamkiem to
    if(!numberIsDecimal){
      //ułamek jest true
      numberIsDecimal = true;
      //wyświetlacz kalkulatora zawiera to co wpisano plus to co aktualnie kliknięto
      screenElement.textContent = currentScreenText + eventObject.target.textContent;
      //if(!orderArray.length){
       // screenElement.textContent = '0.';
      //}
    }
    return;
  }
  //wyświetlana zawartość tekstowa przechowuje już wpisany tekst i aktualizuje go o kolejno wpisywany tekst
  screenElement.textContent = currentScreenText + eventObject.target.textContent;
  //zmienna przechowująca wynik próby sprowadzenia tekstu z klikniętego przycisku do liczby 
  const parsedValue = parseInt(eventObject.target.textContent, 10);
  //sprawdzenie czy wynik próby jest liczbą (nie jest NaN)
  const parsedValueIsNumber = !isNaN(parsedValue);
  //jeśli przeanalizowana wartość jest liczbą to
  if (parsedValueIsNumber){
    //ostatni indeks jest równy zero
    let lastIndex = 0;
    //chyba że istnieje operator to
    if(operatorExists){
      //ostatni indeks to dwa
      lastIndex = 2;
    }
    //ostatnia wartość tablicy zamieniona na string  
    //jeśli nie ma wartości pod ostatnim indeksem tablicy to zawiera pusty string
    let lastValueAsString = (orderArray[lastIndex] ? orderArray[lastIndex].toString() : '');
    //jeśli liczba jest ułamkiem to
    if(numberIsDecimal){
console.log('lastValueAsString', lastValueAsString);
      const lastValueLen = lastValueAsString.length; 
      //ostatnia wartość zmieniona na string zawiera 0. jeśli nie ma ostatniej wartości zamienionej na string
      // lub jesli jest to do ostatniej wartości zmienionej na string dodajemy kropkę 
      lastValueAsString = !lastValueAsString ? '0.' : lastValueAsString + '.';
      if (!lastValueLen){
        screenElement.textContent = screenElement.textContent.slice (0, -2) + lastValueAsString + eventObject.target.textContent;
      }

    }
console.log('lastIndex', lastIndex);
    //wartość pod ostatnim indeksem tablicy zawiera przetworzoną na liczbę ostatnią wartość zamienioną w string 
    //z ostatnią klikniętą liczbą
    orderArray[lastIndex] = parseFloat(lastValueAsString + eventObject.target.textContent);
  // w każdym innym przypadku (kiedy przeanalizowana wartość nie jest liczbą czyli jest operatorem)
  } else {
     // jeśli operator nie istnieje to 
     if (!operatorExists){
      //dodaje do tablicy klikniętego operatora
       orderArray.push(eventObject.target.textContent);
       //operator jest ustawiony na true
       operatorExists = true;
     //w każdym innym przypadku (operator istnieje)
     } else {
       // wykonuje funkcję na tablicy i wpisanym tekście 
        if (orderArray.length === 3){
          propagateResult(orderArray, eventObject.target.textContent);
        } else {
          orderArray[1] = eventObject.target.textContent;
          screenElement.textContent = screenElement.textContent.slice (0, -2) + eventObject.target.textContent;
        }
        //tutaj trzeba zmienić na coś w rodzaju że jeśli operator już jest i klikniemy kolejny operator to ma on zastąpić poprzedni operator
        //a jeśli kolejny operator nie będzie kliknięty to wykonaj funkcję propagateResult 
     }
  }
  //ułamek jest ustawiony na false 
  numberIsDecimal = false;
  
  console.log('orderArray5', Array.from (orderArray));
});
//funkcja wykonywania obliczeń na zawartości tablicy 
function calculate(dataArray){
  //jeśli długość tej tablicy nie jest równa 3 to 
  if(dataArray?.length !==3){
    //zakończ działanie funkcji
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
//funkcja wyświetlania wyników obliczeń
function propagateResult(dataArray, operator){
  // zmienna przechuwje obliczenia
  const calculationResult = calculate(dataArray);
  //na wyświtlaczu kalkulatora jeśli jest operator ma wyświetlić się wynik obliczenia plus operator 
  //lub jeśli nie ma operatora to wynik obliczenia 
  screenElement.textContent = operator ? calculationResult + operator : calculationResult;
  //pierwszy element tablicy zawiera wynik z poprzedneigo obliczenia
  dataArray[0] = calculationResult;
  //jesli operator istnieje to
  if (operator){
    //drugim elementem tablicy ma być operator
    dataArray[1] = operator;
  } else {
    //w przeciwnym razie jeśli nie ma operatora usuwa ostatni element tablicy 
    dataArray.pop();
  }
    dataArray.pop();
console.log('dataArray3', Array.from (dataArray));
}

