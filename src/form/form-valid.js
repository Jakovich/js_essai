
'use strict';
module.exports = {
  
  textRequired: function(value, element) {
    element.required = value < 3;
  },
  
  errorMsg: function(input, errText) {
    var msg = document.createElement('span');
    msg.style.display = 'block';
    msg.style.color = 'red';
    msg.innerHTML = errText;
    msg.className = 'error';
    input.parentNode.appendChild(msg);
  },
  
  resetError: function(input) {
    if (input.parentNode.lastChild.className === 'error') {
     input.parentNode.removeChild(input.parentNode.lastChild);
    }
  },

  hideLabel: function(input, inputLabel) {
    inputLabel.style.display = input.value ? 'none' : 'inline-block';
  }
  
  
}