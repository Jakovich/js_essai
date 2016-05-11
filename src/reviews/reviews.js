'use strict';
var FilterType = require('../filter/filter-type');
var filter = require('../filter/filter');
var getReviews = require('./get-reviews');
var getReviewElement = require('./get-review-element');
var utils = require('../utils');

var reviewsContainer = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');
var PAGE_SIZE = 3;
var pageNumber = 0;
  
var linkShow = document.querySelector(".reviews-controls-more");
  
var reviews = [];
var filteredReviews = [];

if (!reviewsFilter.classList.contains('invisible')){
  reviewsFilter.classList.add('invisible');
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
    
  if (utils.isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
    linkShow.classList.remove('invisible');
  } else {
    linkShow.classList.add('invisible');
  }
}
  
function showMore() {
  linkShow.addEventListener('click', function() {
    if (utils.isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderReviews(filteredReviews, pageNumber);
    }
  });
}
  
function setFilterEnabled(filterType) {
  filteredReviews = filter(reviews, filterType);
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
  setFilterEnabled(FilterType.ALL);
  showMore();
});


