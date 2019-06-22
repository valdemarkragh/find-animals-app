// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function (angular) {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind( this ), false);

    var loc = angular.module('locFinder', []);
    loc.controller('locFinderController', ['$scope', '$http', function ($scope, $http) {
        $scope.lat = 0;
        $scope.long = 0;
        
      
        this.getLocation = function getLocation() {
            
            navigator.geolocation.getCurrentPosition(this.onLocationFound);
        };
        this.onLocationFound = function onLocationFound(position) {
            $scope.$apply(function () {
                $scope.lat = position.coords.latitude;
                $scope.long = position.coords.longitude;

            })
        };


       
        

        this.saveLocation = function saveLocation() {

            
      
            
            $http({
                method: 'POST',
                url: 'http://valdemarkragh.dk/rehome/savelocation.php',
                data: { 'description': $scope.description, 'lat': $scope.lat, 'long': $scope.long }
                
            }).then(function (success) {
                $scope.lat = 0;
                $scope.long = 0;
                $scope.description = "";
                alert('Dit dyr er registreret')
            }, function (error) {
                alert('cant insert');
                });
           
        };

        this.findAnimals = function findAnimals() {
            
            $scope.animals = [];

            var path = 'http://valdemarkragh.dk/rehome/findanimals.php?lat='+$scope.lat+'&long='+$scope.long+'&distance='+$scope.distance;

            $http({

                method: 'GET',
                url: path,
                data: { 'lat': $scope.lat, 'long': $scope.long }

            }).then(function (result) {

                $scope.animals = result.data;

                console.log(result);
                alert('finder dyr')
                

            }, function (error) {
                alert('cant find any animals');
            });

        };

        $scope.IsHidden = true;
        $scope.ShowHide = function () {
            //If DIV is hidden it will be visible and vice versa.
            $scope.IsHidden = $scope.IsHidden ? false : true;
        }

    }]);
            
    
 

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };


    
} )(window.angular);