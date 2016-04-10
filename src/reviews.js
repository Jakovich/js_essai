var reviewsContainer = document.querySelector('.reviews-list');
var reviews = window.reviews;
var templaite = document.querySelector('#review-template');
var reviewsFilter = document.querySelector('.reviews-filter');
var elementToClone;

if (!reviewsFilter.classList.contains('invisible')){
  reviewsFilter.classList.add('invisible');
}

if ('content' in templaite) {
  elementToClone = templaite.content.querySelector('.review');
} else {
  elementToClone = templaite.querySelector('.review');
}

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  var ratingWidth = 30 * data.rating + 'px';
  element.querySelector('.review-text').textContent = data.description;
  element.querySelector('.review-rating').style.width = ratingWidth;
  container.appendChild(element);
};

reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});