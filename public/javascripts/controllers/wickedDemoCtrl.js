(function () {
    'use strict';

    angular
        .module('donApp')
        .controller('wickedDemoCtrl', wickedDemoCtrl);

    wickedDemoCtrl.$inject = ['$scope'];

    /* @ngInject */
    function wickedDemoCtrl($scope) {
        var vm = this;
        vm.title = 'Wicked Demo';

        activate();

        ////////////////

        function activate() {
            $scope.$on('$viewContentLoaded', function () {
                console.log('$viewContentLoaded don');
                //<body onload="app.map=app.init();app.mapIt(true, false);">
                var map = {};

                (function init() {
                    var leaflet;
                    var that;
                    that = this;

                    leaflet = {
                        baseLayers: undefined,
                        overlays: undefined
                    };

                    // Stamen //////////////////////////////////////////////////////////////////////

                    leaflet.baseLayers = {
                        'Stamen Toner Map': L.tileLayer.provider('Stamen.Toner')
                    };

                    // Configure map ///////////////////////////////////////////////////
                    leaflet.map = L.map('canvas', {
                        zoomControl: true,
                        attributionControl: true,
                        layers: [
                            leaflet.baseLayers['Stamen Toner Map'],
                        ]
                    });

                    leaflet.map.defaults = {
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

                    // Set event handlers //////////////////////////////////////////////
                    leaflet.map.loaded = false;
                    leaflet.map.on('load', function () {
                        if (!this.loaded) {
                            this.loaded = true;
                            document.getElementById('wkt').value = 'MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20)))';
                        }
                    });

                    // There are no 'edit' events, so let's catch editing at its most
                    //  fundamental: the mouseup event on the map
                    leaflet.map.on('mouseup', function () {
                        that.updateText()
                    });

                    // Initialize the map //////////////////////////////////////////////
                    leaflet.map.setView([10, 20], 2);

                    return leaflet.map;
                })();


                (function mapIt(editable, focus) {
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

                    config = this.map.defaults;
                    config.editable = editable;

                    obj = wkt.toObject(this.map.defaults); // Make an object

                    // Add listeners for overlay editing events
                    if (wkt.type === 'polygon' || wkt.type === 'linestring') {
                    }

                    if (Wkt.isArray(obj)) { // Distinguish multigeometries (Arrays) from objects
                        /*                  for (var i = 0; i < obj.length; i++) {
                         var obj1 = obj[i];

                         }*/
                        for (var i in obj) {
                            if (obj.hasOwnProperty(i) && !Wkt.isArray(obj[i])) {
                                obj[i].addTo(this.map);
                                this.features.push(obj[i]);
                            }
                        }
                    } else {
                        obj.addTo(this.map); // Add it to the map
                        this.features.push(obj);
                    }

                    // Pan the map to the feature
                    if (focus && obj.getBounds !== undefined && typeof obj.getBounds === 'function') {
                        // For objects that have defined bounds or a way to get them
                        this.map.fitBounds(obj.getBounds());
                    } else {
                        if (focus && obj.getLatLng !== undefined && typeof obj.getLatLng === 'function') {
                            this.map.panTo(obj.getLatLng());
                        }
                    }

                    return obj;
                })();

            });

        }
    }

})();

