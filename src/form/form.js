'use strict';

  var valid = require('./form-valid');
  var setTimeofExpires =  require('./setTimeofExpires');
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
  var browserCookies = require('browser-cookies');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
  
  /*чтение cookies*/
  feedbackFormName.value = browserCookies.get('name') || '';
  feedbackFormMark.value = browserCookies.get('mark') || 3;

  /*проверка и реагирования на начальное состояние*/

  feedbackFormName.required = true;

  valid.textRequired(feedbackFormValue, feedbackFormText);

  valid.hideLabel(feedbackFormName, feedbackFormNameLabel);
  valid.hideLabel(feedbackFormText, feedbackFormTextLabel);

  checkValid();
  
  errorMsgShow(feedbackFormName, errMsgName);
  errorMsgShow(feedbackFormText, errMsgText);


  /*динамическая проверка*/
  for (var i = 0; i < feedbackFormMark.length; i++) {
    feedbackFormMark[i].onclick = function() {
      var feedbackFormValue = parseInt(feedbackFormMark.value, 10);
      valid.textRequired(feedbackFormValue, feedbackFormText);
      checkValid();
      errorMsgShow(feedbackFormName, errMsgName);
      errorMsgShow(feedbackFormText, errMsgText);
    };
  }

  feedbackFormName.oninput = function() {
    valid.hideLabel(feedbackFormName, feedbackFormNameLabel);
    checkValid();
    errorMsgShow(feedbackFormName, errMsgName);
  };

  feedbackFormText.oninput = function() {
    valid.hideLabel(feedbackFormText, feedbackFormTextLabel);
    checkValid();
    errorMsgShow(feedbackFormText, errMsgText);
  };
  
  /*задание cookies*/
  feedbackForm.onsubmit = function(event) {
    event.preventDefault();
    var expireDateValue = setTimeofExpires ();
    browserCookies.set('mark', feedbackFormMark.value, {
      expires: expireDateValue
    });
    browserCookies.set('name', feedbackFormName.value, {
      expires: expireDateValue
    });            
    this.submit();
  };
  
  /*функция управления классом disabled у кнопки submit*/

  function checkValid() {
    if (feedbackFormName.checkValidity() && feedbackFormText.checkValidity()) {
      feedbackFormButton.removeAttribute('disabled');
    } else {
      feedbackFormButton.setAttribute('disabled', true);
    }
  }

  
  /*функция выведения сообщения об ошибки*/
  function errorMsgShow(input, errText) {
    valid.resetError(input);
    if (!input.checkValidity()) {
      valid.errorMsg(input, errText);
    }    
  }
  

  


