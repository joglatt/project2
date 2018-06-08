$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    var currentId = data.id;

    getUserId(currentId);
    updateWeight(currentId);
    table(currentId);
  });

  function getUserId(userId) {
    var typeInput = $("#wtype");
    var durationInput = $("#duration");

    // var calorieData;
    $("form.workout").on("submit", function(event) {
      var calorieData;
      if (typeInput.val() === "cardio") {
        calorieData = durationInput.val() * 1;
      } else {
        calorieData = durationInput.val() * 0.5;
      }
      event.preventDefault();
      var workout = {
        id: userId,
        type: typeInput.val(),
        duration: durationInput.val(),
        calories: calorieData
      };
      $.post("/api/workout_data", workout, function(data) {
        if (data) {
          alert("Workout recorded");
        }
      });
    });
  }

  function updateWeight(userId) {
    var weightInput = $("input#weight");
    $("form.update").on("submit", function(event) {
      event.preventDefault();
      var newWeight = {
        id: userId,
        weight: weightInput.val()
      };
      $.ajax("/api/user_data/", {
        type: "PUT",
        data: newWeight
      }).then(function() {
        console.log("changed weight to", newWeight.weight);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  }

  function table(userId) {
    $.ajax("/api/workout_data", {
      type: "GET",
      data: userId,
      success: function(data) {
        // console.log(data);
      }
    }).then(function(data) {
      var tableContent = "";
      var categories = [];
      var calories = [];
      for (var i = data.length - 7; i < data.length; i++) {
        // console.log(data[i].WID + " | " + data[i].UID + " | " + data[i].type + " | " + data[i].duration + " | " + data[i].calories);
        categories.push(data[i].type);
        calories.push(data[i].calories);
        var workoutID = data[i].WID;
        var workoutUserId = data[i].UID;
        var workoutType = data[i].type;
        var workoutDuration = data[i].duration;
        var workoutCalories = data[i].calories;
        // console.log(workoutID, workoutUserId, workoutType, workoutDuration, workoutCalories);
        tableContent += "<tr><td>" + workoutID + "</td><td>" + workoutUserId + "</td><td>" + workoutType + "</td><td>" + workoutDuration + "</td><td>" + workoutCalories + "</td></tr>";

      };

      $("#workoutTable").html("<table id=\"workoutsList\" class=\"table\"><tr><th>Workout ID</th><th>User ID</th><th>Type</th><th>Duration</th><th>Calories</th><tr>" + tableContent + "</table>");


 
      console.log(data);
      var $container = $("#workoutDurationChart").appendTo(
        "#workoutDurationChart"
      );


      window.chart = new Highcharts.Chart({
        chart: {
          renderTo: $container[0],
          type: "column",
          height: 400
        },

        xAxis: {
          categories: categories,
          title: {
            text: ""
          }
        },

        yAxis: {
          title: {
            text: "Calories"
          }
        },

        title: {
          text: "Workout History"
        },

        plotOptions: {
          series: {
            allowPointSelect: true
          }
        },

        series: [
          {
            showInLegend: false,
            // series.data is what we will need to fill with stats for the chart
            // dummy numbers
            data: calories
          }
        ]
      });
    });
  }
});
