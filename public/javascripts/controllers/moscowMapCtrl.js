(function () {
    'use strict';

    angular
        .module('donApp')
        .controller('moscowMapCtrl', moscowMapCtrl);

    moscowMapCtrl.$inject = ['$scope', '$http'];

    /* @ngInject */
    function moscowMapCtrl($scope, $http) {
        var vm = this;
        vm.title = 'moscowMap';

        activate();

        ////////////////

        function activate() {
            // code
            $scope.$on('$viewContentLoaded', function () {
                console.log('$viewContentLoaded don');
                jQuery.support.cors = true;

                //get soap ui wkt
                var wsUrl = 'https://agat.mos.ru/ovga-ws/IOVGAService?wsdl';
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ovga="OVGA-WS"> \n    <soapenv:Header/> \n    <soapenv:Body>\n        <ovga:createRoute>\n            <!--Optional:-->\n            <route-request stateNum="B655BP750"> \n                <!--1 or more repetitions:--> \n                <control-points type="3" lat="55.592194" lon="37.729282" address="МКАД 24 км"/> \n                <control-points type="3" lat="55.577665" lon="37.68611" address="МКАД 27 км"/> \n                <control-points type="3" lat="55.57583236694336" lon="37.6014404296875" address="МКАД 33 км"/> \n                <control-points type="3" lat="55.581062" lon="37.572759" address="МКАД 35 км"/>\n                <control-points type="3" lat="55.682877" lon="37.417095" address="МКАД 50 км"/> \n                <control-points type="3" lat="55.713477" lon="37.386003" address="МКАД 55 км"/>\n                <control-points type="1" lat="55.7168846" lon="37.4522285" address="ул. Артамонова, 1"/> \n                <control-points type="1" lat="55.7304878" lon="37.4412727" address="Кутузовский просп., 88"/>\n                <control-points type="1" lat="55.589108" lon="37.665617" address="Бирюлевская ул., 37"/> \n            </route-request> \n        </ovga:createRoute>\n    </soapenv:Body>\n</soapenv:Envelope>';
                var result = $http.get('/data/soapAgat.xml');
                result.then(function (resp) {
                    console.log(resp);

                    var myObj = new Array();
                    var xmlDoc = $.parseXML(resp.data);
                    var $xml = $(xmlDoc);
                    var $title = $xml.find("wkts").each(function (index, value) {

                        myObj.push({
                            wkt: $(this).attr('wkt'),
                            direction: $(this).attr('direction'),
                            admZone: $(this).attr('admZone')
                        });

                    });


                    $(myObj).each(function (index, value) {

                        //maprouteAction here!!

                        console.log(value.wkt);
                        console.log(value.direction);
                        console.log(value.admZone);
                    })


                });

                var mymap = L.map('mapid').setView([55.75067, 37.61708], 10);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG9uYW50b2luZSIsImEiOiJjajVjOThoemUwNjQ5MzJxYnEwZTE0dDgxIn0.3aDNjYtE_q1WRubymiPGjw', {

                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(mymap);


            })
        }
    }

})();

