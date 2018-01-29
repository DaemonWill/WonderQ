var managementApp = angular.module('managementApp', []);

/*
* TODO controller for the management ui presented for wonderQ
* current logic allows for Messages in the alive database to be created and/or deleted by the press of a button
*/

managementApp.controller('mgmtCtrl', function($scope,$http,$q) {
  /*
  * takes a random question string as input
  * adds a new Message document containing the input to the mongoDB database through the queue API
  * returns the new document's _id property
  */
  $scope.createMessage = function(question){
    //create a promise object to ensure a value is returned after the AJAX response is received
    var deferMessage = $q.defer();
    //Http get request, obtain _id prop from JSON and store it as a promise
    $http.post("http://localhost:8080/WonderQ/alive", {"question" : question})
          .then(function(response){
              deferMessage.resolve(response.data._id);
            },
          function(err){
            console.log(err);
          });
    return deferMessage.promise;
  };

  /*
  * gets a list of all the messages not currently being processed in the mongoDB db through the queue API
  * returns the list of Message objects in JSON format
  */
  $scope.getUnprocessedMessages = function(){
    //create a promise object to ensure a value is returned after the AJAX response is received
    var deferMessages = $q.defer();
    //Http get request, obtain _id prop from JSON and store it as a promise
    $http.get("http://localhost:8080/WonderQ/alive")
          .then(function(response){
              deferMessages.resolve(response.data);
    });
    return deferMessages.promise;
  };

  /*
  * takes a Message _id string as input
  * deletes a message from the mongoDB database through the API
  */
  $scope.processMessage = function(messageId){
    $http.delete("http://localhost:8080/WonderQ/alive", {"_id" : messageId})
          .then(function(response){});
  };

  $scope.killProducers = false;

  $scope.killConsumers = false;

  $scope.killProducersSwitch = function(){
    $scope.killProducers = !$scope.killProducers;
  };

  $scope.killConsumersSwitch = function(){
    $scope.killConsumers = !$scope.killConsumers;
  };

  /**
  *onClick handler for addProducers button, continuously calls createMessage() unless killProducers is true
  */
  $scope.addProducer = function(){
      var randomTime = Math.floor(Math.random() * 4000) + 1000;
      setTimeout($scope.createMessage, randomTime, "randomQuestion");
  };

  /**
  *onClick handler for addConsumers button,
  *continuously runs a sequence of fetching messages from the db with getUnprocessedMessages()
  *and processMessage() which deletes them
  */
  $scope.addConsumer = function(){
      var randomTime = Math.floor(Math.random() * 4000) + 2000;
      setTimeout(function(){
        var messages = $scope.getUnprocessedMessages();
        console.log(messages);
        for(i in messages){
          var messageId = messages[i]._id;
          $scope.processMessage(messageId);
        }
      }, randomTime);
    };
});
