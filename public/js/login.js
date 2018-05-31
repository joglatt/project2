$(document).ready(function() {
  handleLogin("form.login", "/api/login");
});

// Getting references to our form and inputs
function handleLogin(form, url) {
  var form = $(form);
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  form.on("submit", function(event) {
    event.preventDefault();
    $(".container").hide();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the authUser function and clear the form
    authUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // AUTHUser does a post to the url and if successful, redirects us the the members page
  function authUser(email, password) {
    $.post(url, {
      email: email,
      password: password
    })
      .then(function(data) {
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
