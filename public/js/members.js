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
    var calorieData = 40;
    $("form.workout").on("submit", function(event) {
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

  function table(userId){
    $.ajax("/api/workout_data", {
      type: "GET",
      data: userId,
      success: function (data) {
          // console.log(data);   
      },
    }).then(function(data) {
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i].WID + " | " + data[i].UID + " | " + data[i].type + " | " + data[i].duration + " | " + data[i].calories);
          var workoutID = data[i].WID;
          var workoutUserId = data[i].UID;
          var workoutType = data[i].type;
          var workoutDuration = data[i].duration;
          var workoutCalories = data[i].calories;
          console.log(workoutID, workoutUserId, workoutType, workoutDuration, workoutCalories)
          var tableContent = "<tr><td>" + workoutID + "</td><br><td>" + workoutUserId + "</td><td>" + workoutType + "</td><td>" + workoutDuration + "</td><td>" + workoutCalories + "</td></tr>";
        };
        $("#workoutTable").html("<tr><th>Workout ID</th><br><th>User ID</th><br><th>Type</th><br><th>Duration</th><br><th>Calories</th><tr>" + tableContent);
    
    });
  }
});

