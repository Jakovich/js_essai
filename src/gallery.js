'use strict';

var photoGallery = document.querySelector('.photogallery');
var photoItems = photoGallery.querySelectorAll('.photogallery-image img');

var galleryContainer = document.querySelector('.overlay-gallery');

var galleryClose = galleryContainer.querySelector('.overlay-gallery-close');

var controlPrev = galleryContainer.querySelector('.overlay-gallery-control-left');

var controlNext = galleryContainer.querySelector('.overlay-gallery-control-right');

var galleryPreview = galleryContainer.querySelector('.overlay-gallery-preview');

var currentNumberContainer = galleryContainer.querySelector('.preview-number-current');

var totalNumberContainer = galleryContainer.querySelector('.preview-number-total');

var photoSrc = [];
var galleryArray = [];
var photo = new Image(600,500);
var numberPhoto;
var currentPhoto = 0;
galleryPreview.appendChild(photo);

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
      numberPhoto = galleryArray.indexOf(event.target.src); 
      showGallery(numberPhoto);
      
    }
  })
};

//функция скрытия стрелок управления
var hideControls = function() {
  if(numberPhoto > 0) {
    controlPrev.style.visibility = "visible";
  } else {
    controlPrev.style.visibility = "hidden";
  }
  if(numberPhoto < galleryArray.length - 1) {
    controlNext.style.visibility = "visible";
  } else {
    controlNext.style.visibility = "hidden";
  }
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

var showPhoto = function (num) { 
  photo.src = galleryArray[num];
  currentNumberContainer.innerHTML = num + 1;
  totalNumberContainer.innerHTML = galleryArray.length;
  hideControls();
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
  if(numberPhoto < galleryArray.length - 1) {
    ++numberPhoto;
    showPhoto(numberPhoto);
  }
};

var _onPrevClick = function() {
  if (numberPhoto > 0) {
    --numberPhoto;
    showPhoto(numberPhoto);
  } 
};



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









