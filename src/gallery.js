'use strict';

var  Gallery = function() {
  
  var self = this;
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.galleryClose = this.galleryContainer.querySelector('.overlay-gallery-close');
  this.controlPrev = this.galleryContainer.querySelector('.overlay-gallery-control-left');
  this.controlNext = this.galleryContainer.querySelector('.overlay-gallery-control-right');
  this.galleryPreview = this.galleryContainer.querySelector('.overlay-gallery-preview');
  this.currentNumberContainer = this.galleryContainer.querySelector('.preview-number-current');
  this.totalNumberContainer = this.galleryContainer.querySelector('.preview-number-total');
  this.photoGallery = document.querySelector('.photogallery');
  this.photoItems = this.photoGallery.querySelectorAll('.photogallery-image img');
  this.galleryArray = [];
  this.photo = new Image(600);
  this.numberPhoto;
  this.currentPhoto = 0;
  this.galleryPreview.appendChild(this.photo);
  
  
  
  
  //функция создания массива  с src изображений
  
  this.getPhotos = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.galleryArray.push(arr[i].getAttribute('src'));
    }
  };
  
  this.photoClick = this.photoClick.bind(this);
  
  this.hideGallery = this.hideGallery.bind(this);
  
  this.showGallery = this.showGallery.bind(this);
  
  this._onCloseClick = this._onCloseClick.bind(this);
  
  this.showPhoto = this.showPhoto.bind(this);
  
  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  
  this._onNextClick = this._onNextClick.bind(this);
  
  this._onPrevClick = this._onPrevClick.bind(this);
  
  this.hideControls = this.hideControls.bind(this);

  this.itemForShow = self.getPhotos(this.photoItems);
  
  this.photoGallery.addEventListener('click', this.photoClick);
  
  this.hashVerify();
  
  window.addEventListener('hashchange', this.hashVerify.bind(this));

};



Gallery.prototype.hashVerify = function() {
  if (location.hash && location.hash.match(/#photo\/(\S+)/)) {
    var hashLink = location.hash.match(/#photo\/(\S+)/);
    this.showGallery(hashLink[1]);
  }
};


//функция открытия галереи при клике на изображение
Gallery.prototype.photoClick = function(event) {
  event.preventDefault();
  var currentSrc = event.target.getAttribute('src');
  if (event.target.tagName === 'IMG') {
    this.numberPhoto = this.galleryArray.indexOf(currentSrc);   
    location.hash = 'photo/' + currentSrc;
  }
};

//функция закрытия галереи
Gallery.prototype.hideGallery = function() {
  history.pushState('', document.title, window.location.pathname);
  this.galleryContainer.classList.add('invisible');
  window.removeEventListener('keydown', this._onDocumentKeyDown);
  this.galleryClose.removeEventListener('click', this.__onCloseClick);
  this.controlPrev.removeEventListener('click', this._onPrevClick);
  this.controlNext.removeEventListener('click', this._onNextClick);
};

//функция показа галереи
Gallery.prototype.showGallery = function(photoNumber) {
  if (this.galleryContainer.classList.contains('invisible')) {
    this.galleryContainer.classList.remove('invisible');
  }
  this.showPhoto(photoNumber);
  window.addEventListener('keydown', this._onDocumentKeyDown);
  this.galleryClose.addEventListener('click', this._onCloseClick);
  this.controlPrev.addEventListener('click', this._onPrevClick);
  this.controlNext.addEventListener('click', this._onNextClick);
};

 //функция показа изображения
Gallery.prototype.showPhoto = function (num) { 
  if (typeof(num) === 'number') {
    this.photo.src = this.galleryArray[num];
    this.currentNumberContainer.innerHTML = num + 1;
    
  } else if (typeof(num) === 'string') {
    
    this.photo.src = num;
    this.currentNumberContainer.innerHTML = this.galleryArray.indexOf(num) + 1;
    this.numberPhoto = this.galleryArray.indexOf(num);
  }
  this.totalNumberContainer.innerHTML = this.galleryArray.length;
  this.hideControls();
};

//функция скрытия галареи при клике по крестику
Gallery.prototype._onCloseClick = function() {
  this.hideGallery();
};

//функция скрытия галареи при нажатии на клавишу esc
Gallery.prototype._onDocumentKeyDown = function(event) {
  var escKey = 27; //код клавиши esc
  if (event.keyCode === escKey) {
    if (!this.galleryContainer.classList.contains('invisible')) {
      this.hideGallery();
    }
  }
};

//функция перелистывания галереи вправо
Gallery.prototype._onNextClick = function() {
  if(this.numberPhoto < this.galleryArray.length - 1) {
    ++this.numberPhoto;
    location.hash = 'photo/' + this.galleryArray[this.numberPhoto];
  }
};

//функция перелистывания галереи влево
Gallery.prototype._onPrevClick = function() {
  if (this.numberPhoto > 0) {
    --this.numberPhoto;
    location.hash = 'photo/' + this.galleryArray[this.numberPhoto];
  } 
};


//функция скрытия стрелок управления
Gallery.prototype.hideControls = function() {
  this.controlPrev.style.visibility = (this.numberPhoto > 0) ? 'visible' : 'hidden';
  this.controlNext.style.visibility = (this.numberPhoto < this.galleryArray.length - 1) ? 'visible' : 'hidden';
};


module.exports = new Gallery();










