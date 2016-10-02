angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LoginCtrl', function($scope, $timeout) {
  $scope.loginData.username = 'diana.man.91@gmail.com';
  $scope.logeado = false;
  $scope.verificado = false;

  $scope.loguear = function(){
    firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
    .catch(function(error){
      console.info("Error", error);
    })
    .then(function(user){
      //console.log(firebase.getCurrentUser());
      console.info("Respuesta", user);
      $timeout(function(){
        if(user){
          $scope.logeado = true;
          console.log(user.emailVerified);
          $scope.verificado = user.emailVerified;
        }
        else {
          alert("no loggeado");
        }
      });
    });
  }

  $scope.desloguear = function(){
    firebase.auth().signOut();
    $scope.logeado = false;
  }

  $scope.resetearPassword = function(){
    firebase.auth().sendPasswordResetEmail($scope.loginData.username).then(function(respuesta){
      console.info(respuesta);
    }).catch(function(error){
      console.info(error);
    });
  }

  $scope.verificarEmail = function(){
    firebase.auth().currentUser.sendEmailVerification().then(function(respuesta){
      console.info(respuesta);
    }).catch(function(error){
      console.info(error); 
    });
  }

  $scope.registrar = function(){
    firebase.auth().createUserWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
    .then(function(user){
      if(user){
        user.sendEmailVerification();
        console.info("Ok", user);
      }
      else{
        console.info("Error", user);
      }
    })
    .catch(function(error){
      console.info("Error", error);
    })
  }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
