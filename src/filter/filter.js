'use strict';

var FilterType = require('./filter-type');

var filter = function(reviews, FilterType) {
  var reviewsToFilter = reviews.slice(0);
  var period = new Date() - 1000 * 60 * 60 * 24 * 14;
  switch (FilterType) {
    case FilterType.RECENT:
      reviewsToFilter = reviewsToFilter.filter(function(a) {
        return new Date(a.date) >= period;
      });
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.date - a.date;
      });
    break;
        
    case FilterType.GOOD:
      reviewsToFilter = reviewsToFilter.filter(function(a) {
          return a.rating >= 3;
      });
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
        
    case FilterType.BAD:
      reviewsToFilter = reviewsToFilter.filter(function(a) {
        return a.rating <= 2;
      });
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
        
    case FilterType.POPULAR:
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
        });
      break;
        
    default:
      reviewsToFilter = reviews.slice(0);
  }
  return reviewsToFilter;
};

module.exports = filter;