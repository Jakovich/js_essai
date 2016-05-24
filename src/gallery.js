'use strict';

var gallery = document.querySelector(".overlay-gallery");

var galleryClose = gallery.querySelector(".overlay-gallery-close");

var controlPrev = gallery.querySelector(".overlay-gallery-control-left");

var controlNext = gallery.querySelector(".overlay-gallery-control-right");

var galleryPreview = gallery.querySelector(".overlay-gallery-preview");

var galleryArray = [];

var galleryGet = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    galleryArray[i] = arr[i];
  }
};


var galleryShow = function(photoNumber) {
  if (gallery.classList.contains("invisible")) {
    gallery.classList.remove("invisible");
  }
  window.addEventListener("keydown", _onDocumentKeyDown);
  galleryClose.addEventListener("click", _onNextClick);
  controlPrev.addEventListener("click", _onPrevClick);
  controlNext.addEventListener("click", _onNextClick);
};

var _onCloseClick = function() {
  hideGallery();
}


var _onDocumentKeyDown = function(event) {
  if (event.keyCode === 27) {
    if (!gallery.classList.contains("invisible")) {
      hideGallery();
    }
  }
};

var _onNextClick = function() {
  
};

var _onPrevClick = function() {
  
};

var hideGallery = function() {
  gallery.classList.add("invisible");
  window.removeEventListener("keydown", _onDocumentKeyDown);
  galleryClose.removeEventListener("click", _onNextClick);
  controlPrev.removeEventListener("click", _onPrevClick);
  controlNext.removeEventListener("click", _onNextClick);
}







