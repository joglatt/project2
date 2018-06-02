$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    var currentId = data.id;

    getUserId(currentId);
  });

  function getUserId(userId) {
    var typeInput = $("input#wtype");
    var durationInput = $("input#duration");
    var calorieData= 40;
    $("form.workout").on("submit", function(event) {
      event.preventDefault();
      var workout = {
        id: userId,
        type: typeInput.val(),
        duration: durationInput.val(),
        calories:calorieData
      };
      $.post("/api/workout_data", workout, function(data) {
        if (data) {
          alert("Workout input");
        }
      });
    });
  }
});
