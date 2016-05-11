'use strict';
var setTimeofExpires = function () {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var birthDate = new Date(currentYear, 2, 6);
  if (currentDate <= birthDate) {
    birthDate = new Date(currentYear - 1, 2, 6);
  }
  var expireDateMilisec = currentDate - birthDate;;
  var expireDate = Math.floor(expireDateMilisec / 3600 / 24 / 1000);
  return expireDate;
}

module.exports = setTimeofExpires;