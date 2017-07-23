(function () {
    'use strict';

    angular
        .module('donApp')
        .controller('wicketDemo2Ctrl', wicketDemo2Ctrl);

    wicketDemo2Ctrl.$inject = ['$scope'];

    /* @ngInject */
    function wicketDemo2Ctrl($scope) {
        var vm = this;
        vm.title = 'wicketDemo2';
        var map = {};

        vm.click = click;


        activate();

        ////////////////

        function activate() {
            $scope.$on('$viewContentLoaded', function () {
                console.log('$viewContentLoaded ' + vm.title);

                function onEachFeature(feature, layer) {
                    var popupContent = "<p>I started out as a GeoJSON " + feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

                    if (feature.properties && feature.properties.popupContent) {
                        popupContent += feature.properties.popupContent;
                    }
                    layer.bindPopup(popupContent);
                }




                // return;
                (function init() {
                    /*            var baseLayers = {
                     'Stamen Toner Map': L.tileLayer.provider('Stamen.Toner')
                     };*/

                    map = L.map('mapid', {
                        zoomControl: true,
                        attributionControl: true,
                        layers: [
                            //leaflet.baseLayers['Stamen Toner Map'],
                            L.tileLayer.provider('Stamen.Toner')
                        ]
                    });

                    map.defaults = {
                        icon: new L.Icon({
                            iconUrl: 'red_dot.png',
                            iconSize: [16, 16],
                            iconAnchor: [8, 8],
                            shadowUrl: 'dot_shadow.png',
                            shadowSize: [16, 16],
                            shadowAnchor: [8, 8]
                        }),
                        editable: true,
                        color: '#AA0000',
                        weight: 3,
                        opacity: 1.0,
                        //editable: true,
                        fillColor: '#AA0000',
                        fillOpacity: 0.2
                    };

/*                    map.loaded = false;
                    // Set event handlers //////////////////////////////////////////////
                    map.on('load', function () {
                        if (!this.loaded) {
                            this.loaded = true;
                            document.getElementById('wkt').value = 'MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20)))';
                        }
                    });

                    // There are no 'edit' events, so let's catch editing at its most
                    //  fundamental: the mouseup event on the map
                    map.on('mouseup', function () {
                        //that.updateText()
                        var wkt = new Wkt.Wkt();
                        wkt.fromObject(this.features[0]);
                        document.getElementById('wkt').value = wkt.write();
                    });*/

                    // Initialize the map //////////////////////////////////////////////
                    map.setView([10, 20], 2);
                })();

                (function wicket() {



                })();

/*                (function terraFormer2() {
                    var geojson = Terraformer.WKT.parse('LINESTRING (30 10, 10 30, 40 40)');
                    var geoBus = freeBus;


                    L.geoJSON(geojson, {
                        filter: function (feature, layer) {
                            if (feature.properties) {
                                //if the property "underConstruction" exists and is true, return false (dont render features under construction)
                                return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
                            }
                            return false;
                        },
                        onEachFeature: onEachFeature
                    }).addTo(map);

                })();*/

                /*                (function mapIt(editable, focus) {
                 var config, el, obj, wkt;

                 // Indicates that the map should pan and/or zoom to new features
                 focus = focus || false;

                 if (editable === undefined) {
                 editable = true;
                 }

                 el = document.getElementById('wkt');
                 wkt = new Wkt.Wkt();

                 if (el.last === el.value) { // Remember the last string
                 return; // Do nothing if the WKT string hasn't changed
                 } else {
                 el.last = el.value;
                 }

                 try { // Catch any malformed WKT strings
                 wkt.read(el.value);
                 } catch (e1) {
                 try {
                 wkt.read(el.value.replace('\n', '').replace('\r', '').replace('\t', ''));
                 } catch (e2) {
                 if (e2.name === 'WKTError') {
                 alert('Wicket could not understand the WKT string you entered. Check that you have parentheses balanced, and try removing tabs and newline characters.');
                 return;
                 }
                 }
                 }

                 //config = this.map.defaults;
                 config = map.defaults;

                 config.editable = editable;

                 //obj = wkt.toObject(this.map.defaults); // Make an object
                 obj = wkt.toObject(map.defaults); // Make an object


                 // Add listeners for overlay editing events
                 if (wkt.type === 'polygon' || wkt.type === 'linestring') {
                 }

                 if (Wkt.isArray(obj)) { // Distinguish multigeometries (Arrays) from objects
                 /!*                  for (var i = 0; i < obj.length; i++) {
                 var obj1 = obj[i];

                 }*!/
                 for (var i in obj) {
                 if (obj.hasOwnProperty(i) && !Wkt.isArray(obj[i])) {
                 obj[i].addTo(this.map);
                 //this.features.push(obj[i]);
                 }
                 }
                 } else {
                 //obj.addTo(this.map); // Add it to the map
                 obj.addTo(map); // Add it to the map

                 //this.features.push(obj);
                 }

                 // Pan the map to the feature
                 if (focus && obj.getBounds !== undefined && typeof obj.getBounds === 'function') {
                 // For objects that have defined bounds or a way to get them
                 //this.map.fitBounds(obj.getBounds());
                 map.fitBounds(obj.getBounds());


                 } else {
                 if (focus && obj.getLatLng !== undefined && typeof obj.getLatLng === 'function') {
                 //this.map.panTo(obj.getLatLng());
                 map.panTo(obj.getLatLng());

                 }
                 }

                 return obj;
                 })();*/

            })
        }

        function click() {
            var el = document.getElementById('wkt');
            var wkt = new Wkt.Wkt();

            wkt.read(el.value);

            var defaults = {
                icon: new L.Icon({
                    iconUrl: 'red_dot.png',
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                    shadowUrl: 'dot_shadow.png',
                    shadowSize: [16, 16],
                    shadowAnchor: [8, 8]
                }),
                editable: true,
                color: '#AA0000',
                weight: 3,
                opacity: 1.0,
                //editable: true,
                fillColor: '#AA0000',
                fillOpacity: 0.2
            };

            //var obj = wkt.toObject(map.defaults)
            var obj = wkt.toObject(defaults);

            if (Wkt.isArray(obj)) { // Distinguish multigeometries (Arrays) from objects
                for (var i in obj) {
                    if (obj.hasOwnProperty(i) && !Wkt.isArray(obj[i])) {
                        obj[i].addTo(map);
                        //this.features.push(obj[i]);
                    }
                }
            } else {
                obj.addTo(map); // Add it to the map
                //this.features.push(obj);
            }

            obj.addTo(map); // Add it to the map
        }
    }

})();

