(function() {
  var reviewsContainer = document.querySelector('.reviews-list');
  var reviews = window.reviews;
  var template = document.querySelector('#review-template');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var elementToClone;

  if (!reviewsFilter.classList.contains('invisible')){
    reviewsFilter.classList.add('invisible');
  }

  if ('content' in template) {
    elementToClone = template.content.querySelector('.review');
  } else {
    elementToClone = template.querySelector('.review');
  }

  function getReviewElement(data, container) {
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
  }
  
  function renderReviews(reviews) {
    reviewsContainer.innerHtml = '';
    reviews.forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
  }
  
  function getReviews(callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(event) {
      var loadedData = JSON.parse(event.target.response);
      callback(loadedData);
    };
    
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.send();
  }
  
  
  
  function setFiltrationEnabled() {
    
    var filters = reviewsFilter.querySelectorAll('.reviews-filter-item');
    for (var i = 0; i < filters.length; i++) {
      filters[i].onclick = function(event) {
        setFilterEnabled(this.id);
      };
    }
  }
  
  function getFilteredReviews(reviews, filter) {
    var reviewsToFilter = reviews.slice(0);
    
    switch (filter) {
      case 'reviews-good':
        reviewsToFilter.sort(function(a, b) {
          return b.rating - a.rating;
        })
        break;
    }
    return reviewsToFilter;
  }
  
  function setFilterEnabled(filter) {
    var filtiredReviews = getFilteredReviews(reviews, filter);
    renderReviews(filtiredReviews);
  }
  
  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    renderReviews(reviews);
  });

  if (reviewsFilter.classList.contains('invisible')){
    reviewsFilter.classList.remove('invisible');
  }
})();