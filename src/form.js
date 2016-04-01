'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var feedbackForm = document.querySelector('.review-form');
  var feedbackFormName = feedbackForm['review-name'];
  var feedbackFormNameLabel = feedbackForm.querySelector('.review-fields-name');
  var feedbackFormText = feedbackForm['review-text'];
  var feedbackFormTextLabel = feedbackForm.querySelector('.review-fields-text');
  var feedbackFormMark = feedbackForm['review-mark'];
  var feedbackFormValue = parseInt(feedbackFormMark.value, 10);
  var feedbackFormButton = feedbackForm.querySelector('.review-submit');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  feedbackFormName.required = true;

  /*проверка начальных состояний*/
  if (feedbackFormValue < 3) {
    feedbackFormText.required = true;
  }

  if (feedbackFormName.value) {
    feedbackFormNameLabel.style.display = 'none';
  } else {
    feedbackFormNameLabel.style.display = 'inline-block';
  }

  if (feedbackFormText.value) {
    feedbackFormTextLabel.style.display = 'none';
  } else {
    feedbackFormTextLabel.style.display = 'inline-block';
  }

  checkValid();



/*динамическая проверка*/
  for (var i = 0; i < feedbackFormMark.length; i++) {
    feedbackFormMark[i].onclick = function() {
      var feedbackFormValue = parseInt(feedbackFormMark.value, 10);
      if (feedbackFormValue < 3) {
        feedbackFormText.required = true;
      } else {
        feedbackFormText.required = false;
      }
      checkValid();
    };
  };

  feedbackFormName.onchange = function() {
    if (feedbackFormName.value) {
      feedbackFormNameLabel.style.display = 'none';
    } else {
      feedbackFormNameLabel.style.display = 'inline-block';
    }
    checkValid();
  };

  feedbackFormText.onchange = function() {
    if (feedbackFormText.value) {
      feedbackFormTextLabel.style.display = 'none';
    } else {
      feedbackFormTextLabel.style.display = 'inline-block';
    }
    checkValid();
  };

  /*функция управления классом disabled у кнопки submit*/

  function checkValid(){
    if( feedbackFormName.checkValidity() && feedbackFormText.checkValidity()) {
      feedbackFormButton.removeAttribute('disabled');
    } else {
      feedbackFormButton.setAttribute('disabled', true);
    }
  };

})();
