$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    var currentId = data.id;

    getUserId(currentId);
    updateWeight(currentId);
  });

  function getUserId(userId) {
    var typeInput = $("input#wtype");
    var durationInput = $("input#duration");
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
});

// $.ajax("/api/user_data/", {
//   type: "PUT",
//   data: newWeight
// }).then(
//   function() {
//     console.log("changed weight to", newWeight.weight);
//     // Reload the page to get the updated list
//     location.reload();
//   }
// );

// $.put("/api/user_data", newWeight, function(data) {
//   if (data) {
//     alert("Weight Updated");
//   }
// });
