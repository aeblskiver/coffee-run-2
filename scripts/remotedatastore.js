(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    return $.ajax(this.serverUrl, {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(val),
      success: function() {
        console.log('Successful add');
      },
      error: function(serverResponse) {
        console.log(serverResponse.responseText);
      }
    });
  };

  RemoteDataStore.prototype.getAll = function() {
    return $.ajax(this.serverUrl, {
      type: 'GET',
      success: function() {
        console.log('GetAll successs');
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  RemoteDataStore.prototype.get = function(key) {
    return $.ajax(this.serverUrl + '?emailAddress=' + key, {
      type: 'GET',
      success: function(order) {
        console.log('Get success:' + order);
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    var url = this.serverUrl;
    return $.ajax(url + '?emailAddress=' + key, {
      type: 'GET',
      success: function (serverResponse) {
        console.log(serverResponse[0]['id']);
        var id = serverResponse[0]['id'];
        $.ajax(url + '/' + id, {
          type: 'DELETE',
          success: function (serverResponse) {
            console.log(serverResponse);
          },
          error: function (serverResponse) {
            console.log(serverResponse);
          }
        });
      },
      error: function (serverResponse) {
        console.log('Fail' + serverResponse.responseText);
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

}(window));
