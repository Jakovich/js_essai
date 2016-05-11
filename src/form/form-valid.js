
'use strict';
module.exports = {
  
  textRequired: function(value, element) {
    if (value < 3) {
      element.required = true;
    } else {
      element.required = false;
    }
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
    if (input.parentNode.lastChild.className == 'error') {
     input.parentNode.removeChild(input.parentNode.lastChild);
    }
  },

  hideLabel: function(input, inputLabel) {
    if (input.value) {
      inputLabel.style.display = 'none';
    } else {
      inputLabel.style.display = 'inline-block';
    }
  }
  
  
}