'use strict';

var photoGallery = document.querySelector('.photogallery');
var photoItems = photoGallery.querySelectorAll('.photogallery-image img');

var galleryContainer = document.querySelector('.overlay-gallery');

var galleryClose = galleryContainer.querySelector('.overlay-gallery-close');

var controlPrev = galleryContainer.querySelector('.overlay-gallery-control-left');

var controlNext = galleryContainer.querySelector('.overlay-gallery-control-right');

var galleryPreview = galleryContainer.querySelector('.overlay-gallery-preview');

var galleryArray = [];
var photoSrc = [];

//яункция создания массива  с src изображений
var getPhotos = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    photoSrc.push(arr[i].src);
  }
};

getPhotos(photoItems);

var photoClick = function() {
  photoGallery.addEventListener('click', function(event){
    event.preventDefault();
    if (event.target.tagName === 'IMG') {
      var numberPhoto = photoSrc.indexOf(event.target.src); 
      showGallery(numberPhoto);
    }
  })
};

photoClick();




var galleryGet = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    galleryArray[i] = arr[i];
  }
};


var showGallery = function(photoNumber) {
  if (galleryContainer.classList.contains('invisible')) {
    galleryContainer.classList.remove('invisible');
  }
  window.addEventListener('keydown', _onDocumentKeyDown);
  galleryClose.addEventListener('click', _onNextClick);
  controlPrev.addEventListener('click', _onPrevClick);
  controlNext.addEventListener('click', _onNextClick);
};

var _onCloseClick = function() {
  hideGallery();
}


var _onDocumentKeyDown = function(event) {
  if (event.keyCode === 27) {
    if (!galleryContainer.classList.contains('invisible')) {
      hideGallery();
    }
  }
};

var _onNextClick = function() {
  
};

var _onPrevClick = function() {
  
};

var hideGallery = function() {
  gallery.classList.add('invisible');
  window.removeEventListener('keydown', _onDocumentKeyDown);
  galleryClose.removeEventListener('click', _onNextClick);
  controlPrev.removeEventListener('click', _onPrevClick);
  controlNext.removeEventListener('click', _onNextClick);
}







