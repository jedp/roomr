$('#signinpanel').show();
/*var signinLink = document.getElementById('signin');
if (signinLink) {
  signinLink.onclick = function(e) {
    */

$('.persona-button.signin').bind('click', function (e) {
  e.preventDefault();
  $('#signinpanel').hide();
  navigator.id.request();
});

/*var signoutLink = document.getElementById('signout');
if (signoutLink) {
  signoutLink.onclick = function(e) {
  */
$('.persona-button.signout').bind('click', function (e) {
  e.preventDefault();
  $('#signinpanel').hide();
  navigator.id.logout();
});

if (!! currentUser) {
    $('#signout').show();
    $('#authenticated').show();
    $('#signin').hide();
    $('#welcome').hide();
} else {
    $('#signin').show();
    $('#welcome').show();
    $('#signout').hide();
    $('#authenticated').hide();
}

navigator.id.watch({
  loggedInUser: currentUser,
  onlogin: function(assertion) {
    console.log('watch onlogin callback');
    // A user has logged in! Here you need to:
    // 1. Send the assertion to your backend for verification and to create a session.
    // 2. Update your UI.

    $.ajax({ /* <-- This example uses jQuery, but you can use whatever you'd like */
      type: 'POST',
      url: '/auth/login', // This is a URL on your website.
      data: {assertion: assertion},
      success: function(res, status, xhr) {

        $('body').trigger('auth-login');

        $('#signout').show();
        if (res.name) {
          $('#authenticated').show();
        } else {
          $('#new-user').show();
        }

        $('#signin').hide();
        $('#welcome').hide();
        $('#signinpanel').show();

        console.log(res);

        //window.location.reload();
      },
      error: function(res, status, xhr) {
        $('#signinpanel').show();
        alert("login failure" + res);
      }
    });
  },
  onlogout: function() {
    console.log('watch onlogout callback');
    // A user has logged out! Here you need to:
    // Tear down the user's session by redirecting the user or making a call to your backend.
    // Also, make sure loggedInUser will get set to null on the next page load.
    // (That's a literal JavaScript null. Not false, 0, or undefined. null.)
    $('#signinpanel').hide();
    $.ajax({
      type: 'POST',
      url: '/auth/logout', // This is a URL on your website.
      success: function(res, status, xhr) {
        $('body').trigger('auth-logout');
        $('#signin').show();
        $('#welcome').show();
        $('#signout').hide();
        $('#authenticated').hide();
        $('#new-user').hide();
        $('#signinpanel').show();

        //window.location.reload();
      },
      error: function(res, status, xhr) {
        $('#signinpanel').show();
         alert("logout failure" + res); }
    });
  }
});
