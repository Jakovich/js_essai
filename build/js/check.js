"use strict";

function getMessage(a, b) {

  switch (typeof a) {
    case "boolean":
      if (a) {
        var fireSuccesMessage = "Я попал в " + b;
        return fireSuccesMessage;
      }
      else {
        return "Я никуда не попал";
      };
      break;

    case "number":
      var jumpHeight = a * 100;
      var jumpMessage = "Я прыгнул на " + jumpHeight + " сантиметров";
      return jumpMessage;
      break;

    case "object":
      if (typeof b == "object"){
        /*если массивы разные по длине выбор самого короткого, чтобы не получить значение Nan*/
        if (a.length > b.length) {
          var distanceCount = b.reduce(function (sum, elem, i) {
          return (sum + (elem * a[i]));
          }, 0);
        }
        else {
          var distanceCount = a.reduce(function (sum, elem, i) {
          return (sum + (elem * b[i]));
          }, 0);
        }

        var distanceMessage = "Я прошёл " + distanceCount + " метров"
        return distanceMessage;
      }
      else {
        var stepCount = a.reduce(function(sum, current) {
        return sum + current;
        }, 0);
        var stepMessage = "Я прошёл " + stepCount + " шагов";
        return stepMessage;
      };
      break;
  };
};








