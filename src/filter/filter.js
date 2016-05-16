'use strict';

var FILTER_TYPE = require('./filter-type');

var filter = function(reviews, type) {
  var reviewsToFilter = reviews.slice(0);
  var period = new Date() - 1000 * 60 * 60 * 24 * 14; // 14 дней - фильтр "недавние" должен показывать отзывы, оставленные за этот период
  switch (type) {
    case FILTER_TYPE.RECENT:
      reviewsToFilter = reviewsToFilter.filter(function(a) {
        return new Date(a.date) >= period;
      });
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.date - a.date;
      });
    break;
        
    case FILTER_TYPE.GOOD:
      reviewsToFilter = reviewsToFilter.filter(function(a) {
          return a.rating >= 3;
      });
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
        
    case FILTER_TYPE.BAD:
      reviewsToFilter = reviewsToFilter.filter(function(a) {
        return a.rating <= 2;
      });
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
        
    case FILTER_TYPE.POPULAR:
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