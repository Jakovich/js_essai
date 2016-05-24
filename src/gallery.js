'use strict';

var photoGallery = document.querySelector('.photogallery');
var photoItems = photoGallery.querySelectorAll('.photogallery-image img');

var galleryContainer = document.querySelector('.overlay-gallery');

var galleryClose = galleryContainer.querySelector('.overlay-gallery-close');

var controlPrev = galleryContainer.querySelector('.overlay-gallery-control-left');

var controlNext = galleryContainer.querySelector('.overlay-gallery-control-right');

var galleryPreview = galleryContainer.querySelector('.overlay-gallery-preview');

var photoSrc = [];
var galleryArray = [];


//яункция создания массива  с src изображений
var getPhotos = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    photoSrc.push(arr[i].src);
  }
};


//функция создания копии архива с src изображений
var getGallery = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    galleryArray[i] = arr[i];
  }
};




//функция открытия галереи при клике на изображение
var photoClick = function() {
  photoGallery.addEventListener('click', function(event){
    event.preventDefault();
    if (event.target.tagName === 'IMG') {
      var numberPhoto = galleryArray.indexOf(event.target.src); 
      showGallery(numberPhoto);
    }
  })
};


//функция показа галереи
var showGallery = function(photoNumber) {
  if (galleryContainer.classList.contains('invisible')) {
    galleryContainer.classList.remove('invisible');
  }
  showPhoto(photoNumber);
  
  window.addEventListener('keydown', _onDocumentKeyDown);
  galleryClose.addEventListener('click', _onCloseClick);
  controlPrev.addEventListener('click', _onPrevClick);
  controlNext.addEventListener('click', _onNextClick);
};


var _onCloseClick = function() {
  hideGallery();
};


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

var showPhoto = function (num) {
  galleryPreview.removeChild;
  var photo = new Image();
  photo.src = galleryArray[num];
  galleryPreview.appendChild(photo);
}

//функцяи закрытия галереи
var hideGallery = function() {
  galleryContainer.classList.add('invisible');
  window.removeEventListener('keydown', _onDocumentKeyDown);
  galleryClose.removeEventListener('click', _onNextClick);
  controlPrev.removeEventListener('click', _onPrevClick);
  controlNext.removeEventListener('click', _onNextClick);
};



getPhotos(photoItems);
getGallery(photoSrc);
photoClick();







