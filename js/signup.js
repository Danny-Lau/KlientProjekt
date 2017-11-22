$(document).ready(() => {

    $("#create-user-button").click(() => {

    const username = $("#inputUsername").val();
    const password = $("#inputPassword").val();

    SDK.User.signup(username, password, (err, data) => {
        if(err && err.xhr.status === 401){
            $(".form-group").addClass("Der er fejl");
        }
        else if (err) {
            console.log("Der skete en fejl")
        } else {
            window.location.href = "login.html"
        }
     });

    });
});