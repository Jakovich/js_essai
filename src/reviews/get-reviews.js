'use strict';
var reviewsContainer = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');

var getReviews = function(callback) {
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
};

module.exports = getReviews;


