(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var OUTPUT_SELECTOR = '[data-coffee-output="text"]';

  function FormHandler(selector) {
    //Code will go here
    if (!selector) {
      throw new Error('No Selector Provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find elements with selector: ' + selector);
    }
  }

  //fn is a function callback
  //used for submitting orders to myTruck
  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {
      event.preventDefault();

      //$(this) wraps the values of the form in an object
      //which gives access to serializeArray()
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset(); //reset the form
      this.elements[0].focus(); //give focus to first form element
    });
  };

  FormHandler.prototype.addRangeHandler = function(fn) {
    console.log('Setting range handler');
    var caffeineValue = 0;
    this.$formElement.on('input', function(event) {
      event.preventDefault();
      caffeineValue = this.value;
      console.log('Caffeine level is ' + caffeineValue);
      fn(caffeineValue);
    });
  };

  FormHandler.prototype.changeRating = function(value) {
    var output = document.querySelector(OUTPUT_SELECTOR);
    var caffeine = '';
    if (value < 33) {
      caffeine = 'low-caffeine';
    } else if (value > 80) {
      caffeine = 'high-caffeine';
    } else {
      caffeine = 'med-caffeine';
    }
    output.classList.remove('low-caffeine', 'med-caffeine', 'high-caffeine');
    output.classList.add(caffeine);
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
