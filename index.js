const buttonsContainer = document.querySelector(`section.buttons`);

buttonsContainer.addEventListener('click', function(eventObject) {
  console.log(eventObject.target);
});