//Hidden Main Menu
var menuLeft = document.getElementById( 'main-nav' ),
    showLeft = document.getElementById( 'show-left' ),
    body = document.body;

showLeft.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( menuLeft, 'cbp-spmenu-open' );
    disableOther( 'show-left' );
};

function disableOther( button ) {
    if( button !== 'show-left' ) {
        classie.toggle( showLeft, 'disabled' );
    }
}

//Linechart
var lineChartData = {
    labels : ["January","February","March","April","May","June"],
    datasets : [
        {
            fillColor : "rgba(144, 237, 224, .4)",
            strokeColor : "#00bfa5",
            pointColor : "#fff",
            pointStrokeColor : "#66EEDC",
            data : [203,156,99,251,305,247]
        },
        {
            fillColor : "rgba(144, 237, 224, .7)",
            strokeColor : "#01bfa5",
            pointColor : "#00897b",
            pointStrokeColor : "#66EEDC",
            data : [23,16,199,251,35,217]
        }
    ]
}
var lineChart = document.getElementById('lineChart').getContext('2d');
new Chart(lineChart).Line(lineChartData);

//Piechart
var pieChartData = [
    {
        value: 20,
        color:"#878BB6",
        label : "Label"
    },
    {
        value : 40,
        color : "#4dd0e1",
        label : "Label"
    },
    {
        value : 10,
        color : "#FF8153",
        label : "Label"
    },
    {
        value : 30,
        color : "#FFEA88",
        label : "Label"
    }
];
var pieChartOptions = {
    segmentShowStroke : false,
    animateScale : true
}
var pieChart= document.getElementById("pieChart").getContext("2d");
new Chart(pieChart).Pie(pieChartData, pieChartOptions);

//Doughnutchart
var doughnutChartData = [
    {
        value: 20,
        color:"#878BB6",
        label : "Label"
    },
    {
        value : 40,
        color : "#4dd0e1",
        label : "Label"
    },
    {
        value : 10,
        color : "#FF8153",
        label : "Label"
    },
    {
        value : 30,
        color : "#FFEA88",
        label : "Label"
    }
];
var doughnutChartOptions = {
    segmentShowStroke : false,
    animateScale : true
}
var doughnutChart= document.getElementById("doughnutChart").getContext("2d");
new Chart(doughnutChart).Doughnut(doughnutChartData, pieChartOptions);

//Barchart
var barChartData = {
    labels : ["January","February","March","April","May","June"],
    datasets : [
        {
            fillColor : "#31988A",
            strokeColor : "#48A4D1",
            data : [456,479,324,569,702,600]
        },
        {
            fillColor : "rgba(73,188,170,0.4)",
            strokeColor : "rgba(72,174,209,0.4)",
            data : [364,504,605,400,345,320]
        }

    ]
}
var barChart = document.getElementById("barChart").getContext("2d");
new Chart(barChart).Bar(barChartData);

$(document).ready(function() {

    $('.single-profile').show().addClass('animated fadeInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            jQuery(this).removeClass('animated fadeInDown');
        });

    //Fixed Panel on Scroll
    var elementPosition = jQuery('.fixed-panel').offset();
    jQuery(window).on('scroll', function() {
        if (jQuery(window).scrollTop() > (elementPosition.top + 300)) {
            jQuery('.fixed-panel').stop(true, true).css({
                'position': 'fixed',
                'top': 0,
                'width': '100%',
                'height': '75px',
                'z-index': 999
            });
        }
        else {
            jQuery('.fixed-panel').stop(true, true).css('position', 'relative');
        }
    });

    //Simple text rotator
    $("#rotating-word").Morphext({
        animation: "tada",
        separator: ",",
        speed: 3000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });

    //Search by name button and form
    $("#search-by-name-btn").on('click', function(){
        $(this).toggleClass("active");
        var isVisible = $('#search-by-name-form').is(':visible');
        if (isVisible) {
            $("#search-by-name-form").addClass('animated bounceOutRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                jQuery(this).addClass('hidden').removeClass('animated bounceOutRight');
            });
        }
        else {
            $("#search-by-name-form").removeClass('hidden').addClass('animated bounceInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                jQuery(this).removeClass('animated bounceInRight');
            });
        }
    });

    //Scroll to top button functionallity
    $("#scroll-top").on("click", function(){
        jQuery('html,body').animate({scrollTop:"0px"},500);
    });

    //Smooth scroll by main navigation items click
    $("#statistics-item").click(function() {
        $('html, body').animate({
            scrollTop: $("#statistics-panel").offset().top
        }, 1500);
    });
     $("#subscribe-item").click(function() {
        $('html, body').animate({
            scrollTop: $("#subscribe-panel").offset().top
        }, 1500);
    });

    //Initialize materialize select
    $('select').material_select();

    //Check/Uncheck all subscribe checkboxes
    $(".switch").on('click', function() {
        if ($('.switch input[type=checkbox]').is(":checked")) {
            $('.subscribe-checkboxes input[type=checkbox]').prop('checked', true);
        }
        else {
            $('.subscribe-checkboxes input[type=checkbox]').prop('checked', false);
        }
    });

    //Filter
    $('#filters button').on('click', function(){
        var status = $(this).attr('data-filter');
        $('.single-profile').hide();
        $('.' + status + ' .single-profile').show().addClass('animated fadeInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                jQuery(this).removeClass('animated fadeInDown');
            });
        // switch(status) {
        //     case 'offline':
        //         $('.offline .single-profile').show();
        //         break;
        //     case 'online':
        //         $('.online .single-profile').show();
        //         break;
        //     case 'away':
        //         $('.away .single-profile').show();
        //         break;
        //     default:
        //         $('.single-profile').show();
        // }
    });

});

//Show/Hide scroll to top button on scroll
$(document).scroll(function () {
    var containerHeight = $('#Container').height();
    var scrollHeight = $(this).scrollTop();
    if (scrollHeight > containerHeight) {
        $('#scroll-top').addClass('active')
    } else {
        $('#scroll-top').removeClass('active');
    }

});