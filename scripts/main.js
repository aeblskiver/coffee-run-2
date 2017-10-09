(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var RANGE_SELECTOR = '[data-coffee-range="range"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://localhost:2403/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  //var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('ncc-1701', remoteDS);

  //Exporting myTruck to the global mainspace
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var rangeHandler = new FormHandler(RANGE_SELECTOR);

  //use myTruck's createOrder function for a callback
  //but you have to bind the function to myTruck because
  //the owner of the function changes inside the callback?
  //To clarify - 'this' will refer to formhandler inside the method call
  //Thus it would be an error
  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function() {
        checkList.addRow.call(checkList, data);
      });
  });

  rangeHandler.addRangeHandler(rangeHandler.changeRating);
  console.log(formHandler);

  formHandler.addInputHandler(Validation.isCompanyEmail);

  myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
