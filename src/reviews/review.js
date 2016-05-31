'use strict';  
var template = document.querySelector('#review-template');
var elementToClone;


if ('content' in template) {
  elementToClone = template.content.querySelector('.review');
} else {
  elementToClone = template.querySelector('.review');
}

var Review = function(data, container){
  this.data = data;
  this.element = getReviewElement(this.data);
  
  this.onQuizClick = function(evt) {
    var currentItem = evt.target.classList;
    if (currentItem.contains('review-quiz-answer')) {
      evt.preventDefault();
      var allItems = evt.target.parentNode.querySelectorAll('.review-quiz-answer');
      for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].classList.contains('review-quiz-answer-active')) {
          allItems[i].classList.remove('review-quiz-answer-active');
        }
      }
      
      if (!currentItem.contains('review-quiz-answer-active')) {
        currentItem.add('review-quiz-answer-active');
      }
    }
  };
  
  this.remove = function() {
    this.element.removeEventListener('click', this.onQuizClick);
    this.element.parentNode.removeChild(this.element);
  };
  
  container.appendChild(this.element);
  this.element.addEventListener('click', this.onQuizClick);
};

var getReviewElement = function(data) {
  var element = elementToClone.cloneNode(true);
  var STAR_WIDTH = 30;
  var IMG_WIDTH = 124;
  var IMG_HEIGHT = 124;
  var ratingWidth = STAR_WIDTH * data.rating + 'px';
  var userImage = new Image();
  var imageLoadTimeout;

  userImage.onload = function() {
    clearTimeout(imageLoadTimeout);
    var userImgTag = element.querySelector('.review-author');
    userImgTag.src = userImage.src;
    userImgTag.width = IMG_WIDTH;
    userImgTag.height = IMG_HEIGHT;
  };

  userImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  userImage.src = data.author.picture;

  imageLoadTimeout = setTimeout(function() {
    userImage.src = '';
    element.classList.add('review-load-failure');
  }, 10000);

  element.querySelector('.review-text').textContent = data.description;
  element.querySelector('.review-rating').style.width = ratingWidth;

  return element;
};

module.exports = Review;