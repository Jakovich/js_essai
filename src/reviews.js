(function() {
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

  function getReviewElement(data, container) {
    var element = elementToClone.cloneNode(true);
    var ratingWidth = 30 * data.rating + 'px';
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
  }

  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });

  if (reviewsFilter.classList.contains('invisible')){
    reviewsFilter.classList.remove('invisible');
  }
})();