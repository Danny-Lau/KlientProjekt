$(document).ready(() => {

    $("#login-button").click(() => {

        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();


        SDK.User.login(username, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("Der er opstod en fejl");
            }
            else if (err) {
                console.log("Der skete en fejl");
            } else {
                window.location.href = "../navigation.html";
            }
        });

    });

    $("#create-user-button").click(() => {

        window.location.href = "signup.html";
    });
});


