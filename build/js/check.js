"use strict";

function multiplOfArrays(arr1, arr2) {
  var length = 0;
  if (arr1.length > arr2.length){
    for (var i = 0; i < arr1.length; i++) {
      length += arr1[i] * arr2[i];
    }
    return length;
  }
  else {
    for (var i = 0; i < arr2.length; i++) {
      length += arr2[i] * arr1[i];
    }
    return length;
  }
};

function getMessage(a, b) {

  switch (typeof a) {
    case "boolean":
      if(a) {
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
        var distanceCount= multiplOfArrays(a,b);
        var distanceMessage = "Я прошёл " + distanceCount + " метров"
        return distanceMessage;
      }
      else {
        var stepCount = a.reduce(function(sum, current) {
        return sum + current;
        });
        var stepMessage =  "Я прошёл "+ stepCount + " шагов";
        return stepMessage;
      };
      break;
  };
};








