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
  
  
  //функция открытия галереи при клике на изображение
  
  this.photoClick = function(event) {
    event.preventDefault();
    if (event.target.tagName === 'IMG') {
      self.numberPhoto = self.galleryArray.indexOf(event.target.src); 
      self.showGallery(self.numberPhoto); 
    }
  };
  
  //функция создания массива  с src изображений
  
  this.getPhotos = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.galleryArray.push(arr[i].src);
    }
  };
  
  //функция скрытия стрелок управления
  this.hideControls = function() {
    self.controlPrev.style.visibility = (self.numberPhoto > 0) ? 'visible' : 'hidden';
    self.controlNext.style.visibility = (self.numberPhoto < self.galleryArray.length - 1) ? 'visible' : 'hidden';
  };
  
  //функция перелистывания галереи вправо
  this._onNextClick = function() {
    if(self.numberPhoto < self.galleryArray.length - 1) {
      ++self.numberPhoto;
      self.showPhoto(self.numberPhoto);
    }
  };

//функция перелистывания галереи влево
  this._onPrevClick = function() {
    if (self.numberPhoto > 0) {
      --self.numberPhoto;
      self.showPhoto(self.numberPhoto);
    } 
  };
  
  //функция скрытия галареи при нажатии на клавишу esc
  this._onDocumentKeyDown = function(event) {
    var escKey = 27; //код клавиши esc
    if (event.keyCode === escKey) {
      if (!self.galleryContainer.classList.contains('invisible')) {
        self.hideGallery();
      }
    }
  };
  
  //функция закрытия галереи
  this.hideGallery = function() {
    self.galleryContainer.classList.add('invisible');
    window.removeEventListener('keydown', self._onDocumentKeyDown);
    self.galleryClose.removeEventListener('click', self._onNextClick);
    self.controlPrev.removeEventListener('click', self._onPrevClick);
    self.controlNext.removeEventListener('click', self._onNextClick);
  };
  
  //функция показа изображения
  
  this.showPhoto = function (num) { 
    self.photo.src = self.galleryArray[num];
    self.currentNumberContainer.innerHTML = num + 1;
    self.totalNumberContainer.innerHTML = self.galleryArray.length;
    self.hideControls();
  };

  //функция скрытия галареи при клике по крестику
  this._onCloseClick = function() {
    self.hideGallery();
  };
  
  this.showGallery = function(photoNumber) {
    if (self.galleryContainer.classList.contains('invisible')) {
      self.galleryContainer.classList.remove('invisible');
    }

    self.showPhoto(photoNumber);

    window.addEventListener('keydown', self._onDocumentKeyDown);
    self.galleryClose.addEventListener('click', self._onCloseClick);
    self.controlPrev.addEventListener('click', self._onPrevClick);
    self.controlNext.addEventListener('click', self._onNextClick);
  };


  this.itemForShow = self.getPhotos(this.photoItems);
  this.photoGallery.addEventListener('click', self.photoClick);

};


module.exports = new Gallery();










