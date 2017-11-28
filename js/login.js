$(document).ready(() => {

    $("#create-user-button").click(() => {
        window.location.href = "signup.html";
    });

    $("#login-button").click(() => {

        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();


        if (!username || !password) {
            alert("Udfyld venligt alle felterne");
        }
        else {
            SDK.User.login(username, password, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("Der opstod en fejl");
                }
                else if (err) {
                    console.log("fejl")
                }
                else {
                    SDK.User.loadUser((err, data) => {
                                window.location.href = "myProfile.html"
                   });
                }

            });
        }

    });

});


