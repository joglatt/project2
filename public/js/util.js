// Getting references to our form and inputs
function handleLoginSignup(form, url) {
  var form = $("form");

  // When the form is submitted, we validatew there's an email and password entered
  form.on("submit", function(event) {
    var passwordInput = $("input#password-input");
    var emailInput = $("input#email-input");
    var sexInput = $("#sex");
    var weightInput = $("input#weight-input");
    var ft = $("#ft").val();
    var inches = $("#in").val();
    var heightInput = parseInt(ft) * 12 + parseInt(inches);

    event.preventDefault();
    $(".container").hide();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      sex: sexInput.val(),
      height: heightInput,
      weight: weightInput.val().trim()
    };
    console.log("USER DATA");
    console.log(userData);

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the authUser function and clear the form
    authUser(
      userData.email,
      userData.password,
      userData.sex,
      userData.height,
      userData.weight
    );
    // emailInput.val("");
    // passwordInput.val("");
    // sexInput.val("");
    // ft.val("");
    // inches.val("");
  });

  // AUTHUser does a post to the url and if successful, redirects us the the members page
  function authUser(email, password, sex, height, weight) {
    $.post(url, {
      email: email,
      password: password,
      sex: sex,
      weight: weight,
      height: height
    })
      .then(function(data) {
        console.log("data " + data);
        window.location.replace(data);
        // If there's an error, log the error
      })
      .catch(handleAuthErr);
  }

  function handleAuthErr(err) {
    $(".container").show();
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
}
