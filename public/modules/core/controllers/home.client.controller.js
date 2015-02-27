'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        /*people per day*/
        var peoplePerDay = [{
            value: 12,
            color: "#7F1637",
            highlight: "#000000",
            label: "Понеделник"
        }, {
            value: 15,
            color: "#047878",
            highlight: "#000000",
            label: "Вторник"
        }, {
            value: 10,
            color: "#FFB733",
            highlight: "#000000",
            label: "Сряда"
        }, {
            value: 9,
            color: "#F57336",
            highlight: "#000000",
            label: "Четвъртък"
        }, {
            value: 5,
            color: "#C22121",
            highlight: "#000000",
            label: "Петък"
        }, {
            value: 0,
            color: "#4D5360",
            highlight: "#000000",
            label: "Събота"
        }, {
            value: 3,
            color: "#4D5360",
            highlight: "#000000",
            label: "Неделя"
        }];

        var ctx = document.getElementById("peoplePerDay").getContext("2d");
        window.myPie = new Chart(ctx).Pie(peoplePerDay);
    }
]);


$('img.home-head').on('hover', function() {
    $('span.hidden').css('display', 'block');
});