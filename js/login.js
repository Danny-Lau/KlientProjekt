$(document).ready(() => {

    //klik på Singup-button, og brugeren bliver sendt til siden for at oprette en bruger
    $("#signup-button").click(() => {
        event.preventDefault();
        window.location.href = "signup.html";
    });


    $("#login-button").click(() => {

        //Sætter parameterne til log-in oplysningerne
        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();

        //Felterne må ikke stå tomme
        if (!username || !password) {
            alert("Udfyld venligt alle felterne");
        }
        else {
            //Gennemngår de indtastede oplysninger
            event.preventDefault();
            SDK.User.login(username, password, (err) => {

                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("Der opstod en fejl");
                }
                else if (err) {
                    console.log("fejl")
                }
                else {
                    SDK.User.loadUser(() => {
                        window.location.href = "myProfile.html";
                   });
                }

            });
        }

    });

});


