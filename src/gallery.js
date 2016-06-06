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
      self.numberPhoto = self.galleryArray.indexOf(event.target.getAttribute('src'));   
      location.hash = 'photo/' + event.target.getAttribute('src');
    }
  };
  
  //функция создания массива  с src изображений
  
  this.getPhotos = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.galleryArray.push(arr[i].getAttribute('src'));
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
      location.hash = 'photo/' + self.galleryArray[self.numberPhoto];
    }
  };

//функция перелистывания галереи влево
  this._onPrevClick = function() {
    if (self.numberPhoto > 0) {
      --self.numberPhoto;
      location.hash = 'photo/' + self.galleryArray[self.numberPhoto];
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
    history.pushState('', document.title, window.location.pathname);
    self.galleryContainer.classList.add('invisible');
    window.removeEventListener('keydown', self._onDocumentKeyDown);
    self.galleryClose.removeEventListener('click', self._onNextClick);
    self.controlPrev.removeEventListener('click', self._onPrevClick);
    self.controlNext.removeEventListener('click', self._onNextClick);
  };
  
  //функция показа изображения
  
  this.showPhoto = function (num) { 
    if (typeof(num) === 'number') {
      self.photo.src = self.galleryArray[num];
      self.currentNumberContainer.innerHTML = num + 1;
      
    } else if (typeof(num) === 'string') {
      var found = num.match(/#photo\/(\S+)/);
      self.photo.src = found[1];
      self.currentNumberContainer.innerHTML = self.galleryArray.indexOf(found[1]) + 1;
      this.numberPhoto = self.galleryArray.indexOf(found[1]);
    }
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
  
  
  this.hashVerify = function() {
    if (location.hash) {
      if (location.hash.match(/#photo\/(\S+)/))
        var hashLink = location.hash.match(/#photo\/(\S+)/);
      self.showGallery(hashLink[1]);
    }
  };
  if (location.hash && location.hash.match(/#photo\/(\S+)/)) {
      self.showGallery(location.hash);
    }
  
  window.addEventListener('hashchange', function(){
    if (location.hash && location.hash.match(/#photo\/(\S+)/)) {
      self.showGallery(location.hash);
    }
  });

};


module.exports = new Gallery();










