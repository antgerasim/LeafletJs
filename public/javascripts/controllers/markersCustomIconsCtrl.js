/**
 * Created by agerasimov on 21.07.2017.
 */
(function () {
    'use strict';

    angular
        .module('donApp')
        .controller('markersCustomIconsCtrl', markersCustomIconsCtrl);

    markersCustomIconsCtrl.$inject = ['$scope'];

    /* @ngInject */
    function markersCustomIconsCtrl($scope) {
        var vm = this;
        vm.title = 'markersCustomIconsCtrl';

        activate();

        ////////////////

        function activate() {
            $scope.$on('$viewContentLoaded',function (e) {
                console.log('$viewContentLoaded event fired');

                var map = L.map('mapid').setView([51.5,-0.09],13);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

/*                var greenIcon = L.icon({
                    iconUrl: 'images/leaf-green.png',
                    shadowUrl: 'leaf-shadow.png',

                    iconSize:     [38, 95], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                });*/

                var LeafIcon = L.Icon.extend({
                    options:{
                        shadowUrl:'images/leaf-shadow.png',
                        iconSize:[38,95],
                        shadowSize:[50,64],
                        iconAnchor:[22,94],
                        shadowAnchor:[4,62],
                        popupAnchor:[-3,-76]
                    }
                });

                var greenIcon = new LeafIcon({iconUrl:'images/leaf-green.png'}),
                    redIcon = new LeafIcon({iconUrl:'images/leaf-red.png'}),
                    orangeIcon = new LeafIcon({iconUrl:'images/leaf-orange.png'})

               // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
                L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");
                L.marker([51.495, -0.083], {icon: redIcon}).addTo(map).bindPopup("I am a red leaf.");
                L.marker([51.49, -0.1], {icon: orangeIcon}).addTo(map).bindPopup("I am an orange leaf.");



            })
        }
    }

})();

