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
  var errMsgName = 'Заполните имя, а то как мы без этого будем дальше?';
  var errMsgText = 'Заполните отзыв, раз уж вам так не нравится';

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  /*проверка и реагирования на начальное состояние*/

  feedbackFormName.required = true;

  textRequired(feedbackFormValue);

  hideLabel(feedbackFormName, feedbackFormNameLabel);
  hideLabel(feedbackFormText, feedbackFormTextLabel);

  checkValid();
  
  errorMsgShow(feedbackFormName, errMsgName);
  errorMsgShow(feedbackFormText, errMsgText);


  /*динамическая проверка*/
  for (var i = 0; i < feedbackFormMark.length; i++) {
    feedbackFormMark[i].onclick = function() {
      var feedbackFormValue = parseInt(feedbackFormMark.value, 10);
      textRequired(feedbackFormValue);
      checkValid();
      errorMsgShow(feedbackFormName, errMsgName);
      errorMsgShow(feedbackFormText, errMsgText);
    };
  };

  feedbackFormName.oninput = function() {
    hideLabel(feedbackFormName, feedbackFormNameLabel);
    checkValid();
    errorMsgShow(feedbackFormName, errMsgName);
  };

  feedbackFormText.oninput = function() {
    hideLabel(feedbackFormText, feedbackFormTextLabel);
    checkValid();
    errorMsgShow(feedbackFormText, errMsgText)
  };
  
  /*функция управления классом disabled у кнопки submit*/

  function checkValid() {
    if (feedbackFormName.checkValidity() && feedbackFormText.checkValidity()) {
      feedbackFormButton.removeAttribute('disabled');
    } else {
      feedbackFormButton.setAttribute('disabled', true);
    }
  };

  /*функция скрытия лэйблов*/

  function hideLabel(input, inputLabel) {
    if (input.value) {
      inputLabel.style.display = 'none';
    } else {
      inputLabel.style.display = 'inline-block';
    }
  };

  /*функция установки ограничения на поле "описание"*/
  function textRequired(value) {
    if (value < 3) {
      feedbackFormText.required = true;
    } else {
      feedbackFormText.required = false;
    }
  };
  
  /*функция ошибки*/
  
  function errorMsg(input, errText) {
    var msg = document.createElement('span');
    msg.style.display = "block";
    msg.style.color = "red";
    msg.innerHTML = errText;
    msg.className = "error";
    input.parentNode.appendChild(msg);
  };
  
  /*функция отмены сообщения*/
  function resetError(input) {
    if (input.parentNode.lastChild.className == "error") {
      input.parentNode.removeChild(input.parentNode.lastChild);
    }
  };
  
  /*функция выведения сообщения об ошибки*/
  function errorMsgShow(input, errText) {
    resetError(input);
    if (!input.checkValidity()) {
      errorMsg(input, errText);
    }    
  };

})();
