$(document).ready(() => {

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
                        if (err && err.xhr.status === 401) {
                            document.getElementById("error").innerHTML = "Forkert brugernavn eller password";
                        }
                        else {
                            var myUser = JSON.parse(data)
                            var currentUser = myUser.currentUser;
                            if (currentUser.type === 1) {
                                window.location.href = "myProfile.html"
                            }
                            else {
                                alert("Velkommen");
                                window.location.href = "myProfile.html"
                            }
                        }
                    });
                }

            });
        }

        $("#create-user-button").click(() => {

            window.location.href = "signup.html";
        });
    });
})


