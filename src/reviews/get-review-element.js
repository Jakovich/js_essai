'use strict';  
var template = document.querySelector('#review-template');
var elementToClone;

if ('content' in template) {
  elementToClone = template.content.querySelector('.review');
} else {
    elementToClone = template.querySelector('.review');
}

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  var starWidth = 30;
  var ratingWidth = starWidth * data.rating + 'px';
  var userImage = new Image();
  var imageLoadTimeout;

  userImage.onload = function() {
    clearTimeout(imageLoadTimeout);
    var userImgTag = element.querySelector('.review-author');
    userImgTag.src = userImage.src;
    userImgTag.width = 124;
    userImgTag.height = 124;
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
  container.appendChild(element);

  return element;
};

module.exports = getReviewElement;