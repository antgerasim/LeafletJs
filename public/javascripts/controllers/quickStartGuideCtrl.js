/**
 * Created by agerasimov on 20.07.2017.
 */
(function () {
    'use strict';

    angular
        .module('donApp')
        .controller('quickStartGuideCtrl', leafletDocCtrl);

    leafletDocCtrl.$inject = ['$scope'];

    /* @ngInject */
    function leafletDocCtrl($scope) {
        $scope.title = 'passRegisterCtrl';

        activate();

        ////////////////

        function activate() {

            $scope.$on('$viewContentLoaded', function () {
                console.log('$viewContentLoaded don');

                var mymap = L.map('mapid').setView([51.505, -0.09], 13);

                // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG9uYW50b2luZSIsImEiOiJjajVjOThoemUwNjQ5MzJxYnEwZTE0dDgxIn0.3aDNjYtE_q1WRubymiPGjw', {

                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(mymap);

                var marker =  L.marker([51.5, -0.09]).addTo(mymap);

                var circle = L.circle([51.508,-0.11],{
                    color:'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(mymap);

                var polygon = L.polygon([
                    [51.509, -0.08],
                    [51.503, -0.06],
                    [51.51, -0.047]
                ]).addTo(mymap);

                marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
                circle.bindPopup("Im a circle");
                polygon.bindPopup("Im a polygon");

                var popup = L.popup()
                    .setLatLng([51.5, -0.09])
                    .setContent("Im a standalone popup.")
                    .openOn(mymap);



                var popup = L.popup();

                function onMapClick(e) {
                    //console.log("You clicked the map at " + e.latlng);
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(mymap);
                }

                mymap.on('click', onMapClick);

            })
        }
    }

})();

