$(document).ready(function() {

    var currentURL = window.location.origin
    $.ajax({
        method: "GET",
        url: currentURL + "/users"
    })
    // connection.query("SELECT * FROM Workouts", function(err, res){
    //     if (res.length > 0) {
    //         $("#allWorkouts").html("<tr><th>WID</th><th>UID</th><th>Type</th><th>Duration</th><th>Calories</th>" + tableContent);
    //     }else{
    //         $("#allWorkouts").text("No results found");
    //     };
    //     for (var i = 0; i < res.length; i++) {
    //         //Console logging for testing
    //         // console.log(res[i].WID + " | " + res[i].UID + " | " + res[i].type + " | " + res[i].Duration + " | " + res[i].Calories);
    //         var WID = res[i].WID;
    //         var UID = res[i].UID;
    //         var type = res[i].type;
    //         var Duration = res[i].Duration;
    //         var Calories = res[i].Calories;
    //     }
    //     // console.log("----------------------")
    // });    
    // var tableContent = "<tr><td>" + WID + "</td><br><td>" + UID + "</td><br><td>" + type + "</td><br><td>" + Duration + "</td><br><td>" + Calories + "</td></tr>";
    // $("#allWorkouts").append(tableContent);

});