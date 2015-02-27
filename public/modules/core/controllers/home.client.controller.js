'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Devlabsters',

    function($scope, Authentication, Devlabsters) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.devlabsters = Devlabsters.query();
        
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


        /*by day*/




            var mutual = {
                labels: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "#7F1637",
                        strokeColor: "#000000",
                        pointColor: "#047878",
                        pointStrokeColor: "#aaa",
                        pointHighlightFill: "#000",
                        pointHighlightStroke: "#000",
                        data: [0, 0, 1, 2, 3, 8, 9, 10, 11,12,12,12,13,10,8,5,0]
                    }
                ]
            };

        var ctx = document.getElementById("mutual").getContext("2d");
        window.myLine = new Chart(ctx).Line(mutual, {
            responsive: true
        });



    }
]);


$('img.home-head').on('hover', function() {
    $('span.hidden').css('display', 'block');
});

/*! konami-js v1.0.1 | http://mck.me/mit-license */
var Konami={};(function(d,e){var f=d.sequence=function(){var b=Array.prototype.slice.call(arguments),c=0;return function(a){a=a||e.event;a=a.keyCode||a.which||a;if(a===b[c]||a===b[c=0])a=b[++c],"function"===typeof a&&(a(),c=0)}};d.code=function(b){return f(38,38,40,40,37,39,37,39,66,65,b)}})(Konami,window);


$(document).on('keyup',

    Konami.code(function() {
            window.open('http://i442.photobucket.com/albums/qq144/iDyNaMiiK_x/tumblr_lt2mfeQfQ71qd7q8co1_400.gif');
    })

);
