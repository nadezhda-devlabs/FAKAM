'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
<<<<<<< HEAD
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;



	$('img.home-head').on('click',function(){
		console.log('gei');
	});

	}
]);
=======
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

        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100)
        };


        /*top3*/
        var top3 = {
            labels: ["Жан", "Дани", "Веско"],
            datasets: [{
                fillColor: "#7F1637",
                strokeColor: "#000000",
                highlightFill: "#047878",
                highlightStroke: "#000000",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }]
        }

        var ctx = document.getElementById("peoplePerDay").getContext("2d");
        window.myPie = new Chart(ctx).Pie(peoplePerDay);

        var ctx = document.getElementById("top3").getContext("2d");
        window.myBar = new Chart(ctx).Bar(top3, {
            responsive: true
        });
    }
]);


$('img.home-head').on('hover', function() {
    $('span.hidden').css('display', 'block');
});
>>>>>>> origin/master
