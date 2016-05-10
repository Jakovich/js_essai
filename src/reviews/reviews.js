'use strict';

(function() {
  var reviewsContainer = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var elementToClone;
  var PAGE_SIZE = 3;
  var pageNumber = 0;
  /*var Filter = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular',
  };*/
  
  var linkShow = document.querySelector(".reviews-controls-more");
  
  var reviews = [];
  var filteredReviews = [];

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
  
  function getReviews(callback) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
  
    xhr.onloadstart = function() {
      reviewsContainer.classList.add('reviews-list-loading');
    };
    
    xhr.onerror = function() {
      if (reviewsContainer.classList.contains('reviews-list-loading')) {
        reviewsContainer.classList.remove('reviews-list-loading');
      }
      reviewsContainer.classList.add('reviews-load-failure');
    };
    
    xhr.ontimeout = xhr.onerror;
    
    xhr.onload = function(event) {
      if (reviewsContainer.classList.contains('reviews-list-loading')) {
        reviewsContainer.classList.remove('reviews-list-loading');
      }
      if (reviewsFilter.classList.contains('invisible')){
        reviewsFilter.classList.remove('invisible');
      }
      var loadedData = JSON.parse(event.target.response);
      callback(loadedData);
    };
    
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.send();
  }
  
  function renderReviews(reviews, page, replace) {
    if (replace) {
      reviewsContainer.innerHTML = '';
    }
    
    var from = page * PAGE_SIZE;
    
    var to = from + PAGE_SIZE;
    
    reviews.slice(from, to).forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
    
    if (isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
      linkShow.classList.remove('invisible');
    } else {
      linkShow.classList.add('invisible');
    }
  }
  
  function isNextPageAvailable (reviews, page, pageSize) {
    return page < Math.floor(reviews.length / pageSize);
  }
  
  function showMore() {
    linkShow.addEventListener('click', function() {
      if (isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
        pageNumber++;
        renderReviews(filteredReviews, pageNumber);
      }
    });
  }
   
  /*function getFilteredReviews(reviews, filter) {
    var reviewsToFilter = reviews.slice(0);
    var period = new Date() - 1000 * 60 * 60 * 24 * 14;
    switch (filter) {
      case Filter.RECENT:
        reviewsToFilter = reviewsToFilter.filter(function(a) {
          return new Date(a.date) >= period;
        });
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return b.date - a.date;
        });
        break;
        
      case Filter.GOOD:
        reviewsToFilter = reviewsToFilter.filter(function(a) {
          return a.rating >= 3;
        });
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
        
      case Filter.BAD:
        reviewsToFilter = reviewsToFilter.filter(function(a) {
          return a.rating <= 2;
        });
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;
        
      case Filter.POPULAR:
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
        
      default:
        reviewsToFilter = reviews.slice(0);
    }
    return reviewsToFilter;
  }
  */
  
  function setFilterEnabled(filter) {
    filteredReviews = getFilteredReviews(reviews, filter);
    pageNumber = 0;
    renderReviews(filteredReviews, pageNumber, true);
  }
  
  function setFiltrationEnabled() {
    reviewsFilter.addEventListener('click', function(event) {
      if (event.target.name === 'reviews') {
        setFilterEnabled(event.target.id);
      }
    });
  }
  
  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltrationEnabled();
    setFilterEnabled(Filter.ALL);
    showMore();
  });


})();