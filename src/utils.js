'use strict';
module.exports = {
  
  isNextPageAvailable: function(reviews, page, pageSize) {
    return page < Math.floor(reviews.length / pageSize);
  },
  
  isElementVisible: function(element) {
    var isVisible = element.getBoundingClientRect().bottom >= 0;
    return isVisible;
  }
}

