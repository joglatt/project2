// $(document).ready(function () {

//     // I've got this chart reading as a workout duration chart but we can modify 
//     // based on which charts we are going to build. 
//     $(function () {
//         var $container = $('#workoutDurationChart').appendTo('#workoutDurationChart');

//         window.chart = new Highcharts.Chart({
//             chart: {
//                 renderTo: $container[0],
//                 type: 'column',
//                 height: 400
//             },

//             xAxis: {
//                 categories: ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'],
//                 title: {
//                     text: 'Weekdays'
//                 }
//             },

//             yAxis: {
//                 title: {
//                     text: 'Workout Length (mins)'
//                 }
//             },

//             title: {
//                 text: 'Workout Durations'
//             },

//             plotOptions: {
//                 series: {
//                     allowPointSelect: true
//                 }
//             },

//             series: [{
//                 showInLegend: false,
//                 // series.data is what we will need to fill with stats for the chart
//                 // dummy numbers
//                 data: [15, 45, 30, 60, 0, 90, 25]
//             }]
//         });
//     });

// });