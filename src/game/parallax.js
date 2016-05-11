'use strict';
var cloudElement = document.querySelector('.header-clouds');
var isCloudVisible = true;
var utils = require('../utils');
cloudElement.style.backgroundPosition = '0 0';
var scrollCloud = function() {
  var scrollTimeout;
  
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      isCloudVisible = utils.isElementVisible(cloudElement);
    }, 100);
    
    if(!isCloudVisible) {
      return false;
    }
    var scrolled = window.pageYOffset;
    cloudElement.style.backgroundPosition = -scrolled + 'px';
  });
};

module.exports = scrollCloud;

