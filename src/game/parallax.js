'use strict';
var cloudElement = document.querySelector('.header-clouds');
var isCloudVisible = true;

cloudElement.style.backgroundPosition = '0 0';


var scrollCloud = function() {
  window.addEventListener('scroll', function() {
    if(!isCloudVisible) {
      return false;
    }
    var scrolled = window.pageYOffset;
    cloudElement.style.backgroundPosition = -scrolled + 'px';
  });
  }

module.exports = scrollCloud;

